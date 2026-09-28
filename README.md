# HIRO — E-Bike Landing Page

[![Live](https://img.shields.io/badge/live-hiro--azurite2.vercel.app-000000?logo=vercel&logoColor=white)](https://hiro-azurite2.vercel.app)
[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)](https://github.com/jewelcruzs0922-dev/HIRO/actions)
[![License: MIT](https://img.shields.io/badge/license-MIT-2F6FEB)](LICENSE)

A production-style landing + **simulated checkout** for a fictional premium e-bike brand, built as a **frontend portfolio project** with Next.js App Router, TypeScript, Tailwind CSS v4, and Framer Motion.

> **Role:** Frontend development · design-to-code, responsive UI, motion, accessibility, performance
> **Status:** Portfolio demo — full browse → configure → cart → checkout → confirmation flow; payment is **simulated** (no charges, no server-side orders)

---

## Live demo

**https://hiro-azurite2.vercel.app**

Production is deployed from this repo with the Vercel CLI (`npx vercel --prod`). The canonical URL lives in `src/lib/site.ts` (safe fallback if the env var is missing); set `NEXT_PUBLIC_SITE_URL` per `.env.example` when using a custom domain.

---

## Run locally

```bash
npm install
npx playwright install chromium # first time only (or use system Edge/Chrome via channel)
npm run dev
# http://localhost:3000
```

After pulling image changes: `npm run optimize-images` (PNG → WebP in `public/`).

Before deploying, copy `.env.example` to `.env.local` and set the canonical URL:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://hiro-azurite2.vercel.app
```

---

## Stack

| Layer     | Choice                                   |
| --------- | ---------------------------------------- |
| Framework | Next.js 16 (App Router)                  |
| Language  | TypeScript                               |
| Styling   | Tailwind CSS v4                          |
| Motion    | Framer Motion                            |
| Icons     | lucide-react (+ inline SVGs for socials) |
| Images    | `next/image` + pre-optimized WebP assets |
| Tests     | Vitest · Playwright · axe-core           |

---

## Features

- **Overlay header** with scroll state, scroll-spy active nav (`aria-current`), mobile full-screen menu (focus trap + Escape + body scroll lock)
- **Hero** with preloaded LCP image and staged entrance motion
- **Benefits** grid (4 → 2 columns) — server-rendered with client `Reveal` wrapper
- **Featured bike configurator**
  - Cycle Trail / City / Fold with prev–next arrows
  - Color swatches, quantity stepper
  - Expandable detail panel with **cart** (badge, toast, slide-over drawer)
- **Mock checkout**
  - `/checkout` — validated delivery form + order summary (empty-cart guard)
  - `/checkout/confirmation` — order id, lines, total (sessionStorage only)
  - Simulated payment — no card data, no network writes
- **Mission** split section
- **Footer** with mountain silhouette, nav, contact email
- **Tests:** 37 unit (Vitest) + 16 e2e (Playwright, desktop + mobile) with axe WCAG A/AA in CI — including the populated checkout and confirmation
- **A11y:** skip link, landmarks, `aria-*` on controls, focus-visible styles, reduced-motion support
- **SEO:** metadata, canonical URL, Open Graph / Twitter cards, JSON-LD, `robots.txt`, `sitemap.xml`
- **Responsive:** mobile / tablet / desktop breakpoints

---

## Project structure

```
src/
  app/
    layout.tsx              # fonts, metadata, JSON-LD, skip link, providers
    page.tsx                # section order
    not-found.tsx           # 404
    checkout/
      page.tsx              # checkout route (server shell + metadata)
      confirmation/
        page.tsx
        Confirmation.tsx    # reads last order from sessionStorage
    apple-icon.png
    robots.ts
    sitemap.ts
    globals.css             # design tokens, focus styles
  components/
    cart/                   # cart feature
      CartProvider.tsx      # context + useSyncExternalStore bridge
      CartDrawer.tsx        # slide-over dialog UI
      CartToast.tsx         # aria-live toast UI
      index.ts
    checkout/               # checkout feature
      CheckoutForm.tsx      # form orchestration + submit
      FieldInput.tsx
      SectionCard.tsx
      OrderSummary.tsx
      index.ts
    layout/
      Header.tsx            # scroll state, mobile menu, cart trigger
      Footer.tsx
      index.ts
    sections/
      Hero.tsx
      Benefits.tsx           # server component + Reveal
      Mission.tsx            # server component + Reveal
      bike/
        FeaturedBike.tsx     # configurator state machine
        BikeOverview.tsx     # default (collapsed) view
        BikeDetails.tsx      # expanded configurator view
        ColorPicker.tsx
        BikeSpecs.tsx
      index.ts
    ui/
      Button.tsx             # renders <Link>, <a>, or <button> by intent
      QuantityStepper.tsx    # shared ± control (cart, order summary, configurator)
      Reveal.tsx             # client scroll-reveal wrapper
  hooks/
    useBodyScrollLock.ts
    useFocusTrap.ts
  lib/
    bikes.ts                 # shared catalog — numeric prices (UI + JSON-LD)
    cart.ts                  # pure cart reducers + storage parse/serialize (SKU lines, v2)
    cartStore.ts             # external cart store (subscribe/snapshot/commit)
    checkout.ts              # form fields, validation, delivery estimate
    orders.ts                # crypto.randomUUID ids / sessionStorage helpers
    nav.ts                   # shared nav links
    site.ts                  # canonical site URL
    constants.ts
    cart.test.ts             # vitest — cart math, SKU merge, storage parsing
    checkout.test.ts         # vitest — validation, line images, delivery dates
    orders.test.ts           # vitest — stored-order guard, order id shape
e2e/
  checkout.spec.ts           # full purchase flow + edge cases
  a11y.spec.ts               # axe WCAG A/AA on key routes
  nav.spec.ts                # scroll-spy aria-current + mobile menu keyboard
.github/workflows/ci.yml    # typecheck, lint, format, unit, build, e2e
playwright.config.ts         # desktop + mobile (Pixel 7) projects
vitest.config.mts
scripts/
  optimize-images.mjs
public/
  hiro-*.webp                # optimized images
```

### Architecture notes

- **Feature folders** (`cart/`, `checkout/`, `layout/`, `sections/`, `ui/`) with barrel exports — consumers import from `@/components/<feature>`, never across private internals.
- **Cart is an external store** (`lib/cartStore.ts`): pure reducers in `lib/cart.ts`, persistence + cross-tab sync in the store, React glue via `useSyncExternalStore`. No setState-in-effect hydration, no write-before-load race.
- **Cart identity is the SKU** — lines merge/compare by `sku`, not display label, and persist under the `hiro-cart-v2` key with schema-validated parsing (bad data falls back to an empty cart).
- **Prices are numbers** — `formatEuro` renders them; JSON-LD gets the raw number. No string-to-number parsing anywhere.
- **One shared `QuantityStepper`** (`ui/`) drives the cart drawer, order summary, and configurator via `size` / `tone` props — replaces three duplicated implementations.
- **Order writes fail safely** — `saveOrder` returns success/failure; checkout keeps the button usable (try/finally) and shows an inline error if sessionStorage is unavailable. Order ids use `crypto.randomUUID()`.
- **God components split**: `CartProvider` (state) / `CartDrawer` (dialog) / `CartToast` (announcements); `CheckoutForm` (orchestration) + `FieldInput` / `SectionCard` / `OrderSummary`; `FeaturedBike` (state machine) + overview/details/picker views.
- **Business logic lives in `lib/`**: validation, field defs, delivery estimate, and cart math are pure and framework-free.
- **Shared hooks**: `useFocusTrap` and `useBodyScrollLock` used by header menu and cart drawer (lock restores prior overflow value).

---

## Design system (tokens)

Defined once in `@theme inline` (`globals.css`); components consume utilities — the only raw hex left in the app is the metadata themeColor and product swatch data.

| Token                                    | Value                             |
| ---------------------------------------- | --------------------------------- |
| `paper` / `cream` / `canvas`             | `#F7F5F1` / `#FAF8F5` / `#F5F0EB` |
| `charcoal` / `ink`                       | `#1C1C1A` / `#1A1A1A`             |
| `forest`                                 | `#2F5D3A`                         |
| `cta` / `cta-hover`                      | `#4A7858` / `#3F684C`             |
| `pine`                                   | `#2A3A2C`                         |
| `featured`                               | `#F0EDE8`                         |
| `mission`                                | `#4F6352`                         |
| `ridge-far` / `ridge-mid` / `ridge-near` | `#242422` / `#2A2A28` / `#1F1F1E` |
| `shadow-card`                            | `0 1px 2px rgb(28 28 26 / 0.04)`  |

Type: **Geist Sans** via `next/font`.

---

## Scripts

```bash
npm run dev             # development
npm run build           # production build
npm run start           # serve production build
npm run lint            # ESLint
npm run lint:fix        # ESLint --fix
npm run typecheck       # TypeScript (noEmit)
npm run format          # Prettier write
npm run format:check    # Prettier check
npm run test            # Vitest unit tests (lib logic)
npm run test:watch      # Vitest watch mode
npm run test:e2e        # Playwright, desktop + mobile (uses dev server locally; CI runs against `npm run start`)
npm run optimize-images # PNG → WebP in public/
```

---

## Evidence (measured)

_Production URL (`https://hiro-azurite2.vercel.app`), Lighthouse 13.5.0 mobile emulation, median of 3 runs (95 / 97 / 92)._

### Lighthouse

| Performance | Accessibility | Best practices | SEO     |
| ----------- | ------------- | -------------- | ------- |
| **95**      | **100**       | **100**        | **100** |

| Metric                         | Value   |
| ------------------------------ | ------- |
| First Contentful Paint (FCP)   | ~0.95 s |
| Largest Contentful Paint (LCP) | ~2.7 s  |
| Total Blocking Time (TBT)      | ~0.11 s |
| Cumulative Layout Shift (CLS)  | **0**   |
| Speed Index                    | ~2.5 s  |
| Time to First Byte (TTFB)      | ~40 ms  |

LCP is the preloaded hero image; under Lighthouse's simulated mobile network (~1.6 Mbps) that image transfer dominates the score — the only flagged audit opportunity is render-blocking resources (~60–150 ms estimated savings). The performance score varies a couple of points run-to-run (95 / 97 / 92); the median is reported above.

### Bundle (production `.next/static`, JS + CSS)

| Raw    | Gzip   | Files |
| ------ | ------ | ----- |
| ~812KB | ~252KB | 17    |

Largest first-load chunk ≈ **224KB raw** (shared framework/vendor).

### Accessibility (axe-core in CI)

- **0 violations** (WCAG 2.0/2.1 A + AA) on `/`, `/checkout` (empty **and** populated), `/checkout/confirmation` (fallback **and** placed order)
- Enforced by `e2e/a11y.spec.ts` on every CI run

### Tests

```bash
npm run test
# 37 passed — cart math/SKU merge/storage parsing, checkout validation,
# order storage guard + id shape, delivery dates

npm run test:e2e
# 16 passed, 2 skipped (viewport-gated by design) — full order flow on
# desktop + mobile, guards, scroll-spy, mobile-menu keyboard flow,
# 4× axe per viewport (home, empty checkout, fallback confirmation,
# populated checkout + confirmation). CI runs against `npm run start`
# with the production CSP + SRI headers (verified locally the same way).
```

---

## Performance notes

- Unused starter components and stock assets removed
- Heavy PNGs → WebP (`scripts/optimize-images.mjs`, quality 72); re-encoded catalog ~2.8MB → ~2.4MB
- Hero uses `preload` with full `imagesrcset`; below-the-fold images use `fill` + `sizes`
- `LazyMotion` + `m.*`; Benefits / Mission / Footer are **server components** with a thin `Reveal` client wrapper
- Shared focus-trap hook; `CartProvider` nested **inside** `LazyMotion` so drawer/toast animations run
- Design tokens in `@theme inline` — components use utilities (`bg-featured`, `text-ink`, …) instead of scattered hex
- Texture overlay layers below dialogs (`z-index: 30`); bike image width is a CSS variable (zero `!important`)
- `@media (scripting: none)` forces entrance-animated content visible when JavaScript is unavailable

---

## Accessibility notes

- Skip-to-content link (home + 404)
- Keyboard-operable bike controls, color, and quantity
- Mobile menu: focus moved into menu, Tab trapped, Escape closes; mutually exclusive with cart drawer
- Cart drawer close control lives **inside** the focus trap
- Focus restored to triggers after dialog close / bike change / expand
- Global `:focus-visible` ring (light variant on dark surfaces)
- Non-text contrast (WCAG 1.4.11): input, stepper, swatch, and cart-quantity borders meet 3:1 against their surfaces
- `prefers-reduced-motion` respected via CSS + `MotionConfig reducedMotion="user"`
- WCAG AA contrast on body text and Mission panel; verified by axe in CI

## Security notes

- Production security headers on every route via `next.config.ts`: `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security` (preload), and a locked-down `Content-Security-Policy`
- CSP hardening: `object-src 'none'`, `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`, `upgrade-insecure-requests`, `font-src 'self'`, `img-src 'self' blob: data:`
- `script-src 'self' 'unsafe-inline'` in production — Next.js embeds inline flight/hydration scripts in static HTML; a per-request nonce would **force dynamic rendering** (per Next.js docs), trading this site's static profile for a threat model it doesn't have. `'unsafe-eval'` is development-only (React debugging)
- Subresource Integrity enabled (`experimental.sri.sha256`) — external scripts ship `integrity` hashes
- JSON-LD serialized with `<` escaped (`<`)
- Checkout keeps order data in **sessionStorage only** — no PII leaves the browser; payment is simulated (no card fields, no network writes)

---

## What I’d add next

- Real payment (Stripe Checkout) + server-side order persistence
- Lighthouse CI budget in GitHub Actions (fail on score regressions)
- Nonce-based CSP via middleware if this ever grew dynamic (authenticated data)
- Product routes (`/bikes/[slug]`) if this grew beyond a single page
- Visual regression snapshots (Playwright screenshot tests)

---

## License

Demo project for portfolio use. Brand “HIRO” and copy are fictional.
