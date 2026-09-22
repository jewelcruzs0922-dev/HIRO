import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { navLinks } from "@/lib/nav";
import Reveal from "@/components/ui/Reveal";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
      <polygon
        points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

const socials = [
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/",
    label: "Instagram",
  },
  { icon: FacebookIcon, href: "https://www.facebook.com/", label: "Facebook" },
  { icon: YoutubeIcon, href: "https://www.youtube.com/", label: "YouTube" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/", label: "TikTok" },
];

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
        fill="#242422"
      />
      <path
        d="M0 220V172L140 120L260 168L390 100L520 164L650 118L780 176L920 110L1060 170L1200 124L1320 166L1440 130V220H0Z"
        fill="#2A2A28"
      />
      <path
        d="M0 220V196L180 160L320 192L480 148L640 190L800 156L960 194L1120 152L1280 190L1440 164V220H0Z"
        fill="#1F1F1E"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="support" className="relative overflow-hidden bg-[#1A1A1A]">
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
                className="group mt-1.5 inline-flex min-h-[44px] items-center gap-2 rounded-[8px] bg-[#4A7858] px-5 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-[#3F684C]"
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

            <div className="order-2 flex items-center gap-5 md:order-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (opens in new tab)`}
                  className="flex h-11 w-11 items-center justify-center text-white/70 transition-colors hover:text-white"
                >
                  <social.icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
