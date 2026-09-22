import { ArrowRight } from "lucide-react";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "white";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit";
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  buttonRef?: React.Ref<HTMLButtonElement>;
}

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
  buttonRef,
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
        aria-hidden
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
      ref={buttonRef}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
    >
      {content}
    </button>
  );
}
