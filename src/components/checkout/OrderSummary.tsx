import Image from "next/image";
import { Check, Truck } from "lucide-react";
import { formatEuro } from "@/lib/bikes";
import QuantityStepper from "@/components/ui/QuantityStepper";
import { estimatedDelivery, itemImage } from "@/lib/checkout";
import { useCart } from "@/components/cart";

export default function OrderSummary() {
  const { items, count, subtotal, setItemQty, removeItem } = useCart();
  const delivery = estimatedDelivery();

  return (
    <aside
      aria-label="Order summary"
      className="border-charcoal/10 shadow-card h-fit rounded-[12px] border bg-white p-5 md:sticky md:top-[88px] md:p-6"
    >
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <h2 className="text-charcoal text-[15px] font-bold">Order summary</h2>
        <span className="text-charcoal/65 text-[13px]">
          {count} item{count === 1 ? "" : "s"}
        </span>
      </div>
      <p className="text-charcoal/65 mb-4 text-[13px]">
        Free standard shipping on every demo order.
      </p>

      <ul className="space-y-4">
        {items.map((item) => {
          const image = itemImage(item.sku);
          return (
            <li
              key={item.id}
              className="border-charcoal/8 flex gap-3 border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="bg-featured relative h-16 w-20 shrink-0 overflow-hidden rounded-[8px]">
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
                  <p className="text-charcoal text-[14px] leading-snug font-medium">
                    {item.label}
                  </p>
                  <p className="text-charcoal text-[14px] font-semibold whitespace-nowrap">
                    {formatEuro(item.unitPrice * item.qty)}
                  </p>
                </div>
                <p className="text-charcoal/65 mt-0.5 text-[13px]">
                  {formatEuro(item.unitPrice)} each
                </p>
                <div className="mt-2.5 flex items-center justify-between gap-2">
                  <QuantityStepper
                    value={item.qty}
                    onChange={(qty) => setItemQty(item.id, qty)}
                    size="sm"
                    labelPrefix={item.label}
                    groupLabel={`Quantity for ${item.label}`}
                  />
                  <button
                    type="button"
                    aria-label={`Remove ${item.label} from cart`}
                    onClick={() => removeItem(item.id)}
                    className="text-charcoal/65 hover:text-charcoal text-[12.5px] font-medium underline-offset-2 transition-colors hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="border-charcoal/10 mt-5 space-y-2 border-t pt-4 text-[14px]">
        <div className="flex items-center justify-between">
          <span className="text-charcoal/65">Subtotal</span>
          <span className="text-charcoal font-semibold">{formatEuro(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-charcoal/65">Shipping</span>
          <span className="text-forest font-semibold">Free</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-charcoal/65">VAT</span>
          <span className="text-charcoal font-semibold">Included</span>
        </div>
        <div className="border-charcoal/10 flex items-center justify-between border-t pt-3 text-[16px]">
          <span className="text-charcoal font-bold">Total</span>
          <span className="text-charcoal font-bold">{formatEuro(subtotal)}</span>
        </div>
      </div>

      <div className="bg-featured mt-5 rounded-[8px] p-3.5">
        <div className="flex items-start gap-2.5">
          <Truck
            size={16}
            strokeWidth={1.7}
            className="text-forest mt-0.5 shrink-0"
            aria-hidden
          />
          <div>
            <p className="text-charcoal text-[13px] font-semibold">
              Estimated delivery
            </p>
            <p className="text-charcoal/70 mt-0.5 text-[13px]">
              {delivery} · standard (demo)
            </p>
          </div>
        </div>
      </div>

      <ul className="text-charcoal/65 mt-4 grid grid-cols-1 gap-2 text-[12.5px] sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {[
          "2-year frame warranty",
          "30-day returns (demo)",
          "Assembled & tested",
        ].map((perk) => (
          <li key={perk} className="flex items-center gap-1.5">
            <Check
              size={13}
              strokeWidth={2.5}
              className="text-forest shrink-0"
              aria-hidden
            />
            {perk}
          </li>
        ))}
      </ul>
    </aside>
  );
}
