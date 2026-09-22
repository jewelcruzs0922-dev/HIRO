import { Minus, Plus } from "lucide-react";
import { MAX_QTY } from "@/lib/constants";

interface QuantityStepperProps {
  value: number;
  onChange: (qty: number) => void;
}

export default function QuantityStepper({ value, onChange }: QuantityStepperProps) {
  return (
    <div className="mb-7 sm:mb-8">
      <p
        id="quantity-label"
        className="mb-3 text-[13px] font-semibold tracking-[0.12em] text-[#1C1C1A]/70 uppercase"
      >
        Quantity
      </p>
      <div
        role="group"
        aria-labelledby="quantity-label"
        className="inline-flex items-center rounded-lg border border-[#1C1C1A]/15"
      >
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => onChange(Math.max(1, value - 1))}
          className="flex h-12 w-12 items-center justify-center text-[#1C1C1A]/65 transition-colors hover:text-[#1C1C1A]"
        >
          <Minus size={16} strokeWidth={1.8} aria-hidden />
        </button>
        <span
          className="w-10 text-center text-[15px] font-semibold text-[#1C1C1A]"
          aria-live="polite"
        >
          {value}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => onChange(Math.min(MAX_QTY, value + 1))}
          className="flex h-12 w-12 items-center justify-center text-[#1C1C1A]/65 transition-colors hover:text-[#1C1C1A]"
        >
          <Plus size={16} strokeWidth={1.8} aria-hidden />
        </button>
      </div>
    </div>
  );
}
