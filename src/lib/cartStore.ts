import {
  CART_STORAGE_KEY,
  loadCart,
  parseCart,
  saveCart,
  type CartItem,
} from "./cart";

const EMPTY: CartItem[] = [];

let state: CartItem[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  state = loadCart();
}

function handleStorage(event: StorageEvent) {
  if (event.key !== null && event.key !== CART_STORAGE_KEY) return;
  state = event.key === null ? EMPTY : parseCart(event.newValue);
  emit();
}

export function subscribeCart(listener: () => void): () => void {
  hydrate();
  if (listeners.size === 0) {
    window.addEventListener("storage", handleStorage);
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

export function getCartSnapshot(): CartItem[] {
  hydrate();
  return state;
}

export function getCartServerSnapshot(): CartItem[] {
  return EMPTY;
}

export function commitCart(next: CartItem[]): void {
  hydrate();
  state = next;
  saveCart(next);
  emit();
}

export function nextCartId(items: CartItem[]): number {
  return items.reduce((max, item) => Math.max(max, item.id + 1), 1);
}
