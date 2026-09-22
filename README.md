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

Before deploying, set the canonical URL:

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
- **SEO:** metadata, Open Graph / Twitter cards, `robots.txt`, `sitemap.xml`
- **Responsive:** mobile / tablet / desktop breakpoints

---

## Project structure

```
src/
  app/
    layout.tsx        # fonts, metadata, skip link, CartProvider
    page.tsx          # section order
    not-found.tsx     # 404
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
| Mission panel | `#6B7E6E` |

Type: **Geist Sans** via `next/font`.

---

## Scripts

```bash
npm run dev      # development
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

---

## Performance notes

- Unused starter components and stock assets removed
- Heavy PNGs converted to WebP (`scripts/optimize-images.mjs`)
- Hero uses `priority` + `sizes`; below-the-fold images use `fill` + `sizes`
- Client components kept to interactive islands

---

## Accessibility notes

- Skip-to-content link
- Keyboard-operable bike controls, color, and quantity
- Mobile menu: focus moved into menu, Tab trapped, Escape closes
- Global `:focus-visible` ring
- `prefers-reduced-motion` respected in CSS

---

## What I’d add next

- Real checkout / inventory API
- Unit + e2e tests (Vitest / Playwright)
- Lighthouse CI in GitHub Actions
- Product routes (`/bikes/[slug]`) if this grew beyond a single page

---

## License

Demo project for portfolio use. Brand “HIRO” and copy are fictional.
