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
