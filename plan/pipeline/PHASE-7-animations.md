# PHASE 7 · Animations pass

**Goal:** bring every animation up to the reference's polish, recolored to pink,
with reduced‑motion fallbacks — "all the animations" you asked for.

## Read first

- `plan/docs/04-components-and-animations.md` (the three motion layers)
- `plan/docs/01-…` §5 (Lottie color conversion)
- `<REFERENCE>/public/animations/*` (`world-lines.json`, `support.js`)
- `<REFERENCE>/scripts/sync-hero-animations.mjs`
- `<REFERENCE>/CLAUDE.md` § Motion + the Motion section of `globals.css`
- `<REFERENCE>/e2e/{animations,performance}.spec.js`

## Tasks

- [ ] **Lottie:** port `public/animations/*` and convert blue colors to pink
      (`#E536A3` → `[0.898,0.212,0.639,1]`, `#B01B77` → `[0.690,0.106,0.467,1]`).
      Prefer regenerating via `sync-hero-animations.mjs` over hand‑editing built JSON.
- [ ] **Hero diagram:** confirm the animated decision/flow diagram runs and reads
      accent tokens (pink), on home + product pages.
- [ ] **CSS motion:** port reveals, hovers, transitions, marquees from the
      reference's Motion utilities. No new ad‑hoc keyframes — use the tokens.
- [ ] **Reduced motion:** every non‑essential animation has a
      `@media (prefers-reduced-motion: reduce)` fallback (no loops/autoplay). Test by
      toggling the OS setting.
- [ ] **Performance:** animate only `transform`/`opacity`; lazy‑load below‑fold
      Lottie; check no long tasks / layout thrash.
- [ ] Port `animations.spec.js` + `performance.spec.js`.

## Copy‑paste prompt

> Read `plan/docs/04-components-and-animations.md`, §5 of `plan/docs/01-…`, and the
> reference's `public/animations/*`, `scripts/sync-hero-animations.mjs`, and Motion
> guidance. Bring every animation to the reference's level in our project: port and
> recolor the Lottie assets to pink (regenerating via the sync script where
> possible), confirm the hero/flow diagram animates in pink, and port the CSS motion
> utilities (reveals, hovers, transitions). Add `prefers-reduced-motion` fallbacks to
> every non‑essential animation and keep everything to transform/opacity with lazy
> loading below the fold. Port `animations.spec.js` and `performance.spec.js`. Run
> lint + build + those e2e specs, then give me the Phase 7 report.

## Acceptance gate

- No blue frames in any Lottie/vector animation (visual + JSON grep).
- Hero + flow diagrams animate correctly in pink across pages.
- `prefers-reduced-motion: reduce` disables or calms non‑essential motion everywhere.
- `animations.spec.js` + `performance.spec.js` pass; no console errors.
- Lint + build pass.

**Commit:** `phase(7): full animation pass (pink + reduced-motion)`
