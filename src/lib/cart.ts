import { MAX_QTY } from "@/lib/constants";

export interface CartItem {
  id: number;
  sku: string;
  qty: number;
  label: string;
  unitPrice: number;
}

export const CART_STORAGE_KEY = "hiro-cart-v2";

const clampQty = (qty: number): number =>
  Math.max(1, Math.min(MAX_QTY, Math.floor(qty)));

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.qty, 0);
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
}

export function addItem(
  items: CartItem[],
  next: {
    id: number;
    sku: string;
    qty: number;
    label: string;
    unitPrice: number;
  },
): CartItem[] {
  const qty = clampQty(next.qty);
  const existing = items.find((i) => i.sku === next.sku);
  if (existing) {
    return items.map((i) =>
      i.sku === next.sku ? { ...i, qty: clampQty(i.qty + qty) } : i,
    );
  }
  return [...items, { ...next, qty }];
}

export function setItemQty(items: CartItem[], id: number, qty: number): CartItem[] {
  if (qty < 1) return items.filter((i) => i.id !== id);
  return items.map((i) => (i.id === id ? { ...i, qty: clampQty(qty) } : i));
}

export function removeItem(items: CartItem[], id: number): CartItem[] {
  return items.filter((i) => i.id !== id);
}

export function clearCart(): CartItem[] {
  return [];
}

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "number" &&
    typeof item.sku === "string" &&
    item.sku.length > 0 &&
    typeof item.qty === "number" &&
    typeof item.label === "string" &&
    typeof item.unitPrice === "number" &&
    Number.isFinite(item.id) &&
    Number.isFinite(item.qty) &&
    Number.isFinite(item.unitPrice) &&
    item.qty >= 1 &&
    item.unitPrice >= 0
  );
}

export function serializeCart(items: CartItem[]): string {
  return JSON.stringify(items);
}

export function parseCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartItem).map((i) => ({ ...i, qty: clampQty(i.qty) }));
  } catch {
    return [];
  }
}

export function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return parseCart(window.localStorage.getItem(CART_STORAGE_KEY));
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, serializeCart(items));
  } catch {
    // storage full or unavailable — cart still works in memory
  }
}
