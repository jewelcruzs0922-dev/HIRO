"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "./CartProvider";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Bikes", href: "#bikes" },
  { label: "About", href: "#about" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "Support", href: "#support" },
];

const sectionIds = ["home", "bikes", "about", "sustainability", "support"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const { count, isOpen: cartOpen, openCart } = useCart();
  const menuRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const cartButtonRef = useRef<HTMLButtonElement | null>(null);
  const wasMenuOpen = useRef(false);
  const wasCartOpen = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (wasMenuOpen.current && !menuOpen) {
      menuButtonRef.current?.focus();
    }
    wasMenuOpen.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    if (wasCartOpen.current && !cartOpen) {
      cartButtonRef.current?.focus();
    }
    wasCartOpen.current = cartOpen;
  }, [cartOpen]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;

      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || active === menuRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const t = window.setTimeout(() => {
      menuRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    }, 50);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(t);
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled || menuOpen
            ? "bg-[#1A1A1A]/92 backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between px-5 sm:px-6 md:h-[72px] md:px-10">
          <Link href="/" className="relative z-10" aria-label="HIRO home">
            <span className="text-[26px] font-extrabold tracking-[0.18em] text-white md:text-[28px]">
              HIRO
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = activeId === id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative pb-0.5 text-[13.5px] font-medium tracking-[0.01em] transition-colors ${
                    isActive ? "text-white" : "text-white/75 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full bg-white" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              ref={cartButtonRef}
              onClick={openCart}
              aria-label={
                count > 0
                  ? `Open shopping cart, ${count} item${count === 1 ? "" : "s"}`
                  : "Open shopping cart, empty"
              }
              className="relative -mr-1 flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-white"
            >
              <ShoppingBag size={20} strokeWidth={1.6} />
              {count > 0 && (
                <span
                  className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#4A7858] px-1 text-[10px] font-bold leading-none text-white"
                  aria-hidden
                >
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              ref={menuButtonRef}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center text-white lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 bg-[#1A1A1A]/98 lg:hidden"
          >
            <nav
              ref={menuRef}
              className="flex h-full flex-col items-center justify-center gap-7 px-6"
              aria-label="Mobile"
            >
              {navLinks.map((link, i) => {
                const isActive = activeId === link.href.slice(1);
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.35 }}
                    aria-current={isActive ? "true" : undefined}
                    className={`min-h-[44px] text-[20px] font-medium sm:text-[22px] ${
                      isActive ? "text-white" : "text-white/65"
                    }`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
