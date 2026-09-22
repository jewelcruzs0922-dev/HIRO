export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Bikes", href: "/#bikes" },
  { label: "About", href: "/#about" },
  { label: "Sustainability", href: "/#sustainability" },
  { label: "Support", href: "/support" },
] as const;

export function clickTopIfSamePage(
  e: { preventDefault: () => void },
  href: string,
): void {
  if (href.includes("#")) return;
  if (typeof window === "undefined") return;
  if (window.location.pathname !== href) return;
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
