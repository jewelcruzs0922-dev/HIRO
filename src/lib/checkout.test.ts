import { afterEach, describe, expect, it, vi } from "vitest";
import {
  emptyForm,
  estimatedDelivery,
  itemImage,
  requiredFields,
  validate,
} from "./checkout";

afterEach(() => {
  vi.useRealTimers();
});

describe("validate", () => {
  it("flags every required field when the form is empty", () => {
    const errors = validate(emptyForm);
    expect(Object.keys(errors).sort()).toEqual(
      requiredFields.map((f) => f.key).sort(),
    );
    expect(errors.email).toBe("Email is required");
    expect(errors.name).toBe("Full name is required");
    expect(errors.country).toBe("Country is required");
  });

  it("accepts a fully valid form", () => {
    expect(
      validate({
        ...emptyForm,
        email: "rider@example.com",
        name: "Alex Rider",
        address: "1 Trail Lane",
        city: "Amsterdam",
        postalCode: "1012 AB",
        country: "Netherlands",
      }),
    ).toEqual({});
  });

  it("rejects malformed emails but allows empty optional fields", () => {
    const errors = validate({
      ...emptyForm,
      email: "not-an-email",
      name: "Alex Rider",
      address: "1 Trail Lane",
      city: "Amsterdam",
      postalCode: "1012 AB",
      country: "Netherlands",
    });
    expect(errors.email).toBe("Enter a valid email address");
    expect(errors.phone).toBeUndefined();
    expect(errors.apt).toBeUndefined();
    expect(errors.notes).toBeUndefined();
  });

  it("treats whitespace-only values as missing", () => {
    const errors = validate({
      ...emptyForm,
      email: "rider@example.com",
      name: "   ",
      address: "1 Trail Lane",
      city: "Amsterdam",
      postalCode: "1012 AB",
      country: "Netherlands",
    });
    expect(errors.name).toBe("Full name is required");
  });
});

describe("itemImage", () => {
  it("resolves the image for a known bike and colour sku", () => {
    expect(itemImage("trail:charcoal")).toBe("/hiro-trail-charcoal.webp");
    expect(itemImage("city:maroon")).toBe("/hiro-city-maroon.webp");
  });

  it("falls back to the first colour for an unknown colour id", () => {
    expect(itemImage("trail:invisible")).toBe("/hiro-trail-green.webp");
  });

  it("returns null for unknown skus", () => {
    expect(itemImage("mystery:red")).toBeNull();
  });
});

describe("estimatedDelivery", () => {
  it("skips weekends when starting mid-week", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 22));
    expect(estimatedDelivery()).toMatch(/^Monday,? 28 September$/);
  });

  it("skips weekends when starting on a Friday", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 25));
    expect(estimatedDelivery()).toMatch(/^Thursday,? 1 October$/);
  });

  it("never lands on a Saturday or Sunday", () => {
    vi.useFakeTimers();
    for (let day = 18; day <= 28; day += 1) {
      vi.setSystemTime(new Date(2026, 8, day));
      expect(estimatedDelivery()).toMatch(
        /^(Monday|Tuesday|Wednesday|Thursday|Friday)/,
      );
    }
  });
});
