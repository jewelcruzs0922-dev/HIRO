import { Minus, Plus } from "lucide-react";
import { MAX_QTY } from "@/lib/constants";

interface QuantityStepperProps {
  value: number;
  onChange: (qty: number) => void;
  size?: "md" | "sm";
  tone?: "light" | "dark";
  labelPrefix?: string;
  groupLabel?: string;
  className?: string;
}

export default function QuantityStepper({
  value,
  onChange,
  size = "md",
  tone = "light",
  labelPrefix,
  groupLabel,
  className = "",
}: QuantityStepperProps) {
  const decreaseLabel = labelPrefix
    ? `Decrease quantity of ${labelPrefix}`
    : "Decrease quantity";
  const increaseLabel = labelPrefix
    ? `Increase quantity of ${labelPrefix}`
    : "Increase quantity";

  const buttonSize = size === "md" ? "h-12 w-12" : "h-10 w-10";
  const buttonTone =
    tone === "dark"
      ? "text-white/70 hover:text-white disabled:opacity-35"
      : "text-charcoal/65 hover:text-charcoal disabled:opacity-35";
  const border = tone === "dark" ? "border-white/35" : "border-charcoal/50";
  const countSize = size === "md" ? "w-10 text-[15px]" : "min-w-8 text-[14px]";

  return (
    <div className={className}>
      {!groupLabel && (
        <p
          id="quantity-label"
          className="text-charcoal/70 mb-3 text-[13px] font-semibold tracking-[0.12em] uppercase"
        >
          Quantity
        </p>
      )}
      <div
        role="group"
        aria-label={groupLabel}
        aria-labelledby={groupLabel ? undefined : "quantity-label"}
        className={`inline-flex items-center rounded-[6px] border ${border}`}
      >
        <button
          type="button"
          aria-label={decreaseLabel}
          disabled={value <= 1}
          onClick={() => onChange(Math.max(1, value - 1))}
          className={`flex items-center justify-center transition-colors disabled:cursor-not-allowed ${buttonSize} ${buttonTone}`}
        >
          <Minus size={size === "md" ? 16 : 14} strokeWidth={1.8} aria-hidden />
        </button>
        <span
          aria-live="polite"
          className={`${countSize} text-center font-semibold tabular-nums ${
            tone === "dark" ? "text-white" : "text-charcoal"
          }`}
        >
          {value}
        </span>
        <button
          type="button"
          aria-label={increaseLabel}
          disabled={value >= MAX_QTY}
          onClick={() => onChange(Math.min(MAX_QTY, value + 1))}
          className={`flex items-center justify-center transition-colors disabled:cursor-not-allowed ${buttonSize} ${buttonTone}`}
        >
          <Plus size={size === "md" ? 16 : 14} strokeWidth={1.8} aria-hidden />
        </button>
      </div>
    </div>
  );
}
