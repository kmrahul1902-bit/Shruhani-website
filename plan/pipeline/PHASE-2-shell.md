# PHASE 2 · Shell — header, mega‑menu, mobile drawer, footer, CTA band

**Goal:** stand up the persistent chrome so every subsequent page slots into a
finished frame. This covers the header/footer/contact‑CTA you specifically asked for.

## Read first

- `plan/docs/04-components-and-animations.md`
- `plan/docs/03-content-and-pages.md` (nav IA + global content)
- `<REFERENCE>/src/components/layout/Header/*`, `.../Footer/*`
- `<REFERENCE>/src/components/sections/CtaBand/*`
- `<REFERENCE>/src/app/layout.js`
- `<REFERENCE>/parity-baselines/megamenu.json` (mega‑menu structure)

## Tasks

- [ ] Add logo assets: `public/logo.svg` (color) + `public/logo-mono-white.svg`
      (for dark footer/header). Wire the favicon set. > Logo: SVG color + white-mono variants, from user's fingerprint-S PNG; `#E536A3`.
- [ ] Port **Header** (`Header.jsx`, `MegaMenu.jsx`, `MobileDrawer.jsx`,
      `DrawerCategory.jsx`, helpers, `useHeaderScroll`, icon files). Set nav labels
      per naming decision; primary CTA → `/book-a-demo`.
- [ ] Port **Footer** (`Footer.jsx`, `FooterLink.jsx`, helpers, icons). Fill
      Shruhani legal entity, address, CIN/GST, real socials, copyright. Remove any
      Sign3‑specific links/badges → `TODO(content)` where you lack the real value.
- [ ] Port **CtaBand** (`CtaBand.jsx`, `CtaBandGate.jsx`). Confirm the fill uses the
      AA‑safe pink (`--color-blue` = `#C21E86`) so white label passes contrast.
- [ ] Wire header + footer into root `layout.js`; wrap pages so `CtaBandGate` shows
      on content pages and hides on `/book-a-demo`.
- [ ] Port the component tests (`Header.test.jsx`, `Footer.test.jsx`,
      `footer.icons.test.js`, `header.helpers.test.js`) and adapt.

## Copy‑paste prompt

> Read `plan/docs/04-components-and-animations.md` and the reference's
> `src/components/layout/Header/*`, `Footer/*`, `sections/CtaBand/*`, and
> `src/app/layout.js`. Port the Header (with mega‑menu + mobile drawer + scroll
> hook), Footer, and CtaBand into our project, wiring them into the root layout. Add
> `public/logo.svg` and a white mono variant and use them in the header/footer. Set
> nav labels per our naming decision and point every primary CTA at `/book-a-demo`.
> Fill the footer with Shruhani's legal name/address/socials where I've provided
> them and insert `TODO(content)` for anything missing. Ensure the CTA band's fill
> uses the AA‑safe pink so white text passes contrast. Port and adapt the existing
> component tests. Run `npm run test`, `npm run lint`, `npm run build`, then give me
> the Phase 2 report and a list of `TODO(content)` items.

## Acceptance gate

- Header sticky + scroll state works; mega‑menu opens on desktop; mobile drawer
  opens/closes and is keyboard‑ and screen‑reader‑navigable.
- Footer shows correct Shruhani info (or clearly flagged `TODO(content)`).
- CTA band renders with pink fill + white AA text; hidden on `/book-a-demo`.
- Logo (color + mono) displays correctly on light and dark grounds.
- Tests + lint + build pass; responsive at 360/768/1024/1440.

**Commit:** `phase(2): header, footer, cta band + layout shell`
