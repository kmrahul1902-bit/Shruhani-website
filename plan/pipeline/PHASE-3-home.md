# PHASE 3 · Home + hero

**Goal:** ship the home page with its animated hero and section cadence — the first
fully finished route inside the shell.

## Read first

- `plan/docs/03-content-and-pages.md` (home row) + `plan/docs/04-…` (Hero)
- `<REFERENCE>/src/app/page.js`
- `<REFERENCE>/src/components/sections/Hero/*`
- `<REFERENCE>/cms-sync-baseline/home.json`
- `<REFERENCE>/e2e/home.spec.js`, `heroFrame.js`

## Tasks

- [ ] Port the **Hero** (`Hero.jsx`, `UseCases.jsx`, helpers, icons) and its wash
      (`--hero-wash-a/b`, now pink).
- [ ] Port `page.js` and the home‑only section components it composes. Enumerate them
      first: `grep -o "from '[^']*sections/[^']*'" <REFERENCE>/src/app/page.js`.
- [ ] Load content via `getContent('home')`; **scrub Sign3‑specific claims** in
      `home.json` (customer logos, metrics) → Shruhani's real values or `TODO(content)`.
- [ ] Set page `metadata` (title/description/OG) for Shruhani.
- [ ] Hero animation runs but is deferred to Phase 7 for the full motion pass — get
      it rendering statically‑correct here; polish motion later.
- [ ] Port `home.spec.js` (adapt selectors/text).

## Copy‑paste prompt

> Read `plan/docs/03-content-and-pages.md`, `plan/docs/04-components-and-animations.md`,
> the reference's `src/app/page.js`, `src/components/sections/Hero/*`, and
> `cms-sync-baseline/home.json`. Port the home page and hero into our project, wiring
> content through `getContent('home')`. First list every section component `page.js`
> imports and port each. Scrub Sign3‑specific claims from the home content — replace
> with Shruhani's real positioning (from `legacy/index.html` and what I provide) or
> insert `TODO(content)`. Set Shruhani page metadata. Get the hero rendering
> correctly (full motion polish is Phase 7). Port and adapt `home.spec.js`. Run
> lint + build + the home e2e test, then give me the Phase 3 report and TODO list.

## Acceptance gate

- `/` renders end‑to‑end inside the Phase‑2 shell, all sections pink‑themed.
- Hero shows correctly; use‑case rotation present (motion polish deferred).
- No Sign3‑specific claims remain unflagged.
- Metadata/OG correct; responsive; lint + build + home e2e pass.

**Commit:** `phase(3): home page + hero`
