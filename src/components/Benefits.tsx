"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Zap, ShieldCheck, Heart } from "lucide-react";

const benefits = [
  {
    icon: Leaf,
    title: "Eco-Friendly",
    desc: "Reduce your carbon footprint\nwith every ride.",
  },
  {
    icon: Zap,
    title: "Powerful Performance",
    desc: "Smooth, consistent power\nfor every journey.",
  },
  {
    icon: ShieldCheck,
    title: "Built to Last",
    desc: "Durable design for\nreal-world adventures.",
  },
  {
    icon: Heart,
    title: "Better for You",
    desc: "More freedom, less stress,\nhealthier living.",
  },
];

export default function Benefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="sustainability"
      className="bg-[#FAF8F5] py-14 sm:py-16 md:py-20 lg:py-24"
      aria-label="Benefits"
    >
      <div ref={ref} className="mx-auto max-w-[1280px] px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-10">
          {benefits.map((b, i) => (
            <m.div
              key={b.title}
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.1 }}
              className="flex flex-col items-start"
            >
              <b.icon
                size={36}
                strokeWidth={1.4}
                className="mb-4 text-[#2F5D3A] sm:mb-5 md:mb-6 md:h-11 md:w-11"
                aria-hidden
              />
              <h2 className="mb-2 text-[14px] font-bold tracking-[-0.01em] text-[#1C1C1A] sm:text-[15px] md:text-[15.5px]">
                {b.title}
              </h2>
              <p className="whitespace-pre-line text-[13px] leading-[1.6] text-[#1C1C1A]/70 sm:text-[13.5px]">
                {b.desc}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
