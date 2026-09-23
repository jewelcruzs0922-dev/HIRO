// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import {
  createOrderId,
  parseOrder,
  saveOrder,
  usePlacedOrder,
  type PlacedOrder,
} from "./orders";
import { renderHook, act } from "@testing-library/react";

const order: PlacedOrder = {
  id: "HIRO-REACT-1",
  email: "rider@example.com",
  name: "Alex Rider",
  items: [{ label: "HIRO Trail (Charcoal)", qty: 1, unitPrice: 3290 }],
  total: 3290,
  placedAt: "2026-09-23T12:00:00.000Z",
};

describe("usePlacedOrder reactivity", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("returns null when nothing is stored", () => {
    const { result } = renderHook(() => usePlacedOrder());
    expect(result.current).toBeNull();
  });

  it("updates when saveOrder is called after mount", () => {
    const { result } = renderHook(() => usePlacedOrder());
    expect(result.current).toBeNull();

    act(() => {
      expect(saveOrder(order)).toBe(true);
    });

    expect(result.current).toEqual(order);
  });

  it("re-parses and rejects tampered storage without crashing", () => {
    window.sessionStorage.setItem(
      "hiro-last-order",
      JSON.stringify({ ...order, total: "nope" }),
    );
    const { result } = renderHook(() => usePlacedOrder());
    expect(result.current).toBeNull();
  });
});

describe("parseOrder / createOrderId (jsdom)", () => {
  it("round-trips save + parse", () => {
    expect(saveOrder(order)).toBe(true);
    const raw = window.sessionStorage.getItem("hiro-last-order");
    expect(parseOrder(raw)).toEqual(order);
  });

  it("generates unique ids", () => {
    expect(createOrderId()).not.toBe(createOrderId());
  });
});
