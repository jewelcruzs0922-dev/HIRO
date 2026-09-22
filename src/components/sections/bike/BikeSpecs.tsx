import { Target, Gauge, Battery, Weight } from "lucide-react";
import type { SpecItem } from "@/lib/bikes";

const icons = [Target, Gauge, Battery, Weight];

export default function BikeSpecs({ specs }: { specs: SpecItem[] }) {
  return (
    <div
      role="group"
      aria-label="Specifications"
      className="grid grid-cols-2 gap-x-6 gap-y-7 border-t border-[#1C1C1A]/12 pt-7 sm:max-w-md md:max-w-none lg:flex lg:max-w-none lg:flex-col lg:gap-9 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10"
    >
      {specs.map((s, i) => {
        const Icon = icons[i % icons.length];
        return (
          <div key={s.value} className="flex items-start gap-3">
            <span
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2F5D3A]/45 lg:h-9 lg:w-9"
              aria-hidden
            >
              <Icon size={15} strokeWidth={1.6} className="text-[#2F5D3A]" />
            </span>
            <div className="min-w-0">
              {s.top && (
                <p className="text-[12px] leading-tight text-[#1C1C1A]/70 lg:text-[12.5px]">
                  {s.top}
                </p>
              )}
              <p className="text-[14.5px] leading-tight font-bold tracking-[-0.01em] text-[#1C1C1A] lg:text-[15.5px]">
                {s.value}
              </p>
              <p className="mt-0.5 text-[12px] leading-tight text-[#1C1C1A]/70 lg:text-[12.5px]">
                {s.bottom}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
