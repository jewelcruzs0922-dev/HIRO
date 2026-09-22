"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  addItem as addItemReducer,
  cartCount,
  cartSubtotal,
  clearCart as clearCartReducer,
  removeItem as removeItemReducer,
  setItemQty as setItemQtyReducer,
  type CartItem,
} from "@/lib/cart";
import {
  commitCart,
  getCartServerSnapshot,
  getCartSnapshot,
  nextCartId,
  subscribeCart,
} from "@/lib/cartStore";

export type { CartItem };

interface CartContextValue {
  count: number;
  items: CartItem[];
  subtotal: number;
  isOpen: boolean;
  toast: string | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (qty: number, label: string, unitPrice: number) => void;
  setItemQty: (id: number, qty: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const items = useSyncExternalStore(
    subscribeCart,
    getCartSnapshot,
    getCartServerSnapshot,
  );

  const count = cartCount(items);
  const subtotal = cartSubtotal(items);

  const addItem = useCallback((qty: number, label: string, unitPrice: number) => {
    const current = getCartSnapshot();
    const id = nextCartId(current);
    commitCart(addItemReducer(current, { id, qty, label, unitPrice }));
    setToast(`Added ${qty}× ${label} to cart`);
  }, []);

  const setItemQty = useCallback((id: number, qty: number) => {
    commitCart(setItemQtyReducer(getCartSnapshot(), id, qty));
  }, []);

  const removeItem = useCallback((id: number) => {
    commitCart(removeItemReducer(getCartSnapshot(), id));
  }, []);

  const clearCart = useCallback(() => {
    commitCart(clearCartReducer());
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  const value = useMemo(
    () => ({
      count,
      items,
      subtotal,
      isOpen,
      toast,
      openCart,
      closeCart,
      addItem,
      setItemQty,
      removeItem,
      clearCart,
    }),
    [
      count,
      items,
      subtotal,
      isOpen,
      toast,
      openCart,
      closeCart,
      addItem,
      setItemQty,
      removeItem,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
