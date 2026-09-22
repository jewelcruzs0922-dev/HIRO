import { test, expect } from "@playwright/test";

test.describe("home → configure → cart → checkout → confirmation", () => {
  test("completes a full demo order", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: /cleaner/i }),
    ).toBeVisible();

    await page.getByRole("button", { name: "View Details" }).click();
    await expect(page.getByRole("button", { name: "Add to Cart" })).toBeVisible();

    await page.getByRole("button", { name: /Select Charcoal/i }).click();
    await page.getByRole("button", { name: "Increase quantity" }).click();
    await page.getByRole("button", { name: "Add to Cart" }).click();

    await expect(page.getByText("Added 2× HIRO Trail")).toBeVisible();

    await page.getByRole("button", { name: /Open shopping cart, 2 items/i }).click();
    const cartDialog = page.getByRole("dialog", { name: "Shopping cart" });
    await expect(cartDialog).toBeVisible();
    await expect(
      cartDialog.getByText("HIRO Trail (Charcoal)", { exact: true }),
    ).toBeVisible();
    await expect(cartDialog.getByText("Subtotal", { exact: false })).toBeVisible();
    await expect(cartDialog.getByText("Shipping", { exact: true })).toBeVisible();
    await expect(cartDialog.getByText("Total", { exact: true })).toBeVisible();

    const qtyGroup = cartDialog.getByRole("group", {
      name: "Quantity for HIRO Trail (Charcoal)",
    });
    await expect(qtyGroup.getByText("2", { exact: true })).toBeVisible();
    await qtyGroup
      .getByRole("button", {
        name: "Increase quantity of HIRO Trail (Charcoal)",
      })
      .click();
    await expect(qtyGroup.getByText("3", { exact: true })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Open shopping cart, 3 items/i }),
    ).toBeVisible();
    await qtyGroup
      .getByRole("button", {
        name: "Decrease quantity of HIRO Trail (Charcoal)",
      })
      .click();
    await expect(qtyGroup.getByText("2", { exact: true })).toBeVisible();

    await cartDialog.getByRole("link", { name: "Checkout" }).click();
    await expect(page).toHaveURL(/\/checkout$/);
    await expect(page.getByRole("dialog", { name: "Shopping cart" })).toHaveCount(0);
    await expect(
      page.getByRole("heading", { name: "Delivery details" }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("complementary", { name: "Order summary" })
        .getByText("HIRO Trail (Charcoal)", { exact: true }),
    ).toBeVisible();

    await page.getByRole("button", { name: /Place order/i }).click();
    await expect(page.getByText("Email is required")).toBeVisible();

    await page.getByLabel("Email").fill("rider@example.com");
    await page.getByLabel("Full name").fill("Alex Rider");
    await page.getByLabel("Address").fill("1 Trail Lane");
    await page.getByLabel("City").fill("Amsterdam");
    await page.getByLabel("Postal code").fill("1012 AB");
    await page.getByLabel("Country").fill("Netherlands");

    await page.getByRole("button", { name: /Place order/i }).click();

    await expect(page).toHaveURL(/\/checkout\/confirmation$/);
    await expect(page.getByRole("heading", { name: /thanks, alex/i })).toBeVisible();
    await expect(page.getByText(/HIRO-/)).toBeVisible();
    await expect(page.getByText("rider@example.com")).toBeVisible();
    await expect(
      page.getByText("HIRO Trail (Charcoal)", { exact: true }),
    ).toBeVisible();

    await page.getByRole("link", { name: /HIRO home/i }).click();
    await expect(page).toHaveURL("/");
    const cartButton = page.getByRole("button", {
      name: /Open shopping cart, empty/i,
    });
    await expect(cartButton).toBeVisible();
  });

  test("empty cart blocks checkout and shows empty state", async ({ page }) => {
    await page.goto("/checkout");
    await expect(
      page.getByRole("heading", { name: /cart is empty/i }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /Place order/i })).toHaveCount(0);
  });

  test("confirmation without an order shows fallback", async ({ page }) => {
    await page.goto("/checkout/confirmation");
    await expect(
      page.getByRole("heading", { name: /nothing to show/i }),
    ).toBeVisible();
  });
});
