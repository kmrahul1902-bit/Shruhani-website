# PHASE 5 · Solutions — use‑cases + industries

**Goal:** the solutions hub plus four use‑case pages and four industry pages — the
"use case" section you asked for.

## Read first

- `plan/docs/03-content-and-pages.md` (Solutions tables)
- `<REFERENCE>/src/app/solutions/**/page.js`
- `<REFERENCE>/cms-sync-baseline/{solutions,useCase*,industry*}.json`
- `<REFERENCE>/parity-baselines/scenario-*.json` (use‑case section anatomy)
- `<REFERENCE>/e2e/industries.spec.js`

## Routes

Hub: `/solutions`.
Use‑cases: `/solutions/use-cases/{fraud, credit-risk, onboarding, compliance}`.
Industries: `/solutions/industries/{banks-sfbs, nbfcs-lending, fintechs-neobanks,
ecommerce-marketplaces}`.

## Tasks

- [ ] Port the solutions hub (`solutions/page.js`) and shared solution section
      components (scenario blocks, industry bentos, stat lines).
- [ ] Port the four use‑case pages via `getContent('useCase<Name>')`.
- [ ] Port the four industry pages via `getContent('industry<Name>')`.
- [ ] **Scrub Sign3‑specific claims** (industry stats, named institutions) →
      Shruhani's verified figures or `TODO(content)`. Industry stat lines are prime
      offenders — verify each number is Shruhani's or remove it.
- [ ] Cross‑link: products ↔ use‑cases ↔ industries where the reference does.
- [ ] Port `industries.spec.js`; add use‑case smoke checks.

## Copy‑paste prompt

> Read `plan/docs/03-content-and-pages.md` (Solutions) and the reference's
> `src/app/solutions/**` pages plus their `cms-sync-baseline` JSON. Port the
> solutions hub, all four use‑case pages, and all four industry pages, wiring content
> through `getContent`. Port the shared solution section components. Scrub every
> Sign3‑specific claim — especially industry stat lines — replacing with Shruhani's
> verified numbers or `TODO(content)`. Preserve the cross‑links between products,
> use‑cases, and industries. Port `industries.spec.js`. Run lint + build + e2e, then
> give me the Phase 5 report and TODO list.

## Acceptance gate

- `/solutions` + all 8 sub‑routes render inside the shell, pink‑themed.
- No unflagged Sign3‑specific stats/claims.
- Cross‑links resolve; responsive; lint + build + e2e pass.

**Commit:** `phase(5): solutions — use-cases + industries`
