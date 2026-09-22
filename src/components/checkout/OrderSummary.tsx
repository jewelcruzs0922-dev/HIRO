import Image from "next/image";
import { Check, Truck } from "lucide-react";
import { formatEuro } from "@/lib/bikes";
import { MAX_QTY } from "@/lib/constants";
import { estimatedDelivery, itemImage } from "@/lib/checkout";
import { useCart } from "@/components/cart";

export default function OrderSummary() {
  const { items, count, subtotal, setItemQty, removeItem } = useCart();
  const delivery = estimatedDelivery();

  return (
    <aside
      aria-label="Order summary"
      className="h-fit rounded-[12px] border border-[#1C1C1A]/10 bg-white p-5 shadow-[0_1px_2px_rgba(28,28,26,0.04)] md:sticky md:top-[88px] md:p-6"
    >
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <h2 className="text-[15px] font-bold text-[#1C1C1A]">Order summary</h2>
        <span className="text-[13px] text-[#1C1C1A]/65">
          {count} item{count === 1 ? "" : "s"}
        </span>
      </div>
      <p className="mb-4 text-[13px] text-[#1C1C1A]/65">
        Free standard shipping on every demo order.
      </p>

      <ul className="space-y-4">
        {items.map((item) => {
          const image = itemImage(item.label);
          return (
            <li
              key={item.id}
              className="flex gap-3 border-b border-[#1C1C1A]/8 pb-4 last:border-0 last:pb-0"
            >
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-[8px] bg-[#F0EDE8]">
                {image && (
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain p-1"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[14px] leading-snug font-medium text-[#1C1C1A]">
                    {item.label}
                  </p>
                  <p className="text-[14px] font-semibold whitespace-nowrap text-[#1C1C1A]">
                    {formatEuro(item.unitPrice * item.qty)}
                  </p>
                </div>
                <p className="mt-0.5 text-[13px] text-[#1C1C1A]/65">
                  {formatEuro(item.unitPrice)} each
                </p>
                <div className="mt-2.5 flex items-center justify-between gap-2">
                  <div
                    className="inline-flex items-center rounded-[6px] border border-[#1C1C1A]/50"
                    role="group"
                    aria-label={`Quantity for ${item.label}`}
                  >
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.label}`}
                      disabled={item.qty <= 1}
                      onClick={() => setItemQty(item.id, item.qty - 1)}
                      className="flex h-9 w-9 items-center justify-center text-[#1C1C1A]/65 transition-colors hover:text-[#1C1C1A] disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      −
                    </button>
                    <span
                      aria-live="polite"
                      className="min-w-7 text-center text-[13.5px] font-semibold tabular-nums"
                    >
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.label}`}
                      disabled={item.qty >= MAX_QTY}
                      onClick={() => setItemQty(item.id, item.qty + 1)}
                      className="flex h-9 w-9 items-center justify-center text-[#1C1C1A]/65 transition-colors hover:text-[#1C1C1A] disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${item.label} from cart`}
                    onClick={() => removeItem(item.id)}
                    className="text-[12.5px] font-medium text-[#1C1C1A]/65 underline-offset-2 transition-colors hover:text-[#1C1C1A] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 space-y-2 border-t border-[#1C1C1A]/10 pt-4 text-[14px]">
        <div className="flex items-center justify-between">
          <span className="text-[#1C1C1A]/65">Subtotal</span>
          <span className="font-semibold text-[#1C1C1A]">
            {formatEuro(subtotal)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#1C1C1A]/65">Shipping</span>
          <span className="font-semibold text-[#2F5D3A]">Free</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#1C1C1A]/65">VAT</span>
          <span className="font-semibold text-[#1C1C1A]">Included</span>
        </div>
        <div className="flex items-center justify-between border-t border-[#1C1C1A]/10 pt-3 text-[16px]">
          <span className="font-bold text-[#1C1C1A]">Total</span>
          <span className="font-bold text-[#1C1C1A]">{formatEuro(subtotal)}</span>
        </div>
      </div>

      <div className="mt-5 rounded-[8px] bg-[#F0EDE8] p-3.5">
        <div className="flex items-start gap-2.5">
          <Truck
            size={16}
            strokeWidth={1.7}
            className="mt-0.5 shrink-0 text-[#2F5D3A]"
            aria-hidden
          />
          <div>
            <p className="text-[13px] font-semibold text-[#1C1C1A]">
              Estimated delivery
            </p>
            <p className="mt-0.5 text-[13px] text-[#1C1C1A]/70">
              {delivery} · standard (demo)
            </p>
          </div>
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-1 gap-2 text-[12.5px] text-[#1C1C1A]/65 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {[
          "2-year frame warranty",
          "30-day returns (demo)",
          "Assembled & tested",
        ].map((perk) => (
          <li key={perk} className="flex items-center gap-1.5">
            <Check
              size={13}
              strokeWidth={2.5}
              className="shrink-0 text-[#2F5D3A]"
              aria-hidden
            />
            {perk}
          </li>
        ))}
      </ul>
    </aside>
  );
}
