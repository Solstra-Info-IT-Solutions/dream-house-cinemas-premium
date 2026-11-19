import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/about", "/production", "/rental", "/works", "/book", "/contact"];
const widths = [320, 360, 375, 390, 414, 430, 480, 768, 820, 1024, 1280, 1366, 1440, 1600, 1920];

test.describe("route smoke and responsive overflow", () => {
  for (const route of routes) {
    test(`${route} renders without horizontal page overflow at every target width`, async ({ page }, testInfo) => {
      for (const width of widths) {
        await page.setViewportSize({ width, height: 900 });
        const response = await page.goto(route, { waitUntil: "domcontentloaded" });
        expect(response?.status(), `HTTP status for ${route} at ${width}px`).toBe(200);
        await expect(page.locator("main")).toBeVisible();
        const dimensions = await page.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
        }));
        expect(
          Math.max(dimensions.document, dimensions.body),
          `horizontal overflow on ${route} at ${width}px: ${JSON.stringify(dimensions)}`,
        ).toBeLessThanOrEqual(dimensions.viewport + 2);
        if (width === 390 || width === 1440) {
          const hiddenRevealTargets = page.locator('main [style*="opacity:0"], main [style*="opacity: 0"]');
          for (let revealIndex = 0; revealIndex < 40; revealIndex += 1) {
            if (await hiddenRevealTargets.count() === 0) break;
            await hiddenRevealTargets.first().scrollIntoViewIfNeeded();
            await page.waitForTimeout(140);
          }
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.waitForTimeout(800);
          const routeName = route === "/" ? "home" : route.slice(1);
          await page.screenshot({
            path: testInfo.outputPath(`${routeName}-${width}.png`),
            fullPage: true,
            animations: "disabled",
          });
        }
      }
    });
  }
});

test("mobile navigation opens and navigates to booking", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Toggle navigation" });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  const mobileNav = page.locator("#dhc-mobile-navigation");
  await expect(mobileNav).toBeVisible();
  await mobileNav.getByRole("link", { name: "Book Now" }).click();
  await expect(page).toHaveURL(/\/book$/);
});

test("rental catalogue expands and collapses without losing items", async ({ page }) => {
  await page.goto("/rental");
  const cards = page.locator(".dhc-catalogue-card");
  await expect(cards).toHaveCount(9);
  const more = page.getByRole("button", { name: "View more" });
  await expect(more).toHaveAttribute("aria-expanded", "false");
  await more.click();
  await expect(cards).toHaveCount(23);
  await expect(page.getByRole("button", { name: "View less" })).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("button", { name: "View less" }).click();
  await expect(cards).toHaveCount(9);
});

test("work filters show only the selected portfolio category", async ({ page }) => {
  await page.goto("/works");
  await expect(page.locator(".source-work-grid article")).toHaveCount(9);
  const documentaries = page.getByRole("button", { name: "DOCUMENTARIES" });
  await documentaries.click();
  await expect(documentaries).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".source-work-grid article")).toHaveCount(2);
  const all = page.getByRole("button", { name: "ALL" });
  await all.click();
  await expect(all).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".source-work-grid article")).toHaveCount(9);
});

test("booking query preselects equipment and estimate updates from checkbox selection", async ({ page }) => {
  await page.goto("/book?type=rental&item=S1H%20camera%20body");
  await page.getByRole("button", { name: "Equipment Rental Request" }).click();
  const cameraItem = page.locator(".dhc-booking-picker label").filter({ hasText: "S1H camera body" });
  const checkbox = cameraItem.locator('input[type="checkbox"]');
  await expect(checkbox).toBeChecked();
  await expect(page.locator(".dhc-booking-estimate strong")).toHaveText("₹2,000");
  await checkbox.uncheck();
  await expect(page.locator(".dhc-booking-estimate strong")).toHaveText("₹0");
  await checkbox.check();
  await expect(page.locator(".dhc-booking-estimate strong")).toHaveText("₹2,000");
});

test("booking checkboxes render at the intended compact size", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/book?type=rental");
  const checkbox = page.locator('.dhc-booking-picker input[type="checkbox"]').first();
  const size = await checkbox.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const label = element.closest("label")!;
    const name = label.querySelector("span")!;
    const nameRect = name.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      labelWidth: label.getBoundingClientRect().width,
      nameWidth: nameRect.width,
      nameScrollWidth: name.scrollWidth,
      nameClientWidth: name.clientWidth,
    };
  });
  expect(size.width).toBe(16);
  expect(size.height).toBe(16);
  expect(size.labelWidth).toBeGreaterThan(250);
  expect(size.nameWidth).toBeGreaterThan(120);
  expect(size.nameScrollWidth).toBeLessThanOrEqual(size.nameClientWidth + 1);
  await page.screenshot({
    path: testInfo.outputPath("booking-rental-picker-390.png"),
    fullPage: true,
    animations: "disabled",
  });
});

test("booking tabs expose their selected state accessibly", async ({ page }) => {
  await page.goto("/book");
  const production = page.getByRole("button", { name: "Production Enquiry" });
  const rental = page.getByRole("button", { name: "Equipment Rental Request" });
  await expect(production).toHaveAttribute("aria-pressed", "true");
  await rental.click();
  await expect(rental).toHaveAttribute("aria-pressed", "true");
  await expect(production).toHaveAttribute("aria-pressed", "false");
});

for (const route of routes) {
  test(`${route} has no automated WCAG 2.2 AA accessibility violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}


test("enquiry forms expose accessible names and required constraints", async ({ page }) => {
  await page.goto("/book");
  await expect(page.getByRole("textbox", { name: "Your name" })).toHaveAttribute("required", "");
  await expect(page.getByRole("textbox", { name: "Phone or WhatsApp number" })).toHaveAttribute("required", "");
  await expect(page.getByRole("textbox", { name: "Email address" })).toHaveAttribute("type", "email");
  await expect(page.getByRole("textbox", { name: "Project type" })).toHaveAttribute("required", "");
  await expect(page.getByRole("textbox", { name: "Shoot location" })).toHaveAttribute("required", "");
  await page.goto("/contact");
  await expect(page.getByRole("textbox", { name: "Your name" })).toHaveAttribute("required", "");
  await expect(page.getByRole("textbox", { name: "Message" })).toHaveAttribute("required", "");
});

test("baseline security headers are present on page responses", async ({ page }) => {
  const response = await page.goto("/");
  const headers = await response?.allHeaders();
  expect(headers?.["x-content-type-options"]).toBe("nosniff");
  expect(headers?.["x-frame-options"]).toBe("SAMEORIGIN");
  expect(headers?.["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers?.["permissions-policy"]).toContain("camera=()");
});

test("key cinema imagery loads successfully", async ({ page }) => {
  await page.goto("/");
  const logo = page.locator(".dhc-nav .brand img").first();
  await expect.poll(() => logo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0), {
    message: "Header logo should load as a real image",
    timeout: 15_000,
  }).toBe(true);
  await page.goto("/rental");
  const heroImage = page.locator(".source-page-visual img");
  await expect.poll(() => heroImage.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0), {
    message: "Rental hero image should load as a real image",
    timeout: 15_000,
  }).toBe(true);
});

test("key routes remain usable in landscape orientation", async ({ page }) => {
  for (const route of routes) {
    for (const viewport of [{ width: 844, height: 390 }, { width: 932, height: 430 }, { width: 1366, height: 768 }]) {
      await page.setViewportSize(viewport);
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBe(200);
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        document: document.documentElement.scrollWidth,
      }));
      expect(dimensions.document, `landscape overflow on ${route} at ${viewport.width}x${viewport.height}`)
        .toBeLessThanOrEqual(dimensions.viewport + 2);
    }
  }
});


test("all primary interface text uses the single Playfair Display family", async ({ page }) => {
  await page.goto("/");
  const fontLoaded = await page.evaluate(async () => {
    await document.fonts.ready;
    return document.fonts.check('16px "Playfair Display"');
  });
  expect(fontLoaded).toBe(true);
  const homeFamilies = await page.locator("body, .dhc-nav a, .dhc-hero h1, .dhc-hero p, .button-gold, footer")
    .evaluateAll((elements) => elements.map((element) => getComputedStyle(element).fontFamily));
  for (const family of homeFamilies) {
    expect(family).toBe('"Playfair Display"');
  }
  await page.goto("/book");
  const formFamilies = await page.locator("input, textarea, select, button, label")
    .evaluateAll((elements) => elements.map((element) => getComputedStyle(element).fontFamily));
  for (const family of formFamilies) {
    expect(family).toBe('"Playfair Display"');
  }
});


test("scroll-reveal service cards become visible when they enter the viewport", async ({ page }) => {
  await page.goto("/");
  const firstService = page.locator(".dhc-service").first();
  await firstService.scrollIntoViewIfNeeded();
  await expect.poll(
    () => firstService.evaluate((element) => Number(getComputedStyle(element).opacity)),
    { message: "service card should reveal on scroll", timeout: 5_000 },
  ).toBe(1);
});


test("all nine portfolio cards load real production imagery", async ({ page }) => {
  await page.goto("/works");
  const images = page.locator(".source-work-grid img");
  await expect(images).toHaveCount(9);
  for (let index = 0; index < 9; index += 1) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(
      () => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0),
      { message: `portfolio image ${index + 1} should load`, timeout: 15_000 },
    ).toBe(true);
  }
});


test("cinematic homepage hero video loads metadata and is configured for muted inline playback", async ({ page }) => {
  await page.goto("/");
  const video = page.locator(".dhc-hero video").first();
  await expect(video).toHaveAttribute("autoplay", "");
  await expect(video).toHaveAttribute("muted", "");
  await expect(video).toHaveAttribute("playsinline", "");
  await expect.poll(
    () => video.evaluate((element: HTMLVideoElement) => element.readyState >= 1 && element.videoWidth > 0),
    { message: "hero video should load metadata and a video frame", timeout: 20_000 },
  ).toBe(true);
});


test("mobile navigation is keyboard-operable with a visible focus indicator", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const toggle = page.getByRole("button", { name: "Toggle navigation" });
  await expect(toggle).toBeFocused();
  const outlineWidth = await toggle.evaluate((element) => getComputedStyle(element).outlineWidth);
  expect(outlineWidth).toBe("2px");
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
});

test("Book Now remains readable on hover and has no arrow glyph", async ({ page }) => {
  await page.goto("/");
  const bookNow = page.getByRole("link", { name: "Book Now" }).first();
  await bookNow.hover();
  const styles = await bookNow.evaluate((element) => ({
    color: getComputedStyle(element).color,
    visibility: getComputedStyle(element).visibility,
    opacity: getComputedStyle(element).opacity,
    text: element.textContent ?? "",
  }));
  expect(styles.visibility).toBe("visible");
  expect(Number(styles.opacity)).toBeGreaterThan(0.9);
  expect(styles.color).not.toBe("rgba(0, 0, 0, 0)");
  expect(styles.text).not.toMatch(/[→➜➝➤]/);
});


test("desktop primary navigation links target the correct routes", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const nav = page.locator(".dhc-nav");
  for (const [label, href] of [
    ["About", "/about"],
    ["Production", "/production"],
    ["Equipment", "/rental"],
    ["Our Work", "/works"],
    ["Contact", "/contact"],
    ["Book Now", "/book"],
  ]) {
    await expect(nav.getByRole("link", { name: label }).first()).toHaveAttribute("href", href);
  }
});

test("email fields reject malformed addresses with native validation", async ({ page }) => {
  await page.goto("/contact");
  const email = page.getByRole("textbox", { name: "Email address" });
  await email.fill("not-an-email");
  expect(await email.evaluate((element: HTMLInputElement) => element.validity.typeMismatch)).toBe(true);
  await email.fill("client@example.com");
  expect(await email.evaluate((element: HTMLInputElement) => element.validity.typeMismatch)).toBe(false);
});
