"use client";

import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Overline from "./Overline";

const coverage = [
  {
    period: "2 years",
    label: "Core components",
    items: [
      "Frame & forks",
      "Motor & electronics",
      "Battery (above 70% capacity)",
      "Display & wiring",
    ],
    tone: "strong",
  },
  {
    period: "90 days",
    label: "Wear parts",
    items: ["Brake pads", "Tires", "Chain & cassette"],
    tone: "mid",
  },
  {
    period: "Not covered",
    label: "We’ll still help",
    items: ["Crash damage", "Corrosion from neglect", "Non-certified modifications"],
    tone: "soft",
  },
] as const;

export default function WarrantySection() {
  return (
    <section className="bg-ink" aria-label="Warranty">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20">
        <div id="warranty" className="scroll-mt-24">
          <Reveal>
            <div className="mb-9 grid grid-cols-1 items-end gap-6 md:mb-12 lg:grid-cols-[1fr_auto] lg:gap-16">
              <div className="max-w-[640px]">
                <Overline dark>Warranty</Overline>
                <h2 className="mb-4 text-[clamp(1.5rem,4vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.025em] text-white">
                  Two years. No fine-print games.
                </h2>
                <p className="text-[17px] leading-[1.75] text-white/80">
                  Every HIRO leaves our workshop with comprehensive cover on the
                  parts that matter. Here&apos;s the whole picture — nothing hidden
                  in footnotes.
                </p>
              </div>
              <p className="border-cta/60 max-w-[280px] border-l-2 pl-5 text-[15.5px] leading-[1.65] text-white/65">
                Free replacement parts ship under claim. Questions answered within
                one business day.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {coverage.map((block, i) => (
              <Reveal key={block.period} delay={i * 0.08}>
                <div
                  className={`flex h-full flex-col rounded-[18px] border p-6 sm:p-7 ${
                    block.tone === "strong"
                      ? "border-cta/40 bg-white/[0.08]"
                      : block.tone === "mid"
                        ? "border-white/12 bg-white/[0.04]"
                        : "border-white/10 bg-transparent"
                  }`}
                >
                  <p
                    className={`mb-1 text-[clamp(1.6rem,4vw,2.1rem)] leading-none font-extrabold tracking-[-0.03em] ${
                      block.tone === "strong"
                        ? "text-cta"
                        : block.tone === "mid"
                          ? "text-white"
                          : "text-white/50"
                    }`}
                  >
                    {block.period}
                  </p>
                  <p className="mb-5 text-[16px] font-semibold text-white/70">
                    {block.label}
                  </p>
                  <ul className="mt-auto space-y-3">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[16px] leading-[1.5] text-white/90"
                      >
                        {block.tone === "soft" ? (
                          <span
                            aria-hidden
                            className="mt-[0.55em] h-[3px] w-3.5 shrink-0 rounded-full bg-white/35"
                          />
                        ) : (
                          <Check
                            size={17}
                            strokeWidth={2.4}
                            className="text-cta mt-1 shrink-0"
                            aria-hidden
                          />
                        )}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-7 max-w-[720px] text-[15.5px] leading-[1.7] text-white/55">
              Not covered: crash damage, corrosion from neglect, or modifications by
              non-certified shops. We&apos;ll still help you get parts at standard
              rates — you&apos;re never on your own.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
