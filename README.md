# HIRO — E-Bike Landing Page

A production-style landing page for a fictional premium e-bike brand, built as a **frontend portfolio project** with Next.js App Router, TypeScript, Tailwind CSS v4, and Framer Motion.

> **Role:** Frontend development · design-to-code, responsive UI, motion, accessibility, performance  
> **Status:** Portfolio demo (not a real store — cart is a lightweight client-side demo)

---

## Run locally

```bash
npm install
npm run dev
# http://localhost:3000
```

After pulling image changes: `npm run optimize-images` (PNG → WebP in `public/`).

Before deploying, copy `.env.example` to `.env.local` and set the canonical URL:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-deployment-url.vercel.app
```

---

## Stack

| Layer | Choice |
|--------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Motion | Framer Motion |
| Icons | lucide-react (+ inline SVGs for socials) |
| Images | `next/image` + pre-optimized WebP assets |

---

## Features

- **Overlay header** with scroll state, scroll-spy active nav, mobile full-screen menu (focus trap + Escape + body scroll lock)
- **Hero** with priority LCP image and staged entrance motion
- **Benefits** grid (4 → 2 columns)
- **Featured bike configurator**
  - Cycle Trail / City / Fold with prev–next arrows
  - Color swatches, quantity stepper
  - Expandable detail panel with **demo cart** (badge, toast, slide-over drawer)
- **Mission** split section
- **Footer** with mountain silhouette, nav, contact email, social links
- **A11y:** skip link, landmarks, `aria-*` on controls, focus-visible styles, reduced-motion support
- **SEO:** metadata, canonical URL, Open Graph / Twitter cards, JSON-LD, `robots.txt`, `sitemap.xml`
- **Responsive:** mobile / tablet / desktop breakpoints

---

## Project structure

```
src/
  app/
    layout.tsx        # fonts, metadata, JSON-LD, skip link, providers
    page.tsx          # section order
    not-found.tsx     # 404
    apple-icon.png
    robots.ts
    sitemap.ts
    globals.css       # design tokens, focus styles
  components/
    Header.tsx
    Hero.tsx
    Benefits.tsx
    FeaturedBike.tsx  # bike data + configurator UI
    BikeSpecs.tsx
    Mission.tsx
    Footer.tsx
    Button.tsx        # renders <a> or <button> by intent
    CartProvider.tsx  # demo cart store + toast + drawer
  hooks/
    useFocusTrap.ts
  lib/
    nav.ts            # shared nav links
    site.ts           # canonical site URL
    constants.ts
scripts/
  optimize-images.mjs
public/
  hiro-*.webp         # optimized images
```

---

## Design system (tokens)

| Token | Value |
|--------|--------|
| Paper / cream | `#F7F5F1` / `#FAF8F5` |
| Charcoal | `#1C1C1A` |
| Forest (accent) | `#2F5D3A` |
| CTA green | `#4A7858` (hover `#3F684C`) |
| Featured bg | `#F0EDE8` |
| Mission panel | `#4F6352` |

Type: **Geist Sans** via `next/font`.

---

## Scripts

```bash
npm run dev             # development
npm run build           # production build
npm run start           # serve production build
npm run lint            # ESLint
npm run typecheck       # TypeScript (noEmit)
npm run optimize-images # PNG → WebP in public/
```

---

## Performance notes

- Unused starter components and stock assets removed
- Heavy PNGs converted to WebP (`scripts/optimize-images.mjs`)
- Hero uses `preload` + `sizes`; below-the-fold images use `fill` + `sizes`
- `LazyMotion` + `m.*` for smaller Framer Motion bundles
- Shared focus-trap hook; Geist Mono removed (unused)
- Interactive sections are client components; `BikeSpecs` / `Button` are server-safe

---

## Accessibility notes

- Skip-to-content link (home + 404)
- Keyboard-operable bike controls, color, and quantity
- Mobile menu: focus moved into menu, Tab trapped, Escape closes; mutually exclusive with cart drawer
- Focus restored to triggers after dialog close / bike change / expand
- Global `:focus-visible` ring (light variant on dark surfaces)
- `prefers-reduced-motion` respected via CSS + `MotionConfig reducedMotion="user"`
- WCAG AA contrast on body text and Mission panel

---

## What I’d add next

- Real checkout / inventory API
- Unit + e2e tests (Vitest / Playwright)
- Lighthouse CI in GitHub Actions
- Product routes (`/bikes/[slug]`) if this grew beyond a single page

---

## License

Demo project for portfolio use. Brand “HIRO” and copy are fictional.
