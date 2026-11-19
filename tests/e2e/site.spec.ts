import { expect, test } from "@playwright/test";

const routes = ["/", "/about", "/production", "/rental", "/works", "/book", "/contact"];
const viewportWidths = [320, 360, 375, 390, 414, 430, 480, 768, 820, 1024, 1280, 1366, 1440, 1600, 1920];

test("every public route responds and renders a page heading", async ({ page }) => {
  for (const route of routes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("main h1").first(), route).toBeVisible();
  }
});

for (const route of routes) {
  test(`${route} has no horizontal overflow at requested viewport widths`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    for (const width of viewportWidths) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
      const dimensions = await page.evaluate(() => ({
        viewport: window.innerWidth,
        document: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
      }));
      expect(
        Math.max(dimensions.document, dimensions.body),
        `${route} overflows at ${width}px: ${JSON.stringify(dimensions)}`,
      ).toBeLessThanOrEqual(dimensions.viewport + 1);
    }
    for (const viewport of [{ width: 844, height: 390 }, { width: 932, height: 430 }]) {
      await page.setViewportSize(viewport);
      await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
      const dimensions = await page.evaluate(() => ({
        viewport: window.innerWidth,
        document: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
      }));
      expect(
        Math.max(dimensions.document, dimensions.body),
        `${route} overflows in landscape at ${viewport.width}x${viewport.height}`,
      ).toBeLessThanOrEqual(dimensions.viewport + 1);
    }
  });
}

test("mobile navigation opens and navigates to the equipment page", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Toggle navigation" });
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Rental Equipment" }).click();
  await expect(page).toHaveURL(/\/rental$/);
});

test("catalogue item opens a preselected rental enquiry", async ({ page }) => {
  await page.goto("/rental");
  await page.getByRole("link", { name: "Add to enquiry" }).first().click();
  await expect(page).toHaveURL(/\/book\?type=rental&item=/);
  const checkbox = page.locator(".dhc-booking-picker input[type=checkbox]").first();
  await expect(checkbox).toBeChecked();
});

test("booking tabs, equipment selection and indicative total stay synchronized", async ({ page }) => {
  await page.goto("/book?type=rental&item=S1H%20camera%20body");
  await expect(page.locator(".dhc-booking-picker")).toBeVisible();
  const first = page.locator(".dhc-booking-picker input[type=checkbox]").first();
  await expect(first).toBeChecked();
  const second = page.locator(".dhc-booking-picker input[type=checkbox]").nth(1);
  await second.check();
  await expect(page.getByText("2 item(s) selected · indicative total")).toBeVisible();
  await expect(page.locator(".dhc-booking-estimate strong")).toContainText("2,800");
  await page.getByRole("button", { name: "Production Enquiry" }).click();
  await expect(page.locator(".dhc-booking-picker")).toHaveCount(0);
  await page.getByRole("button", { name: "Equipment Rental Request" }).click();
  await expect(page.locator(".dhc-booking-picker")).toBeVisible();
  await expect(first).toBeChecked();
});

test("booking form exposes accessible names and validates required fields", async ({ page }) => {
  await page.goto("/book");
  const form = page.locator("form.source-form");
  await expect(page.getByLabel("Your name")).toBeVisible();
  await expect(page.getByLabel("Phone or WhatsApp number")).toBeVisible();
  await expect(page.getByLabel("Email address")).toBeVisible();
  expect(await form.evaluate((element) => (element as HTMLFormElement).checkValidity())).toBe(false);
  await page.getByLabel("Your name").fill("QA Visitor");
  await page.getByLabel("Phone or WhatsApp number").fill("+919876543210");
  await page.getByLabel("Email address").fill("not-an-email");
  expect(await form.evaluate((element) => (element as HTMLFormElement).checkValidity())).toBe(false);
  await page.getByLabel("Email address").fill("qa@example.com");
  await page.getByLabel("Project type").fill("Commercial film");
  await page.getByLabel("Shoot location").fill("Kochi");
  await page.getByLabel("Project brief").fill("Automated validation only; do not send.");
  expect(await form.evaluate((element) => (element as HTMLFormElement).checkValidity())).toBe(true);
});

test("contact form exposes accessible names and validates required fields", async ({ page }) => {
  await page.goto("/contact");
  const form = page.locator(".source-contact-grid form.source-form");
  expect(await form.evaluate((element) => (element as HTMLFormElement).checkValidity())).toBe(false);
  await page.getByLabel("Your name").fill("QA Visitor");
  await page.getByLabel("Phone or WhatsApp number").fill("+919876543210");
  await page.getByLabel("Email address").fill("not-an-email");
  expect(await form.evaluate((element) => (element as HTMLFormElement).checkValidity())).toBe(false);
  await page.getByLabel("Email address").fill("qa@example.com");
  await page.getByLabel("Enquiry type").fill("Production");
  await page.getByLabel("Project type").fill("Commercial film");
  await page.getByLabel("Message").fill("Automated validation only; do not send.");
  expect(await form.evaluate((element) => (element as HTMLFormElement).checkValidity())).toBe(true);
});

test("equipment checkboxes remain compact and have visible focus styles", async ({ page }) => {
  await page.goto("/book?type=rental");
  const checkbox = page.locator(".dhc-booking-picker input[type=checkbox]").first();
  const size = await checkbox.evaluate((element) => {
    const style = getComputedStyle(element);
    return { width: style.width, height: style.height };
  });
  expect(size).toEqual({ width: "16px", height: "16px" });
  await checkbox.focus();
  await expect(checkbox).toBeFocused();
});

test("key pages meet automated WCAG 2.2 AA accessibility checks", async ({ page }) => {
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  for (const route of ["/", "/about", "/production", "/rental", "/works", "/book", "/contact"]) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        description: violation.description,
        nodes: violation.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })),
      })),
      `Accessibility violations on ${route}`,
    ).toEqual([]);
  }
});

test("security response headers are present on public routes", async ({ request }) => {
  const response = await request.get("/");
  expect(response.status()).toBe(200);
  const headers = response.headers();
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("SAMEORIGIN");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["strict-transport-security"]).toContain("max-age=63072000");
  expect(headers["permissions-policy"]).toContain("camera=()");
});

test("the declared typography uses Playfair Display only", async ({ page }) => {
  await page.goto("/");
  const selectors = [".brand-name", "main h1", "main p", "button", "a", "input", "textarea"];
  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    if (await locator.count()) {
      const family = await locator.evaluate((element) => getComputedStyle(element).fontFamily);
      expect(family, `Unexpected font family for ${selector}`).toContain("Playfair Display");
      expect(family).not.toMatch(/Georgia|serif|sans-serif|Arial/i);
    }
  }
});

test("equipment catalogue expands and collapses the complete lighting list", async ({ page }) => {
  await page.goto("/rental");
  const groups = page.locator(".dhc-catalogue-category");
  await expect(groups).toHaveCount(2);
  await expect(groups.nth(0).locator(".dhc-catalogue-card")).toHaveCount(3);
  const lights = groups.nth(1);
  await expect(lights.locator(".dhc-catalogue-card")).toHaveCount(6);
  await lights.getByRole("button", { name: "View more" }).click();
  await expect(lights.locator(".dhc-catalogue-card")).toHaveCount(20);
  await lights.getByRole("button", { name: "View less" }).click();
  await expect(lights.locator(".dhc-catalogue-card")).toHaveCount(6);
});

test("work portfolio filters show the expected project categories", async ({ page }) => {
  await page.goto("/works");
  const cards = page.locator(".source-work-grid article");
  await expect(cards).toHaveCount(9);
  const expected = [["AD FILMS", 2], ["DOCUMENTARIES", 2], ["CORPORATE FILMS", 2], ["BRAND FILMS", 1], ["PROMOTIONAL", 2]] as const;
  for (const [label, count] of expected) {
    await page.getByRole("button", { name: label }).click();
    await expect(cards).toHaveCount(count);
  }
  await page.getByRole("button", { name: "ALL" }).click();
  await expect(cards).toHaveCount(9);
});
