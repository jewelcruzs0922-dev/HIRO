import { describe, expect, it } from "vitest";
import {
  createOrderId,
  isPlacedOrder,
  parseOrder,
  type PlacedOrder,
} from "./orders";

const order: PlacedOrder = {
  id: "HIRO-ABC123-X9Z2",
  email: "rider@example.com",
  name: "Alex Rider",
  items: [{ label: "HIRO Trail (Charcoal)", qty: 2, unitPrice: 3290 }],
  total: 6580,
  placedAt: "2026-09-22T12:00:00.000Z",
};

describe("isPlacedOrder", () => {
  it("accepts a well-formed order", () => {
    expect(isPlacedOrder(order)).toBe(true);
  });

  it("accepts an order with no items (renderable, just empty)", () => {
    expect(isPlacedOrder({ ...order, items: [] })).toBe(true);
  });

  it("rejects non-objects and primitives", () => {
    expect(isPlacedOrder(null)).toBe(false);
    expect(isPlacedOrder("order")).toBe(false);
    expect(isPlacedOrder(42)).toBe(false);
    expect(isPlacedOrder([order])).toBe(false);
  });

  it("rejects missing or wrongly-typed identity fields", () => {
    expect(isPlacedOrder({ ...order, id: "" })).toBe(false);
    expect(isPlacedOrder({ ...order, name: null })).toBe(false);
    expect(isPlacedOrder({ ...order, email: 7 })).toBe(false);
  });

  it("rejects malformed line items", () => {
    expect(isPlacedOrder({ ...order, items: "nope" })).toBe(false);
    expect(
      isPlacedOrder({
        ...order,
        items: [{ label: "x", qty: 0, unitPrice: 1 }],
      }),
    ).toBe(false);
    expect(
      isPlacedOrder({
        ...order,
        items: [{ label: "x", qty: "2", unitPrice: 1 }],
      }),
    ).toBe(false);
    expect(
      isPlacedOrder({
        ...order,
        items: [{ label: "x", qty: 1, unitPrice: -5 }],
      }),
    ).toBe(false);
  });

  it("rejects invalid totals and placedAt", () => {
    expect(isPlacedOrder({ ...order, total: Number.NaN })).toBe(false);
    expect(isPlacedOrder({ ...order, total: -1 })).toBe(false);
    expect(isPlacedOrder({ ...order, placedAt: 123 })).toBe(false);
  });
});

describe("parseOrder", () => {
  it("returns null for null, empty, and invalid JSON", () => {
    expect(parseOrder(null)).toBeNull();
    expect(parseOrder("")).toBeNull();
    expect(parseOrder("{broken")).toBeNull();
  });

  it("returns null for valid JSON that is not an order", () => {
    expect(parseOrder("[1,2]")).toBeNull();
    expect(parseOrder('{"hello":"world"}')).toBeNull();
  });

  it("round-trips a valid order", () => {
    expect(parseOrder(JSON.stringify(order))).toEqual(order);
  });

  it("returns null instead of crashing on tampered fields", () => {
    const tampered = JSON.stringify({ ...order, name: null });
    expect(parseOrder(tampered)).toBeNull();
  });
});

describe("createOrderId", () => {
  it("generates unique HIRO- prefixed ids", () => {
    const a = createOrderId();
    const b = createOrderId();
    expect(a).toMatch(/^HIRO-[0-9A-Z]+-[0-9A-Z]+$/);
    expect(a).not.toBe(b);
  });
});
