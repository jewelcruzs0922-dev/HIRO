import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { navLinks } from "@/lib/nav";
import Reveal from "@/components/ui/Reveal";

function MountainSilhouette() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] w-full"
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <path
        d="M0 220V148L120 96L210 138L340 52L470 130L560 88L680 150L790 70L920 140L1040 60L1160 128L1280 84L1440 150V220H0Z"
        className="fill-ridge-far"
      />
      <path
        d="M0 220V172L140 120L260 168L390 100L520 164L650 118L780 176L920 110L1060 170L1200 124L1320 166L1440 130V220H0Z"
        className="fill-ridge-mid"
      />
      <path
        d="M0 220V196L180 160L320 192L480 148L640 190L800 156L960 194L1120 152L1280 190L1440 164V220H0Z"
        className="fill-ridge-near"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="support" className="bg-ink relative overflow-hidden">
      <MountainSilhouette />

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-6 md:px-10">
        <Reveal y={16} duration={0.6} margin="-40px">
          <div className="grid grid-cols-1 items-center gap-8 pt-12 pb-10 sm:gap-10 sm:pt-14 sm:pb-12 md:grid-cols-3 md:gap-6 md:pt-16 md:pb-14">
            <div className="md:col-span-1">
              <span className="text-[28px] leading-none font-extrabold tracking-[0.2em] text-white sm:text-[32px] md:text-[34px]">
                HIRO
              </span>
            </div>

            <div className="flex flex-col items-center gap-2.5 text-center md:col-span-1">
              <h2 className="text-[18px] leading-tight font-bold tracking-[-0.01em] text-white">
                Ready to Ride?
              </h2>
              <p className="text-[13.5px] leading-snug text-white/70">
                Join the movement. Choose HIRO.
              </p>
              <a
                href="mailto:support@hiro.bike"
                className="inline-flex min-h-[44px] items-center text-[13.5px] text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                support@hiro.bike
              </a>
              <Link
                href="/#bikes"
                className="group bg-cta hover:bg-cta-hover mt-1.5 inline-flex min-h-[44px] items-center gap-2 rounded-[8px] px-5 py-2.5 text-[13.5px] font-medium text-white transition-colors"
              >
                Shop Now
                <ArrowRight
                  size={15}
                  strokeWidth={1.8}
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="hidden md:col-span-1 md:block" aria-hidden />
          </div>
        </Reveal>

        <div className="border-t border-white/8 pt-5 pb-8 md:pt-4 md:pb-7">
          <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between md:gap-6">
            <p className="order-3 text-[12px] text-white/70 md:order-1 md:text-[12.5px]">
              <span suppressHydrationWarning>
                © {new Date().getFullYear()} HIRO. All rights reserved.
              </span>
            </p>

            <nav
              className="order-1 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-7 md:order-2"
              aria-label="Footer"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="inline-flex min-h-[44px] items-center text-[12.5px] text-white/70 transition-colors hover:text-white md:text-[13px]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
