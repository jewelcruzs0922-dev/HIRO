"use client";

import { Clock, ShieldCheck, Wrench } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Overline from "./Overline";
import WorkshopStatusCard from "./WorkshopStatusCard";

const chips = [
  { icon: Clock, text: "Replies within 24 hours" },
  { icon: ShieldCheck, text: "2-year warranty included" },
  { icon: Wrench, text: "Certified technicians" },
];

export default function SupportHero() {
  return (
    <section className="bg-ink relative overflow-hidden" aria-label="Support hero">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f7f5f1 1px, transparent 1px), linear-gradient(to bottom, #f7f5f1 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 85%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 85%)",
        }}
      />
      <div className="relative mx-auto max-w-[1280px] px-5 pt-24 pb-14 sm:px-6 sm:pt-28 sm:pb-16 md:px-10 md:pt-32 md:pb-20">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <Reveal y={18} duration={0.6}>
            <Overline dark>Support Center</Overline>
            <h1 className="mb-6 max-w-[640px] text-[clamp(2.1rem,6.5vw,3.75rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-white">
              How can we help?
            </h1>
            <p className="max-w-[580px] text-[17.5px] leading-[1.7] text-white/85 sm:text-[19px]">
              Whether you&apos;re choosing your first HIRO, keeping yours running
              perfectly, or need a straight answer fast — the guides below and the
              team behind them have you covered.
            </p>
          </Reveal>

          <Reveal delay={0.15} y={14}>
            <WorkshopStatusCard />
          </Reveal>
        </div>

        <Reveal delay={0.2} y={12}>
          <ul className="mt-10 grid grid-cols-1 gap-0 border-t border-white/15 sm:grid-cols-3 md:mt-12">
            {chips.map((chip, i) => (
              <li
                key={chip.text}
                className={`flex items-center gap-3 py-4 text-[16px] font-medium text-white/90 sm:py-5 sm:text-[16.5px] ${
                  i > 0
                    ? "border-t border-white/12 sm:border-t-0 sm:border-l sm:pl-6"
                    : ""
                } ${i < 2 ? "sm:pr-6" : ""}`}
              >
                <chip.icon
                  size={20}
                  strokeWidth={1.7}
                  aria-hidden
                  className="shrink-0 text-white/70"
                />
                {chip.text}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
