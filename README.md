# HIRO — E-Bike Landing Page

A production-style landing + **simulated checkout** for a fictional premium e-bike brand, built as a **frontend portfolio project** with Next.js App Router, TypeScript, Tailwind CSS v4, and Framer Motion.

> **Role:** Frontend development · design-to-code, responsive UI, motion, accessibility, performance
> **Status:** Portfolio demo — full browse → configure → cart → checkout → confirmation flow; payment is **simulated** (no charges, no server-side orders)

---

## Live demo

**Not deployed yet.** Deploy in one command from the repo root:

```bash
npx vercel
```

Then set `NEXT_PUBLIC_SITE_URL` to your deployment URL (see `.env.example`) and replace this line with the live link.

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
NEXT_PUBLIC_SITE_URL=https://your-deployment-url.vercel.app
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
- **Tests:** 25 unit (Vitest) + 14 e2e (Playwright, desktop + mobile) with axe WCAG A/AA in CI — including the populated checkout and confirmation
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
        QuantityStepper.tsx
        BikeSpecs.tsx
      index.ts
    ui/
      Button.tsx             # renders <Link>, <a>, or <button> by intent
      Reveal.tsx             # client scroll-reveal wrapper
  hooks/
    useBodyScrollLock.ts
    useFocusTrap.ts
  lib/
    bikes.ts                 # shared bike catalog (UI + JSON-LD)
    cart.ts                  # pure cart reducers + storage parse/serialize
    cartStore.ts             # external cart store (subscribe/snapshot/commit)
    checkout.ts              # form fields, validation, delivery estimate
    orders.ts                # order id / sessionStorage helpers
    nav.ts                   # shared nav links
    site.ts                  # canonical site URL
    constants.ts
    cart.test.ts             # vitest — cart math, clamping, storage parsing
    checkout.test.ts         # vitest — validation, line images, delivery dates
e2e/
  checkout.spec.ts           # full purchase flow + edge cases
  a11y.spec.ts               # axe WCAG A/AA on key routes
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
- **God components split**: `CartProvider` (state) / `CartDrawer` (dialog) / `CartToast` (announcements); `CheckoutForm` (orchestration) + `FieldInput` / `SectionCard` / `OrderSummary`; `FeaturedBike` (state machine) + overview/details/picker views.
- **Business logic lives in `lib/`**: validation, field defs, delivery estimate, and cart math are pure and framework-free.
- **Shared hooks**: `useFocusTrap` and `useBodyScrollLock` used by header menu and cart drawer (lock restores prior overflow value).

---

## Design system (tokens)

| Token           | Value                       |
| --------------- | --------------------------- |
| Paper / cream   | `#F7F5F1` / `#FAF8F5`       |
| Charcoal        | `#1C1C1A`                   |
| Forest (accent) | `#2F5D3A`                   |
| CTA green       | `#4A7858` (hover `#3F684C`) |
| Featured bg     | `#F0EDE8`                   |
| Mission panel   | `#4F6352`                   |

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

_Local production server (`npm run build && npm run start`), Lighthouse mobile emulation._

### Lighthouse

| Performance | Accessibility | Best practices | SEO     |
| ----------- | ------------- | -------------- | ------- |
| **94**      | **100**       | **100**        | **100** |

| Metric                         | Value   |
| ------------------------------ | ------- |
| First Contentful Paint (FCP)   | ~0.77 s |
| Largest Contentful Paint (LCP) | ~3.1 s  |
| Total Blocking Time (TBT)      | ~45 ms  |
| Cumulative Layout Shift (CLS)  | **0**   |

Scores vary by a point run-to-run on local hardware; re-measure before publishing claims.

### Bundle (production `.next/static`, JS + CSS)

| Raw    | Gzip   | Files |
| ------ | ------ | ----- |
| ~813KB | ~252KB | 17    |

Largest first-load chunk ≈ **224KB raw** (shared framework/vendor).

### Accessibility (axe-core in CI)

- **0 violations** (WCAG 2.0/2.1 A + AA) on `/`, `/checkout` (empty **and** populated), `/checkout/confirmation` (fallback **and** placed order)
- Enforced by `e2e/a11y.spec.ts` on every CI run

### Tests

```bash
npm run test
# 25 passed — cart math/parsing, checkout validation, line images, delivery dates

npm run test:e2e
# 14 passed — full order flow on desktop + mobile, guards, 4× axe per viewport
# (home, empty checkout, fallback confirmation, populated checkout + confirmation)
```

---

## Performance notes

- Unused starter components and stock assets removed
- Heavy PNGs → WebP (`scripts/optimize-images.mjs`, quality 72); re-encoded catalog ~2.8MB → ~2.4MB
- Hero uses `preload`; below-the-fold images use `fill` + `sizes`
- `LazyMotion` + `m.*`; Benefits / Mission / Footer are **server components** with a thin `Reveal` client wrapper
- Shared focus-trap hook; `CartProvider` nested **inside** `LazyMotion` so drawer/toast animations run

---

## Accessibility notes

- Skip-to-content link (home + 404)
- Keyboard-operable bike controls, color, and quantity
- Mobile menu: focus moved into menu, Tab trapped, Escape closes; mutually exclusive with cart drawer
- Cart drawer close control lives **inside** the focus trap
- Focus restored to triggers after dialog close / bike change / expand
- Global `:focus-visible` ring (light variant on dark surfaces)
- `prefers-reduced-motion` respected via CSS + `MotionConfig reducedMotion="user"`
- WCAG AA contrast on body text and Mission panel; verified by axe in CI

## Security notes

- Production security headers via `next.config.ts` (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`, `Content-Security-Policy`)
- CSP: `'unsafe-eval'` **development only** (React debugging); production `script-src` is `'self' 'unsafe-inline'`
- JSON-LD serialized with `<` escaped (`<`)
- Checkout keeps order data in **sessionStorage only** — no PII leaves the browser

---

## What I’d add next

- Real payment (Stripe Checkout) + server-side order persistence
- Lighthouse CI budget in GitHub Actions (fail on score regressions)
- Product routes (`/bikes/[slug]`) if this grew beyond a single page
- Visual regression snapshots (Playwright screenshot tests)

---

## License

Demo project for portfolio use. Brand “HIRO” and copy are fictional.
