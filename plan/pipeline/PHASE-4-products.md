# PHASE 4 · Products — suites + modules

**Goal:** all nine product routes: three suites (ScreenX, Cortex, Escalation) and
six modules. This exercises the `[data-accent]` per‑product theming.

## Read first

- `plan/docs/03-content-and-pages.md` (Products table)
- `<REFERENCE>/src/app/products/**/page.js`
- `<REFERENCE>/cms-sync-baseline/{screenx,cortex,escalation,module*}.json`
- `<REFERENCE>/parity-baselines/{device-*,sms-*}.json` (module section anatomy)
- `<REFERENCE>/e2e/{screenx,cortex,escalation}.spec.js`

## Routes

Suites: `/products/screenx`, `/products/cortex`, `/products/escalation`.
Modules: `/products/modules/{behavioural-biometrics, device-intelligence,
digital-footprint, image-intelligence, location-intelligence, sms-intelligence}`.

## Tasks

- [ ] Port shared product/module section components first (hero, "what it reads"
      reader, integration band, outputs, applies‑to, gap). List them from a suite
      page's imports before porting pages.
- [ ] Port each suite page; confirm `[data-accent]` sets the right identity
      (ScreenX = pink; Cortex/Escalation per §4 decision).
- [ ] Port each module page; content via `getContent('module<Name>')`.
- [ ] **Scrub Sign3‑specific claims** per module (metrics, client refs) → Shruhani or
      `TODO(content)`. If renaming products (Phase 0), apply the rename consistently
      across routes, nav, breadcrumbs, and content.
- [ ] Port the suite e2e specs; add module smoke checks.

## Copy‑paste prompt

> Read `plan/docs/03-content-and-pages.md` (Products) and the reference's
> `src/app/products/**` pages plus their `cms-sync-baseline` JSON. Port the shared
> product/module section components, then all three suite pages and all six module
> pages into our project, wiring content through `getContent`. Confirm the
> `[data-accent]` cascade themes each suite correctly (ScreenX pink; Cortex/
> Escalation per our decision). Scrub Sign3‑specific claims per page → Shruhani
> values or `TODO(content)`. If we chose to rename products, apply the rename
> everywhere consistently. Port the suite e2e specs. Run lint + build + those e2e
> tests, then give me the Phase 4 report and TODO list. You may split this into 4a
> (suites) and 4b (modules), but only mark Phase 4 done when all nine routes pass.

## Acceptance gate

- All 9 product routes render inside the shell, correctly themed.
- Per‑product accent identity works via `[data-accent]`.
- No unflagged Sign3‑specific claims; renames (if any) fully consistent.
- Lint + build + product e2e pass; responsive.

**Commit:** `phase(4): product suites + modules`
