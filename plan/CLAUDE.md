# CLAUDE.md — Shruhani website revamp

> Drop this file at the **repo root**. Claude Code loads it automatically every
> session. It is the always‑on brief: mission, brand, guardrails, and the rules
> that never change between phases. Phase‑specific instructions live in
> `plan/pipeline/PHASE-*.md`.

## Mission

Rebuild **shruhani.com** as a modern, animated marketing site for **Shruhani
Technologies Pvt. Ltd.** (real‑time fraud & credit‑risk intelligence for Indian
BFSI). Use the `sign3-nexus` codebase as the reference for architecture,
components, and layout. Rebrand fully to Shruhani, with the logo's magenta‑pink
replacing every blue/cyan.

- **Reference codebase** (read‑only source of structure/content): `<REFERENCE>`
  (the unzipped `sign3-nexus-main/`).
- **Target repo**: this repository (currently a single static `index.html`).
- **Brand color**: `#E536A3` (sampled from the logo). Full accessible palette in
  `plan/docs/01-design-system-and-rebrand.md`.

## Guiding principle

Reuse the _scaffolding_, not the _identity_. Layout, component structure, motion,
and page skeletons come from the reference. Brand, copy, and every Sign3‑specific
fact become Shruhani's.

## Non‑negotiable guardrails

1. **Brand substitution, not brand copy.** Replace all Sign3 branding — name,
   logo, wordmark, domain, colors, favicon, OG images, legal entity — with
   Shruhani's.
2. **This is a corporate rebrand of the same legal entity (Sign3 Technologies →
   Shruhani Technologies).** Carry the existing content over. Perform a careful
   **global rename** of Sign3 → Shruhani everywhere: brand name, wordmark/logo,
   domains, email addresses, copyright line, package/repo names where
   brand‑facing, and any product names that are brand‑prefixed. **Do not invent
   or alter metrics, customer names, or claims** — preserve them as written.
   However, mark these rename‑sensitive items `TODO(verify)` so a human confirms
   they reflect the new legal name before the investor presentation:
   1. registered legal entity details — name, CIN, GST, registered address
   2. certification names (ISO/SOC/etc.) reissued under the new entity name
   3. customer logos, testimonials, and press displayable under the new name
   4. investor and partner names on the investors‑partners page

   `TODO(verify)` means "keep the content, flag for human sign‑off" — not
   "remove."

3. **Product names.** Decide once, in Phase 0, whether to keep the reference
   product names (ScreenX / Cortex / Escalation / the six modules) or rename them
   for Shruhani. Do not silently mix. Record the decision in this file under
   "Decisions".
4. **Color goes through tokens only.** Never hardcode a hex in a component.
   Arbitrary Tailwind values (`text-[#123456]`, `rounded-[13px]`) are blocked by
   ESLint and will fail the build. Change brand color by editing token _values_ in
   `src/app/globals.css`, not by editing components.
5. **No secrets in the repo.** API keys, CMS tokens, and demo‑endpoint URLs go in
   `.env.local` (git‑ignored), never committed.
6. **Accessibility is a gate, not a nicety.** Every brand color used for text or
   UI must meet WCAG AA (≥4.5 normal, ≥3.0 large/UI). The palette in the design
   doc is pre‑checked — stay within it.
7. **One phase at a time.** Finish a phase, pass its acceptance gate, commit, then
   move on. Do not start the next phase in the same run unless told to.

## Design‑system rules (inherited from the reference)

- **Tokens are the single source of truth.** All color, type sizes, spacing,
  radius, and shadow live in the `@theme` block(s) of `src/app/globals.css` and
  are consumed as Tailwind utilities (`--color-accent` → `bg-accent`/`text-accent`).
- **Color has three jobs only:** _ground_ (structure), _accent_ (identity), and
  _signal_ (ok/warn/bad on data). No decorative tinting. The pink is the accent;
  the signal triad (green/amber/red) stays as‑is because it encodes verdicts.
- **Type = two faces.** `--font-display` (Plus Jakarta Sans) carries display and
  `title-1`; Inter carries everything else. Never define a font family ad hoc.
- **Compose from the scale.** Never redefine size/leading/weight/tracking in a
  component; use the scale plus a utility for exceptions.
- **`cn()` for conditional classes.** Keep repeated Tailwind strings in shared
  components/tokens, not copy‑pasted.

## Tech stack (target)

Next.js 16 (App Router, RSC by default) · React 19 · Tailwind CSS v4 (`@theme`) ·
Radix UI + lucide‑react · `lottie-web` for vector animation · Vitest + Testing
Library (unit) · Playwright (e2e). Match the reference's `package.json` unless a
Phase 0 decision trims it (e.g. dropping the Strapi CMS in favor of baked content).

## Commands (once scaffolded)

```bash
npm run dev            # local dev
npm run build          # production build (must pass before any phase gate)
npm run lint           # ESLint — blocks hardcoded design values
npm run format:check   # Prettier
npm run test           # Vitest unit tests
npm run test:e2e       # Playwright
npm run check          # lint + format + design-budget + test + build (full gate)
```

If a script is missing after scaffolding, add it to match the reference before
relying on it in a gate.

## Definition of done (per page/component)

- Renders correctly at 360 / 768 / 1024 / 1440 px.
- No hardcoded design values (lint passes).
- No blue/cyan pixels from the old theme (visual + grep check — see design doc).
- Keyboard‑navigable; visible focus rings; images have `alt`; motion respects
  `prefers-reduced-motion`.
- All Sign3‑specific facts replaced or marked `TODO(content)`.
- `npm run build` passes.

## Decisions (fill in as you go)

- **Hosting:** _TBD in Phase 0 (Vercel full‑dynamic ▸ or ▸ static‑export on GitHub Pages)._
- **Content source:** _TBD in Phase 0 (baked JSON from `cms-sync-baseline` ▸ or ▸ live Strapi CMS)._
- **Product naming:** _TBD in Phase 0 (keep reference names ▸ or ▸ rename)._
- **Product accents:** _TBD in Phase 1 (keep green/purple product identities ▸ or ▸ unify to a pink family)._
- **Domain / CNAME:** `shruhani.com` (currently GitHub Pages). Update per hosting decision.
