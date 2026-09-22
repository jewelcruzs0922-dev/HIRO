import { test, expect } from "@playwright/test";

test.describe("navigation", () => {
  test("scroll-spy marks the active section with aria-current", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "desktop header nav is hidden below lg");

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const primaryNav = page.getByRole("navigation", { name: "Primary" });
    await page.evaluate(() => {
      document.getElementById("about")?.scrollIntoView({ block: "center" });
    });

    await expect(primaryNav.getByRole("link", { name: "About" })).toHaveAttribute(
      "aria-current",
      "location",
      { timeout: 5000 },
    );
    await expect(
      primaryNav.getByRole("link", { name: "Bikes" }),
    ).not.toHaveAttribute("aria-current", "location");
  });

  test("mobile menu traps keyboard focus and closes on Escape", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "hamburger menu only exists below lg");

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await page.getByRole("button", { name: "Open menu" }).click();

    const dialog = page.getByRole("dialog", { name: "Site menu" });
    await expect(dialog).toBeVisible();

    const dialogClose = dialog.getByRole("button", { name: "Close menu" });
    await expect(dialogClose).toBeFocused();

    await page.keyboard.press("Shift+Tab");
    await expect(dialog.getByRole("link", { name: "Support" })).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(dialogClose).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  });
});
