"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { formatEuro } from "@/lib/bikes";
import { usePlacedOrder } from "@/lib/orders";

export default function Confirmation() {
  const order = usePlacedOrder();

  if (order === null) {
    return (
      <div className="mx-auto max-w-[560px] px-5 py-20 text-center sm:px-6">
        <p className="text-forest mb-2 text-[12.5px] font-bold tracking-[0.16em] uppercase">
          No order found
        </p>
        <h1 className="text-charcoal mb-3 text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold tracking-[-0.03em]">
          Nothing to show here
        </h1>
        <p className="text-charcoal/70 mb-7 text-[15px] leading-relaxed">
          Orders only appear after you place one in this browser session.
        </p>
        <Button href="/" className="min-h-[48px]">
          Back to home
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[640px] px-5 py-12 sm:px-6 md:py-16">
      <div className="mb-8 text-center">
        <p className="text-forest mb-3 text-[12.5px] font-bold tracking-[0.16em] uppercase">
          Order confirmed
        </p>
        <h1 className="text-charcoal mb-3 text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold tracking-[-0.03em]">
          Thanks, {order.name.split(" ")[0]}!
        </h1>
        <p className="text-charcoal/70 text-[15px] leading-relaxed">
          Your demo order <strong className="text-charcoal">{order.id}</strong> was
          placed. A confirmation would be sent to{" "}
          <strong className="text-charcoal">{order.email}</strong> in a real store —
          no email was sent here.
        </p>
      </div>

      <div className="border-charcoal/10 rounded-[8px] border bg-white p-5 sm:p-6">
        <h2 className="text-charcoal mb-4 text-[15px] font-bold">Order summary</h2>
        <ul className="space-y-3">
          {order.items.map((item, i) => (
            <li
              key={`${item.label}-${i}`}
              className="border-charcoal/10 flex items-start justify-between gap-3 border-b pb-3 text-[14px]"
            >
              <div>
                <p className="text-charcoal font-medium">{item.label}</p>
                <p className="text-charcoal/70 mt-0.5 text-[13px]">
                  {formatEuro(item.unitPrice)} × {item.qty}
                </p>
              </div>
              <span className="text-charcoal font-semibold whitespace-nowrap">
                {formatEuro(item.unitPrice * item.qty)}
              </span>
            </li>
          ))}
        </ul>
        <div className="border-charcoal/10 mt-4 flex items-center justify-between border-t pt-4 text-[15px]">
          <span className="text-charcoal/70">Total</span>
          <span className="text-charcoal font-bold">{formatEuro(order.total)}</span>
        </div>
        <p className="text-charcoal/65 mt-3 text-[12.5px]">
          Placed {new Date(order.placedAt).toLocaleString()}
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button href="/" className="w-full sm:w-auto">
          Back to home
        </Button>
        <Link
          href="/#bikes"
          className="text-charcoal/70 hover:text-charcoal min-h-[44px] text-[14px] font-medium underline-offset-4 transition-colors hover:underline"
        >
          Keep browsing bikes
        </Link>
      </div>
    </div>
  );
}
