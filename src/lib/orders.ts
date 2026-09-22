import { useSyncExternalStore } from "react";

interface OrderLine {
  label: string;
  qty: number;
  unitPrice: number;
}

export interface PlacedOrder {
  id: string;
  email: string;
  name: string;
  items: OrderLine[];
  total: number;
  placedAt: string;
}

const STORAGE_KEY = "hiro-last-order";

const listeners = new Set<() => void>();

function emitOrderChange() {
  for (const listener of listeners) listener();
}

export function saveOrder(order: PlacedOrder): boolean {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
    emitOrderChange();
    return true;
  } catch {
    return false;
  }
}

export function createOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()
      : Math.random().toString(36).slice(2, 10).toUpperCase();
  return `HIRO-${stamp}-${rand}`;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getOrderSnapshot(): string | null {
  return window.sessionStorage.getItem(STORAGE_KEY);
}

function getServerOrderSnapshot(): string | null {
  return null;
}

function isOrderLine(value: unknown): value is OrderLine {
  if (typeof value !== "object" || value === null) return false;
  const line = value as Record<string, unknown>;
  return (
    typeof line.label === "string" &&
    typeof line.qty === "number" &&
    Number.isFinite(line.qty) &&
    line.qty >= 1 &&
    typeof line.unitPrice === "number" &&
    Number.isFinite(line.unitPrice) &&
    line.unitPrice >= 0
  );
}

export function isPlacedOrder(value: unknown): value is PlacedOrder {
  if (typeof value !== "object" || value === null) return false;
  const order = value as Record<string, unknown>;
  return (
    typeof order.id === "string" &&
    order.id.length > 0 &&
    typeof order.email === "string" &&
    order.email.length > 0 &&
    typeof order.name === "string" &&
    order.name.length > 0 &&
    Array.isArray(order.items) &&
    order.items.every(isOrderLine) &&
    typeof order.total === "number" &&
    Number.isFinite(order.total) &&
    order.total >= 0 &&
    typeof order.placedAt === "string"
  );
}

export function parseOrder(raw: string | null): PlacedOrder | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isPlacedOrder(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function usePlacedOrder(): PlacedOrder | null {
  const raw = useSyncExternalStore(
    subscribe,
    getOrderSnapshot,
    getServerOrderSnapshot,
  );
  return parseOrder(raw);
}
