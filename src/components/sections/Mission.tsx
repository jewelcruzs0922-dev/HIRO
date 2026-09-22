"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

type Phase = "collapsed" | "expanding" | "expanded" | "covering" | "revealing";

const WIPE_EASE = [0.22, 1, 0.36, 1] as const;
const WIPE_DURATION = 0.55;

const pillars = [
  {
    label: "Our Story",
    text: "HIRO began with a simple question: what if your daily ride could feel good for you — and for the air everyone breathes? We build e-bikes where modern design meets reliable performance, so the greener choice is also the easy, enjoyable one.",
  },
  {
    label: "Our Vision",
    text: "Cities where clean transport is the default. We picture streets with fewer emissions, commutes that double as fresh air, and communities where choosing to ride is simply the natural thing to do.",
  },
  {
    label: "Our Mission",
    text: "At HIRO, we believe in the power of sustainable mobility. Our e-bikes are designed to help you move freely, reduce emissions, and be part of a cleaner, healthier planet.",
  },
  {
    label: "Our Values",
    text: "Sustainable by default, built to last, and designed around people. We choose durable materials, honest performance, and designs that make the healthy, low-emission choice the easiest one.",
  },
];

function CollapsedView({
  viewMoreButtonRef,
  onExpand,
  hidden,
}: {
  viewMoreButtonRef: React.RefObject<HTMLButtonElement | null>;
  onExpand: () => void;
  hidden: boolean;
}) {
  return (
    <div aria-hidden={hidden || undefined}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Reveal duration={0.7} y={0} margin="-80px">
          <div className="relative h-full min-h-[280px] overflow-hidden sm:min-h-[320px] md:min-h-[440px] lg:min-h-[520px]">
            <Image
              src="/hiro-mission.webp"
              alt="Woman riding a HIRO e-bike outdoors with greenery and city skyline"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </Reveal>

        <Reveal duration={0.7} delay={0.12} y={0} margin="-80px">
          <div className="bg-mission flex h-full flex-col justify-center px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20">
            <span className="mb-3 text-[13.5px] font-semibold tracking-[0.2em] text-white/80 uppercase sm:mb-4 sm:text-[14px]">
              Our Mission
            </span>
            <h2 className="mb-4 max-w-[440px] text-[clamp(1.7rem,5vw,2.75rem)] leading-[1.12] font-extrabold tracking-[-0.025em] text-white sm:mb-5">
              Greener Cities.
              <br />
              Healthier People.
            </h2>
            <p className="mb-7 max-w-[460px] text-[16px] leading-[1.75] text-white/90 sm:mb-8 sm:text-[17px] sm:leading-[1.8]">
              At HIRO, we believe in the power of sustainable mobility. Our e-bikes
              are designed to help you move freely, reduce emissions, and be part of
              a cleaner, healthier planet.
            </p>
            <div>
              <Button
                buttonRef={viewMoreButtonRef}
                onClick={onExpand}
                variant="white"
                showArrow={false}
                className="min-h-[48px]"
              >
                View more
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function ExpandedView({
  expandedRef,
  onCollapse,
}: {
  expandedRef: React.RefObject<HTMLDivElement | null>;
  onCollapse: () => void;
}) {
  return (
    <div
      ref={expandedRef}
      tabIndex={-1}
      className="bg-mission absolute inset-0 z-[5] overflow-y-auto outline-none"
    >
      <div className="mx-auto flex min-h-full max-w-[1280px] flex-col justify-center px-5 py-10 sm:px-6 sm:py-12 md:px-10">
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-8">
          {pillars.map((pillar, i) => (
            <m.div
              key={pillar.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 + i * 0.1 }}
            >
              <h3 className="mb-2.5 text-[15px] font-bold tracking-[0.14em] text-white uppercase sm:mb-3 sm:text-[16px]">
                {pillar.label}
              </h3>
              <p className="text-[16px] leading-[1.75] text-white/85 sm:text-[17px] sm:leading-[1.8]">
                {pillar.text}
              </p>
            </m.div>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.52 }}
          className="mt-8 sm:mt-9"
        >
          <Button
            onClick={onCollapse}
            variant="white"
            showArrow={false}
            className="min-h-[48px]"
          >
            Show less
          </Button>
        </m.div>
      </div>
    </div>
  );
}

export default function Mission() {
  const [phase, setPhase] = useState<Phase>("collapsed");
  const expandedRef = useRef<HTMLDivElement | null>(null);
  const viewMoreButtonRef = useRef<HTMLButtonElement | null>(null);
  const prevPhase = useRef<Phase>("collapsed");

  useEffect(() => {
    if (phase === "expanded" && prevPhase.current === "expanding") {
      expandedRef.current?.focus({ preventScroll: false });
    } else if (phase === "collapsed" && prevPhase.current === "revealing") {
      viewMoreButtonRef.current?.focus({ preventScroll: false });
    }
    prevPhase.current = phase;
  }, [phase]);

  const showExpanded = phase === "expanded" || phase === "covering";

  return (
    <section id="about" aria-label="Our mission">
      <div className="relative">
        <CollapsedView
          viewMoreButtonRef={viewMoreButtonRef}
          onExpand={() => setPhase((p) => (p === "collapsed" ? "expanding" : p))}
          hidden={showExpanded}
        />

        {showExpanded && (
          <ExpandedView
            expandedRef={expandedRef}
            onCollapse={() => setPhase((p) => (p === "expanded" ? "covering" : p))}
          />
        )}

        {phase === "expanding" && (
          <m.div
            key="wipe-in"
            className="bg-mission absolute inset-0 z-10"
            initial={{ clipPath: "inset(0 0 0 100%)" }}
            animate={{ clipPath: "inset(0 0 0 0%)" }}
            transition={{ duration: WIPE_DURATION, ease: WIPE_EASE }}
            onAnimationComplete={() => setPhase("expanded")}
          />
        )}

        {phase === "covering" && (
          <m.div
            key="cover"
            className="bg-mission absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18 }}
            onAnimationComplete={() => setPhase("revealing")}
          />
        )}

        {phase === "revealing" && (
          <m.div
            key="wipe-out"
            className="bg-mission absolute inset-0 z-10"
            initial={{ clipPath: "inset(0 0 0 0%)" }}
            animate={{ clipPath: "inset(0 0 0 100%)" }}
            transition={{ duration: WIPE_DURATION, ease: WIPE_EASE }}
            onAnimationComplete={() => setPhase("collapsed")}
          />
        )}
      </div>
    </section>
  );
}
