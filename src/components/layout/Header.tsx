"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart";
import { navLinks } from "@/lib/nav";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

function hashOf(href: string): string | null {
  const i = href.indexOf("#");
  return i === -1 ? null : href.slice(i + 1);
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { count, isOpen: cartOpen, openCart, closeCart } = useCart();
  const router = useRouter();
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
    const ids = navLinks
      .map((l) => hashOf(l.href))
      .filter((id): id is string => id !== null);
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestId !== null && bestRatio > 0) setActiveId(bestId);
      },
      {
        rootMargin: "-72px 0px -45% 0px",
        threshold: [0, 0.05, 0.15, 0.3, 0.5, 0.75, 1],
      },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useBodyScrollLock(menuOpen);

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
        className={`fixed top-0 right-0 left-0 z-50 transition-colors duration-300 ${
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
              const isActive = hashOf(link.href) === activeId;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className="group inline-flex min-h-[44px] items-center text-[13.5px] font-medium tracking-[0.01em]"
                >
                  <span
                    className={`relative pb-0.5 transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-white/75 group-hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-white transition-transform duration-200 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </span>
                </Link>
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
                  className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#4A7858] px-1 text-[10px] leading-none font-bold text-white"
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
              {menuOpen ? (
                <X size={24} aria-hidden />
              ) : (
                <Menu size={24} aria-hidden />
              )}
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
            <nav
              ref={menuRef}
              className="flex h-full flex-col items-center justify-center gap-7 px-6"
              aria-label="Mobile"
            >
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
                className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center text-white/80 hover:text-white"
              >
                <X size={24} aria-hidden />
              </button>
              {navLinks.map((link, i) => {
                const isActive = hashOf(link.href) === activeId;
                return (
                  <m.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.35 }}
                    aria-current={isActive ? "location" : undefined}
                    className={`min-h-[44px] text-[20px] font-medium transition-colors sm:text-[22px] ${
                      isActive ? "text-white" : "text-white/65"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      closeMenu();
                      router.push(link.href);
                    }}
                  >
                    {link.label}
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
