import { Target, Gauge, Battery, Weight } from "lucide-react";
import type { SpecItem } from "@/lib/bikes";

const icons = [Target, Gauge, Battery, Weight];

export default function BikeSpecs({ specs }: { specs: SpecItem[] }) {
  return (
    <div
      role="group"
      aria-label="Specifications"
      className="border-charcoal/12 grid grid-cols-2 gap-x-6 gap-y-7 border-t pt-7 sm:max-w-md md:max-w-none lg:flex lg:max-w-none lg:flex-col lg:gap-9 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10"
    >
      {specs.map((s, i) => {
        const Icon = icons[i % icons.length];
        return (
          <div key={s.value} className="flex items-start gap-3">
            <span
              className="border-forest/45 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border lg:h-9 lg:w-9"
              aria-hidden
            >
              <Icon size={15} strokeWidth={1.6} className="text-forest" />
            </span>
            <div className="min-w-0">
              {s.top && (
                <p className="text-charcoal/70 text-[12px] leading-tight lg:text-[12.5px]">
                  {s.top}
                </p>
              )}
              <p className="text-charcoal text-[14.5px] leading-tight font-bold tracking-[-0.01em] lg:text-[15.5px]">
                {s.value}
              </p>
              <p className="text-charcoal/70 mt-0.5 text-[12px] leading-tight lg:text-[12.5px]">
                {s.bottom}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
