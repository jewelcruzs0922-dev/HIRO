"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ClosingBand() {
  return (
    <section className="bg-mission" aria-label="Support closing">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-5 py-12 sm:px-6 sm:py-14 md:flex-row md:items-center md:px-10 md:py-16">
        <div>
          <h2 className="mb-3 text-[clamp(1.35rem,3.5vw,1.85rem)] leading-[1.2] font-extrabold tracking-[-0.02em] text-white">
            Prefer to browse bikes instead?
          </h2>
          <p className="max-w-[500px] text-[17px] leading-[1.7] text-white/90">
            Answers are sorted — now find your ride. Trail, City, or Fold, every HIRO
            ships with the same two-year promise.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/#bikes"
            className="text-pine hover:bg-canvas inline-flex min-h-[52px] items-center gap-2 rounded-[10px] bg-white px-7 text-[16.5px] font-semibold transition-colors"
          >
            Shop e-bikes
            <ArrowRight size={17} strokeWidth={1.9} aria-hidden />
          </Link>
          <a
            href="mailto:support@hiro.bike"
            className="inline-flex min-h-[52px] items-center gap-2 rounded-[10px] border border-white/40 px-7 text-[16.5px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            Email support
          </a>
        </div>
      </div>
    </section>
  );
}
