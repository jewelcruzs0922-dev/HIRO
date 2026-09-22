"use client";

import { useRef, type ReactNode } from "react";
import { m, useInView } from "framer-motion";

type InViewOptions = NonNullable<Parameters<typeof useInView>[1]>;
type Margin = InViewOptions["margin"];

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  margin?: Margin;
}

export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.5,
  y = 22,
  margin = "-60px",
}: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </m.div>
  );
}
