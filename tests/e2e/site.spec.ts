import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/about", "/production", "/rental", "/works", "/book", "/contact"];
const widths = [320, 360, 375, 390, 414, 430, 480, 768, 820, 1024, 1280, 1366, 1440, 1600, 1920];

test.describe("route smoke and responsive overflow", () => {
  for (const route of routes) {
    test(`${route} renders without horizontal page overflow at every target width`, async ({ page }) => {
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
  await page.getByRole("button", { name: "View more" }).click();
  await expect(cards).toHaveCount(24);
  await page.getByRole("button", { name: "View less" }).click();
  await expect(cards).toHaveCount(9);
});

test("work filters show only the selected portfolio category", async ({ page }) => {
  await page.goto("/works");
  await expect(page.locator(".source-work-grid article")).toHaveCount(9);
  await page.getByRole("button", { name: "DOCUMENTARIES" }).click();
  await expect(page.locator(".source-work-grid article")).toHaveCount(2);
  await page.getByRole("button", { name: "ALL" }).click();
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

test("booking checkboxes render at the intended compact size", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/book?type=rental");
  const checkbox = page.locator('.dhc-booking-picker input[type="checkbox"]').first();
  const size = await checkbox.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  });
  expect(size.width).toBe(16);
  expect(size.height).toBe(16);
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

for (const route of ["/", "/book", "/contact"]) {
  test(`${route} has no serious or critical automated accessibility violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const serious = results.violations.filter((violation) =>
      violation.impact === "serious" || violation.impact === "critical"
    );
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
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
