"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Button from "./Button";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[540px] overflow-hidden sm:min-h-[600px] md:min-h-[680px] lg:min-h-[720px]"
      aria-label="Hero"
    >
      <div className="absolute inset-0">
        <Image
          src="/hiro-hero.webp"
          alt="Rider on a HIRO electric bike overlooking a mountain landscape at golden hour"
          fill
          preload
          sizes="100vw"
          className="object-cover object-[68%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10 md:from-black/55 md:via-black/25 md:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent md:hidden" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[540px] max-w-[1280px] items-center px-5 pt-16 sm:min-h-[600px] sm:px-6 md:min-h-[680px] md:px-10 md:pt-0 lg:min-h-[720px]">
        <div className="max-w-[540px]">
          <m.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-4 text-[clamp(2.15rem,7vw,4.25rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:mb-5"
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
