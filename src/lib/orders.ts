import { useSyncExternalStore } from "react";

export interface OrderLine {
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

export function saveOrder(order: PlacedOrder): void {
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

export function createOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `HIRO-${stamp}-${rand}`;
}

function subscribe() {
  return () => {};
}

function getOrderSnapshot(): string | null {
  return window.sessionStorage.getItem(STORAGE_KEY);
}

function getServerOrderSnapshot(): string | null {
  return null;
}

export function usePlacedOrder(): PlacedOrder | null {
  const raw = useSyncExternalStore(
    subscribe,
    getOrderSnapshot,
    getServerOrderSnapshot,
  );
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PlacedOrder;
  } catch {
    return null;
  }
}
