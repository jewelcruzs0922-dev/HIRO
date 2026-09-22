import { describe, expect, it } from "vitest";
import { MAX_QTY } from "./constants";
import {
  CART_STORAGE_KEY,
  addItem,
  cartCount,
  cartSubtotal,
  clearCart,
  parseCart,
  removeItem,
  serializeCart,
  setItemQty,
  type CartItem,
} from "./cart";

const item = (overrides: Partial<CartItem> = {}): CartItem => ({
  id: 1,
  qty: 1,
  label: "HIRO Trail (Forest Green)",
  unitPrice: 3290,
  ...overrides,
});

describe("cartCount / cartSubtotal", () => {
  it("sums quantities and line totals", () => {
    const items = [item({ qty: 2 }), item({ id: 2, qty: 3, unitPrice: 100 })];
    expect(cartCount(items)).toBe(5);
    expect(cartSubtotal(items)).toBe(2 * 3290 + 3 * 100);
  });

  it("returns 0 for an empty cart", () => {
    expect(cartCount([])).toBe(0);
    expect(cartSubtotal([])).toBe(0);
  });
});

describe("addItem", () => {
  it("appends a new item", () => {
    const items = addItem([], { id: 1, qty: 1, label: "A", unitPrice: 10 });
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual({ id: 1, qty: 1, label: "A", unitPrice: 10 });
  });

  it("merges quantities when the label matches, keeping the original id", () => {
    const first = addItem([], { id: 1, qty: 2, label: "A", unitPrice: 10 });
    const merged = addItem(first, { id: 7, qty: 3, label: "A", unitPrice: 10 });
    expect(merged).toHaveLength(1);
    expect(merged[0].id).toBe(1);
    expect(merged[0].qty).toBe(5);
  });

  it("clamps incoming quantity to at least 1 and at most MAX_QTY", () => {
    const zero = addItem([], { id: 1, qty: 0, label: "A", unitPrice: 10 });
    expect(zero[0].qty).toBe(1);

    const huge = addItem([], { id: 1, qty: 99, label: "A", unitPrice: 10 });
    expect(huge[0].qty).toBe(MAX_QTY);
  });

  it("clamps a merge that would exceed MAX_QTY", () => {
    const almost = addItem([], {
      id: 1,
      qty: MAX_QTY - 1,
      label: "A",
      unitPrice: 10,
    });
    const merged = addItem(almost, { id: 2, qty: 5, label: "A", unitPrice: 10 });
    expect(merged[0].qty).toBe(MAX_QTY);
  });
});

describe("setItemQty", () => {
  it("updates the matching item", () => {
    const items = [item({ id: 1, qty: 1 }), item({ id: 2, qty: 1 })];
    const next = setItemQty(items, 2, 4);
    expect(next.find((i) => i.id === 2)?.qty).toBe(4);
    expect(next.find((i) => i.id === 1)?.qty).toBe(1);
  });

  it("removes the item when qty drops below 1", () => {
    const items = [item({ id: 1 }), item({ id: 2 })];
    expect(setItemQty(items, 1, 0)).toHaveLength(1);
    expect(setItemQty(items, 1, 0)[0].id).toBe(2);
  });

  it("clamps qty at MAX_QTY", () => {
    const next = setItemQty([item({ id: 1 })], 1, 99);
    expect(next[0].qty).toBe(MAX_QTY);
  });
});

describe("removeItem / clearCart", () => {
  it("removes only the targeted item", () => {
    const items = [item({ id: 1 }), item({ id: 2 })];
    expect(removeItem(items, 1).map((i) => i.id)).toEqual([2]);
  });

  it("clears everything", () => {
    expect(clearCart()).toEqual([]);
  });
});

describe("serializeCart / parseCart", () => {
  it("round-trips a valid cart", () => {
    const items = [item({ qty: 2 })];
    expect(parseCart(serializeCart(items))).toEqual(items);
  });

  it("returns [] for null, invalid JSON, and non-arrays", () => {
    expect(parseCart(null)).toEqual([]);
    expect(parseCart("{not json")).toEqual([]);
    expect(parseCart('{"id":1}')).toEqual([]);
  });

  it("drops malformed entries and clamps valid quantities", () => {
    const raw = JSON.stringify([
      item({ id: 1, qty: 99 }),
      { id: "nope", qty: 1, label: "bad", unitPrice: 5 },
      { id: 3, qty: 0, label: "zero", unitPrice: 5 },
      { id: 4, qty: 1, label: "ok", unitPrice: -1 },
    ]);
    const parsed = parseCart(raw);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].id).toBe(1);
    expect(parsed[0].qty).toBe(MAX_QTY);
  });

  it("exposes a versioned storage key", () => {
    expect(CART_STORAGE_KEY).toBe("hiro-cart-v1");
  });
});
