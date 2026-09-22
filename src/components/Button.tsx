"use client";

import { ArrowRight } from "lucide-react";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "white";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit";
  "aria-label"?: string;
}

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  "aria-label": ariaLabel,
}: ButtonProps) {
  const base =
    "group inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-[8px] px-5 py-3 text-[14px] font-medium tracking-[0.01em] transition-all duration-200 sm:px-6";

  const styles = {
    primary: "bg-[#4A7858] text-white hover:bg-[#3F684C]",
    outline:
      "border border-charcoal/25 text-charcoal hover:border-charcoal/50 hover:bg-charcoal/[0.03]",
    white: "bg-white text-[#2A3A2C] hover:bg-[#F5F0EB]",
  };

  const content = (
    <>
      {children}
      <ArrowRight
        size={16}
        strokeWidth={1.8}
        className="transition-transform duration-200 group-hover:translate-x-1"
      />
    </>
  );

  const classes = `${base} ${styles[variant]} ${className}`;

  if (href !== undefined) {
    return (
      <a href={href} onClick={onClick} className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
