"use client";

import { useRef } from "react";
import { AnimatePresence, m } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { MAX_QTY } from "@/lib/constants";
import { formatEuro } from "@/lib/bikes";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useCart } from "./CartProvider";

export default function CartDrawer() {
  const { count, items, subtotal, isOpen, closeCart, setItemQty, removeItem } =
    useCart();
  const drawerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useFocusTrap(drawerRef, {
    active: isOpen,
    onEscape: closeCart,
    initialFocusRef: closeButtonRef,
  });
  useBodyScrollLock(isOpen);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
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
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
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
            className="fixed top-0 right-0 z-[80] flex h-full w-full max-w-[400px] flex-col bg-[#1A1A1A] text-white shadow-2xl"
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
                <>
                  <p className="mb-4 text-[13px] text-white/60">
                    {count} item{count === 1 ? "" : "s"} · adjust quantities below
                  </p>
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li key={item.id} className="border-b border-white/10 pb-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[14px] leading-snug font-medium">
                              {item.label}
                            </p>
                            <p className="mt-1 text-[13px] text-white/70">
                              {formatEuro(item.unitPrice)} each
                            </p>
                          </div>
                          <p className="text-[14px] font-semibold whitespace-nowrap">
                            {formatEuro(item.unitPrice * item.qty)}
                          </p>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div
                            className="inline-flex items-center rounded-[6px] border border-white/35"
                            role="group"
                            aria-label={`Quantity for ${item.label}`}
                          >
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${item.label}`}
                              disabled={item.qty <= 1}
                              onClick={() => setItemQty(item.id, item.qty - 1)}
                              className="flex h-10 w-10 items-center justify-center text-white/70 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:text-white/70"
                            >
                              <Minus size={14} strokeWidth={2} aria-hidden />
                            </button>
                            <span
                              aria-live="polite"
                              className="min-w-8 text-center text-[14px] font-semibold tabular-nums"
                            >
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase quantity of ${item.label}`}
                              disabled={item.qty >= MAX_QTY}
                              onClick={() => setItemQty(item.id, item.qty + 1)}
                              className="flex h-10 w-10 items-center justify-center text-white/70 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:text-white/70"
                            >
                              <Plus size={14} strokeWidth={2} aria-hidden />
                            </button>
                          </div>

                          <button
                            type="button"
                            aria-label={`Remove ${item.label} from cart`}
                            onClick={() => removeItem(item.id)}
                            className="flex h-10 items-center gap-1.5 px-1 text-[13px] text-white/55 transition-colors hover:text-white"
                          >
                            <Trash2 size={14} strokeWidth={1.7} aria-hidden />
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="border-t border-white/10 px-5 py-5 sm:px-6">
              {items.length > 0 && (
                <div className="mb-4 space-y-2 text-[14px]">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">
                      Subtotal ({count} item{count === 1 ? "" : "s"})
                    </span>
                    <span className="font-semibold">{formatEuro(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Shipping</span>
                    <span className="font-semibold text-[#4A7858]">Free</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-2.5 text-[15px]">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">{formatEuro(subtotal)}</span>
                  </div>
                </div>
              )}
              <p className="mb-4 text-[13px] text-white/70">
                Simulated checkout — no real payment is taken.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                aria-disabled={items.length === 0}
                tabIndex={items.length === 0 ? -1 : undefined}
                className={`min-h-[48px] w-full rounded-[8px] text-[14px] font-medium transition-colors ${
                  items.length === 0
                    ? "pointer-events-none flex cursor-not-allowed items-center justify-center bg-white/10 text-white/50"
                    : "flex items-center justify-center bg-[#4A7858] text-white hover:bg-[#3F684C]"
                }`}
              >
                {items.length === 0
                  ? "Checkout"
                  : `Checkout · ${formatEuro(subtotal)}`}
              </Link>
            </div>
          </m.aside>
        )}
      </AnimatePresence>
    </>
  );
}
