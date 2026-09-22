"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Overline from "./Overline";

const monthlyChecks = [
  "Tire pressure to spec",
  "Brake feel & pad depth",
  "Chain tension and lube",
  "Kickstand & rack bolts tight",
  "Battery contacts clean",
  "Lights & display working",
] as const;

export default function ServiceSection() {
  return (
    <section className="bg-paper" aria-label="Service">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20">
        <div id="service" className="scroll-mt-24">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
            <Reveal>
              <div>
                <Overline>Service & repairs</Overline>
                <h2 className="text-charcoal mb-4 text-[clamp(1.5rem,4vw,2.1rem)] leading-[1.15] font-extrabold tracking-[-0.025em]">
                  Keep it riding like day one.
                </h2>
                <p className="text-charcoal/80 mb-7 text-[17px] leading-[1.75]">
                  Between visits, five minutes a month prevents most roadside
                  surprises. Prefer we handle it? Support will match you with a
                  certified HIRO workshop near you.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="border-forest/25 rounded-[16px] border bg-white p-5 sm:p-6">
                    <p className="text-forest mb-1 text-[clamp(1.7rem,4vw,2.15rem)] leading-none font-extrabold tracking-[-0.03em]">
                      3 mo
                    </p>
                    <p className="text-charcoal/85 text-[16px] leading-[1.45] font-medium">
                      or 500 km between workshop visits
                    </p>
                    <p className="text-charcoal/55 mt-1.5 text-[15px] leading-[1.5]">
                      Daily riders
                    </p>
                  </div>
                  <div className="border-charcoal/12 rounded-[16px] border bg-white p-5 sm:p-6">
                    <p className="text-charcoal mb-1 text-[clamp(1.7rem,4vw,2.15rem)] leading-none font-extrabold tracking-[-0.03em]">
                      1 yr
                    </p>
                    <p className="text-charcoal/85 text-[16px] leading-[1.45] font-medium">
                      between services
                    </p>
                    <p className="text-charcoal/55 mt-1.5 text-[15px] leading-[1.5]">
                      Weekend riders
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="border-charcoal/12 shadow-card relative overflow-hidden rounded-[20px] border bg-white">
                <div className="border-charcoal/10 flex items-center justify-between gap-4 border-b px-6 py-5 sm:px-7">
                  <p className="text-charcoal text-[14px] font-bold tracking-[0.14em] uppercase">
                    Monthly home check
                  </p>
                  <span className="text-cta text-[15px] font-semibold">
                    5 minutes
                  </span>
                </div>
                <ul className="grid grid-cols-1 gap-0 sm:grid-cols-2">
                  {monthlyChecks.map((item, i) => (
                    <li
                      key={item}
                      className={`text-charcoal/85 flex items-start gap-3 px-6 py-4 text-[16px] leading-[1.5] sm:px-7 sm:py-5 ${
                        i >= 2 ? "border-charcoal/8 border-t" : ""
                      } ${i % 2 === 1 ? "sm:border-t-0 sm:border-l" : ""} ${
                        i >= 2 ? "sm:border-t" : ""
                      }`}
                    >
                      <span
                        aria-hidden
                        className="border-cta/50 mt-[0.1em] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border"
                      >
                        <Check size={12} strokeWidth={3} className="text-cta" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="border-charcoal/10 bg-canvas flex items-center gap-4 border-t px-6 py-4 sm:px-7">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src="/hiro-trail-green.webp"
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-charcoal/70 text-[15.5px] leading-[1.5]">
                    Prefer a workshop? We&apos;ll match you with a certified HIRO
                    technician near you.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
