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
        <p className="mb-2 text-[12.5px] font-bold tracking-[0.16em] text-[#2F5D3A] uppercase">
          No order found
        </p>
        <h1 className="mb-3 text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold tracking-[-0.03em] text-[#1C1C1A]">
          Nothing to show here
        </h1>
        <p className="mb-7 text-[15px] leading-relaxed text-[#1C1C1A]/70">
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
        <p className="mb-3 text-[12.5px] font-bold tracking-[0.16em] text-[#2F5D3A] uppercase">
          Order confirmed
        </p>
        <h1 className="mb-3 text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold tracking-[-0.03em] text-[#1C1C1A]">
          Thanks, {order.name.split(" ")[0]}!
        </h1>
        <p className="text-[15px] leading-relaxed text-[#1C1C1A]/70">
          Your demo order <strong className="text-[#1C1C1A]">{order.id}</strong> was
          placed. A confirmation would be sent to{" "}
          <strong className="text-[#1C1C1A]">{order.email}</strong> in a real store —
          no email was sent here.
        </p>
      </div>

      <div className="rounded-[8px] border border-[#1C1C1A]/10 bg-white p-5 sm:p-6">
        <h2 className="mb-4 text-[15px] font-bold text-[#1C1C1A]">Order summary</h2>
        <ul className="space-y-3">
          {order.items.map((item, i) => (
            <li
              key={`${item.label}-${i}`}
              className="flex items-start justify-between gap-3 border-b border-[#1C1C1A]/10 pb-3 text-[14px]"
            >
              <div>
                <p className="font-medium text-[#1C1C1A]">{item.label}</p>
                <p className="mt-0.5 text-[13px] text-[#1C1C1A]/70">
                  {formatEuro(item.unitPrice)} × {item.qty}
                </p>
              </div>
              <span className="font-semibold whitespace-nowrap text-[#1C1C1A]">
                {formatEuro(item.unitPrice * item.qty)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-[#1C1C1A]/10 pt-4 text-[15px]">
          <span className="text-[#1C1C1A]/70">Total</span>
          <span className="font-bold text-[#1C1C1A]">{formatEuro(order.total)}</span>
        </div>
        <p className="mt-3 text-[12.5px] text-[#1C1C1A]/65">
          Placed {new Date(order.placedAt).toLocaleString()}
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button href="/" className="w-full sm:w-auto">
          Back to home
        </Button>
        <Link
          href="/#bikes"
          className="min-h-[44px] text-[14px] font-medium text-[#1C1C1A]/70 underline-offset-4 transition-colors hover:text-[#1C1C1A] hover:underline"
        >
          Keep browsing bikes
        </Link>
      </div>
    </div>
  );
}
