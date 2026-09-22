"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { navLinks, sectionIds } from "@/lib/nav";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const { count, isOpen: cartOpen, openCart, closeCart } = useCart();
  const menuRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const cartButtonRef = useRef<HTMLButtonElement | null>(null);
  const wasMenuOpen = useRef(false);
  const wasCartOpen = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
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

  const handleOpenCart = useCallback(() => {
    setMenuOpen(false);
    openCart();
  }, [openCart]);

  const toggleMenu = useCallback(() => {
    if (!menuOpen) closeCart();
    setMenuOpen(!menuOpen);
  }, [menuOpen, closeCart]);

  useFocusTrap(menuRef, {
    active: menuOpen,
    onEscape: closeMenu,
  });

  return (
    <>
      <m.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled || menuOpen
            ? "bg-[#1A1A1A]/92 backdrop-blur-sm"
            : "bg-[#1A1A1A]/80 backdrop-blur-sm"
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
                  aria-current={isActive ? "location" : undefined}
                  className={`relative inline-flex min-h-[44px] items-center pb-0.5 text-[13.5px] font-medium tracking-[0.01em] transition-colors ${
                    isActive ? "text-white" : "text-white/75 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-2 left-0 h-[2px] w-full rounded-full bg-white" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              ref={cartButtonRef}
              onClick={handleOpenCart}
              aria-label={
                count > 0
                  ? `Open shopping cart, ${count} item${count === 1 ? "" : "s"}`
                  : "Open shopping cart, empty"
              }
              className="relative -mr-1 flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-white"
            >
              <ShoppingBag size={20} strokeWidth={1.6} aria-hidden />
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
              onClick={toggleMenu}
            >
              {menuOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
            </button>
          </div>
        </div>
      </m.header>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 bg-[#1A1A1A]/98 lg:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center text-white/80 hover:text-white"
            >
              <X size={24} aria-hidden />
            </button>
            <nav
              ref={menuRef}
              className="flex h-full flex-col items-center justify-center gap-7 px-6"
              aria-label="Mobile"
            >
              {navLinks.map((link, i) => {
                const isActive = activeId === link.href.slice(1);
                return (
                  <m.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.35 }}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative min-h-[44px] text-[20px] font-medium sm:text-[22px] ${
                      isActive ? "text-white" : "text-white/65"
                    }`}
                    onClick={closeMenu}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-white" />
                    )}
                  </m.a>
                );
              })}
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
