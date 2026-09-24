# 04 · Components & Animations

The reference's components under `src/components/` are the parts you specifically
asked for: header, footer, contact/CTA, and the animations. Reuse them structurally;
they already read color from tokens, so once Phase 1 lands they turn pink for free.

## Layout components (`src/components/layout/`)

### Header (`Header/`)

Files: `Header.jsx`, `MegaMenu.jsx`, `MobileDrawer.jsx`, `DrawerCategory.jsx`,
`header.helpers.js`, `hooks/useHeaderScroll.js`, `megaMenu.icons.jsx`,
`mobileDrawer.*`, `index.js`.

- Sticky header with a **scroll‑state hook** (`useHeaderScroll`) that toggles a
  glass/solid background on scroll.
- **Mega‑menu** for Products / Solutions (desktop), **mobile drawer** with
  collapsible categories (mobile).
- To rebrand: swap the logo (`public/logo.svg`), set nav labels per the Phase‑0
  naming decision, point the primary CTA at `/book-a-demo`. Colors come from tokens.
- The header can tint per page accent (`--color-nav-glass-*`); verify it reads the
  pink accent after Phase 1.

### Footer (`Footer/`)

Files: `Footer.jsx`, `FooterLink.jsx`, `footer.helpers.js`, `footer.icons.jsx`,
`index.js` (+ tests).

- Multi‑column footer: product/solution links, company links, social icons, legal.
- To rebrand: white/mono logo variant (`public/logo-mono-white.svg`), Shruhani
  legal entity + address + CIN/GST, real social URLs, copyright year. Remove any
  Sign3‑specific links/badges.

## Section components (`src/components/sections/`)

### CtaBand (`CtaBand/`) — your contact/CTA band

Files: `CtaBand.jsx`, `CtaBandGate.jsx`, `index.js`.

- The recurring "book a demo" conversion band used across pages.
- `CtaBandGate` conditionally renders it (e.g. hidden on the contact page itself).
- Rebrand: copy + button → `/book-a-demo`; the band's fill uses the accent/blue
  token, so it becomes pink automatically. Confirm white label text uses the
  AA‑safe fill (`--color-blue` = `#C21E86`), not the light logo pink.

### Hero (`Hero/`)

Files: `Hero.jsx`, `UseCases.jsx`, `useCases.helpers.jsx`, `useCases.icons.jsx`,
`index.js` (+ tests).

- Home hero with an animated diagram + rotating use‑case highlights.
- The hero wash uses `--hero-wash-a/b` (repointed to pink in Phase 1). Icons/labels
  come from tokens.

> There are more section components in the reference than listed here (industry
> bentos, module readers, scoring cards, etc.). Enumerate them in Phase 2:
> `ls -R src/components/sections` in the reference, and port each as its page needs
> it (Phases 3–6).

## The animation system (Phase 7)

The reference animates in three layers — replicate all three:

1. **Lottie / vector** — `public/animations/*.json` (e.g. `world-lines.json`) +
   `public/animations/support.js`, driven by `lottie-web`. These JSONs may contain
   **blue colors that must be converted to pink** — see `01-…` §5 for the RGB
   float mapping. `scripts/sync-hero-animations.mjs` regenerates hero animation
   data; prefer editing its source over hand‑editing built JSON.
2. **Hero diagram animation** — the animated decision/flow diagram in the hero and
   product pages. Scripted; verify it reads accent tokens.
3. **CSS motion** — transitions, reveals, hover states, marquees. Defined against
   the reference's Motion tokens/utilities (see its `CLAUDE.md` § Motion and the
   Motion section of `globals.css`).

### Motion guardrails

- **Respect `prefers-reduced-motion`**: every non‑essential animation must have a
  reduced‑motion fallback (no transform/opacity loops, no autoplay). The reference
  already has patterns for this — keep them.
- **Performance:** animate `transform`/`opacity` only; avoid layout‑thrashing
  properties. Lazy‑load Lottie below the fold.
- **Tests:** `e2e/animations.spec.js` and `e2e/performance.spec.js` in the
  reference are your regression net — port and run them (Phase 8).

## Rebrand checklist for every component

- [ ] Logo/wordmark → Shruhani assets.
- [ ] Any inline SVG `fill`/`stroke` blue → pink token or converted hex.
- [ ] White text sits on the AA‑safe pink fill, not the light logo pink.
- [ ] Focus rings visible and pink‑tinted (via accent token).
- [ ] Sign3‑specific labels/claims replaced or `TODO(content)`.
- [ ] Renders at 360 / 768 / 1024 / 1440 px.
