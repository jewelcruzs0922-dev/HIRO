"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, m } from "framer-motion";
import { X } from "lucide-react";
import { MAX_QTY } from "@/lib/constants";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface CartItem {
  id: number;
  qty: number;
  label: string;
}

interface CartContextValue {
  count: number;
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (qty: number, label: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const nextId = useRef(1);
  const drawerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const count = items.reduce((sum, item) => sum + item.qty, 0);

  const addItem = useCallback((qty: number, label: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.label === label);
      if (existing) {
        return prev.map((i) =>
          i.label === label
            ? { ...i, qty: Math.min(MAX_QTY, i.qty + qty) }
            : i
        );
      }
      return [
        ...prev,
        { id: nextId.current++, qty: Math.min(MAX_QTY, qty), label },
      ];
    });
    setToast(`Added ${qty}× ${label} to cart`);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  useFocusTrap(drawerRef, {
    active: isOpen,
    onEscape: closeCart,
    initialFocusRef: closeButtonRef,
  });

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const value = useMemo(
    () => ({ count, items, isOpen, openCart, closeCart, addItem }),
    [count, items, isOpen, openCart, closeCart, addItem]
  );

  return (
    <CartContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <>
            <m.div
              key="cart-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[70] bg-black/50"
              onClick={closeCart}
              aria-hidden
            />
            <m.aside
              key="cart-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Shopping cart"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-[400px] flex-col bg-[#1A1A1A] text-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
                <h2 className="text-[15px] font-bold tracking-[0.02em]">
                  Your Cart{count > 0 ? ` (${count})` : ""}
                </h2>
                <button
                  type="button"
                  ref={closeButtonRef}
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="flex h-11 w-11 items-center justify-center text-white/70 transition-colors hover:text-white"
                >
                  <X size={20} strokeWidth={1.8} aria-hidden />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
                {items.length === 0 ? (
                  <p className="text-[14px] text-white/70">
                    Your cart is empty. Add a bike to see it here.
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-start justify-between gap-4 border-b border-white/10 pb-4"
                      >
                        <div>
                          <p className="text-[14px] font-medium leading-snug">
                            {item.label}
                          </p>
                          <p className="mt-1 text-[13px] text-white/70">
                            Qty {item.qty}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="border-t border-white/10 px-5 py-5 sm:px-6">
                <p className="mb-4 text-[13px] text-white/70">
                  Demo cart — checkout isn&apos;t implemented.
                </p>
                <button
                  type="button"
                  disabled
                  className="min-h-[48px] w-full cursor-not-allowed rounded-[8px] bg-white/10 text-[14px] font-medium text-white/50"
                >
                  Checkout (demo)
                </button>
              </div>
            </m.aside>
          </>
        )}
      </AnimatePresence>

      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-5 z-[90] flex justify-center px-4"
      >
        <AnimatePresence>
          {toast && (
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              role="status"
              className="rounded-[8px] bg-[#1A1A1A] px-4 py-3 text-[13.5px] font-medium text-white shadow-lg"
            >
              {toast}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </CartContext.Provider>
  );
}
