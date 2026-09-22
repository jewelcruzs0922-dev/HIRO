import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  { path: "/", name: "home" },
  { path: "/checkout", name: "checkout (empty)" },
  { path: "/checkout/confirmation", name: "confirmation (fallback)" },
];

for (const { path, name } of pages) {
  test(`axe: no WCAG A/AA violations on ${name}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(
      results.violations,
      results.violations
        .map((v) => `${v.id}: ${v.nodes.length} node(s) — ${v.help}`)
        .join("\n"),
    ).toEqual([]);
  });
}
