"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

const SLIDES = [
  {
    src: "/hiro-hero.webp",
    alt: "Rider on a HIRO electric bike overlooking a mountain landscape at golden hour",
    position: "object-[68%_center] md:object-center",
  },
  {
    src: "/hiro-hero-golden.webp",
    alt: "HIRO electric bike on a mountain trail at golden hour",
    position: "object-[60%_center] md:object-center",
  },
  {
    src: "/hiro-hero-lake.webp",
    alt: "Rider sitting on a HIRO e-bike by the lake at sunset",
    position: "object-[58%_center] md:object-center",
  },
] as const;

const SLIDE_INTERVAL_MS = 4000;
const SLIDE_FADE_MS = 1000;

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const timer = setInterval(() => {
      setActiveSlide((i) => (i + 1) % SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[540px] overflow-hidden sm:min-h-[600px] md:min-h-[680px] lg:min-h-[720px]"
      aria-label="Hero"
    >
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            preload={i === 0}
            loading={i === 0 ? "eager" : "lazy"}
            quality={85}
            sizes="100vw"
            aria-hidden={i !== activeSlide}
            className={`object-cover ${slide.position} transition-opacity ease-in-out ${
              i === activeSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDuration: `${SLIDE_FADE_MS}ms` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10 md:from-black/55 md:via-black/25 md:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent md:hidden" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[540px] max-w-[1280px] items-center px-5 pt-16 sm:min-h-[600px] sm:px-6 md:min-h-[680px] md:px-10 md:pt-0 lg:min-h-[720px]">
        <div className="max-w-[540px]">
          <m.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-4 text-[clamp(2.15rem,7vw,4.25rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-white sm:mb-5"
          >
            A Cleaner
            <br />
            Tomorrow,
            <br />
            Rides Today.
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-6 max-w-[440px] text-[15px] leading-[1.65] text-white/85 sm:mb-7 sm:text-[16px] lg:text-[17px]"
          >
            HIRO e-bikes combine modern design,
            <br className="hidden sm:block" />
            reliable performance, and a greener future.
            <br className="hidden sm:block" />
            Ride further. Live better.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55 }}
          >
            <Button href="#bikes" className="min-h-[48px]">
              Explore Our E-Bikes
            </Button>
          </m.div>
        </div>
      </div>
    </section>
  );
}
