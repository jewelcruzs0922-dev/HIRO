import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  { path: "/", name: "home" },
  { path: "/support", name: "support" },
  { path: "/checkout", name: "checkout (empty)" },
  { path: "/checkout/confirmation", name: "confirmation (fallback)" },
];

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

async function expectNoViolations(page: import("@playwright/test").Page) {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  expect(
    results.violations,
    results.violations
      .map((v) => `${v.id}: ${v.nodes.length} node(s) — ${v.help}`)
      .join("\n"),
  ).toEqual([]);
}

for (const { path, name } of pages) {
  test(`axe: no WCAG A/AA violations on ${name}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    await expectNoViolations(page);
  });
}

test("axe: no WCAG A/AA violations on populated checkout and confirmation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  await page.goto("/");
  await page.getByRole("button", { name: "View Details" }).click();
  await page.getByRole("button", { name: "Add to Cart" }).click();

  await page.goto("/checkout");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(500);
  await expect(
    page.getByRole("complementary", { name: "Order summary" }),
  ).toBeVisible();
  await expectNoViolations(page);

  await page.getByLabel("Email").fill("rider@example.com");
  await page.getByLabel("Full name").fill("Alex Rider");
  await page.getByLabel("Address").fill("1 Trail Lane");
  await page.getByLabel("City").fill("Amsterdam");
  await page.getByLabel("Postal code").fill("1012 AB");
  await page.getByLabel("Country").fill("Netherlands");
  await page.getByRole("button", { name: /Place order/i }).click();

  await page.waitForURL(/\/checkout\/confirmation$/);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(500);
  await expect(page.getByRole("heading", { name: /thanks, alex/i })).toBeVisible();
  await expectNoViolations(page);
});
