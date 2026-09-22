"use client";

import { AnimatePresence, m } from "framer-motion";
import { useCart } from "./CartProvider";

export default function CartToast() {
  const { toast } = useCart();

  return (
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
            className="bg-ink rounded-[8px] px-4 py-3 text-[13.5px] font-medium text-white shadow-lg"
          >
            {toast}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
