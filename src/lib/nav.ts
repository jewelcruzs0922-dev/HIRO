export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Bikes", href: "#bikes" },
  { label: "About", href: "#about" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "Support", href: "#support" },
] as const;

export const sectionIds = navLinks.map((link) => link.href.slice(1));
