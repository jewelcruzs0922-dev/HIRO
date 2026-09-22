"use client";

import { ArrowRight, LifeBuoy, Mail, ShieldCheck, Wrench } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Overline from "./Overline";

type Pathway = {
  n: string;
  icon: typeof LifeBuoy;
  title: string;
  desc: string;
  href: string;
  cta: string;
  span: "hero" | "wide" | "normal";
  tone: "ink" | "white" | "forest";
};

const pathways: Pathway[] = [
  {
    n: "01",
    icon: LifeBuoy,
    title: "FAQ & troubleshooting",
    desc: "Range, charging, rain, and the small fixes you can do at home — the eight questions riders ask most, answered in full.",
    href: "#faq",
    cta: "Browse answers",
    span: "hero",
    tone: "ink",
  },
  {
    n: "02",
    icon: ShieldCheck,
    title: "Warranty & care",
    desc: "What lasts two years, what lasts 90 days, and how we help either way.",
    href: "#warranty",
    cta: "See coverage",
    span: "normal",
    tone: "white",
  },
  {
    n: "03",
    icon: Wrench,
    title: "Service & repairs",
    desc: "Workshop rhythm, home checks, and certified technicians near you.",
    href: "#service",
    cta: "How servicing works",
    span: "normal",
    tone: "white",
  },
  {
    n: "04",
    icon: Mail,
    title: "Talk to a person",
    desc: "Orders, warranty claims, or anything in between — real riders, answering within one business day.",
    href: "#contact",
    cta: "Contact support",
    span: "wide",
    tone: "forest",
  },
];

const spanClass = {
  hero: "sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2",
  wide: "sm:col-span-2 lg:col-span-2",
  normal: "",
};

const toneClass = {
  ink: "bg-ink text-white border-ink",
  white: "bg-white text-charcoal border-charcoal/10",
  forest: "bg-forest text-white border-forest",
};

const ctaClass = {
  ink: "text-white group-hover:text-white/85",
  white: "text-cta group-hover:text-forest",
  forest: "text-white group-hover:text-white/85",
};

const titleClass = {
  ink: "text-white",
  white: "text-charcoal",
  forest: "text-white",
};

const descClass = {
  ink: "text-white/80",
  white: "text-charcoal/75",
  forest: "text-white/85",
};

const numClass = {
  ink: "text-white/35",
  white: "text-cta/45",
  forest: "text-white/40",
};

const iconClass = {
  ink: "text-white/50",
  white: "text-cta/70",
  forest: "text-white/55",
};

export default function PathwaysSection() {
  return (
    <section className="bg-canvas" aria-label="Help topics">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20">
        <Reveal>
          <div className="mb-9 max-w-[680px] md:mb-12">
            <Overline>Start here</Overline>
            <h2 className="text-charcoal mb-4 text-[clamp(1.6rem,4vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.025em]">
              Where would you like to go?
            </h2>
            <p className="text-charcoal/75 text-[17px] leading-[1.7]">
              Four paths cover almost everything. Pick the one that matches your
              situation — each ends with a real person if you still need us.
            </p>
          </div>
        </Reveal>

        <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pathways.map((path, i) => (
            <Reveal
              key={path.title}
              delay={i * 0.07}
              className={`${spanClass[path.span]} min-h-0`}
            >
              <a
                href={path.href}
                className={`group flex h-full min-h-[200px] flex-col justify-between rounded-[20px] border p-6 transition-all duration-200 hover:-translate-y-1 sm:p-7 ${toneClass[path.tone]} ${
                  path.tone === "white" ? "shadow-card hover:shadow-lg" : ""
                }`}
              >
                <div>
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <span
                      className={`text-[clamp(2rem,5vw,3rem)] leading-none font-extrabold tracking-[-0.04em] tabular-nums ${numClass[path.tone]}`}
                    >
                      {path.n}
                    </span>
                    <path.icon
                      size={path.span === "hero" ? 36 : 28}
                      strokeWidth={1.5}
                      aria-hidden
                      className={`shrink-0 ${iconClass[path.tone]}`}
                    />
                  </div>
                  <h3
                    className={`mb-2.5 text-[19px] font-bold tracking-[-0.015em] sm:text-[21px] ${titleClass[path.tone]}`}
                  >
                    {path.title}
                  </h3>
                  <p
                    className={`max-w-[520px] text-[16.5px] leading-[1.65] sm:text-[17px] ${descClass[path.tone]}`}
                  >
                    {path.desc}
                  </p>
                </div>
                <span
                  className={`mt-6 inline-flex items-center gap-2 text-[16.5px] font-semibold ${ctaClass[path.tone]}`}
                >
                  {path.cta}
                  <ArrowRight
                    size={18}
                    strokeWidth={2}
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
