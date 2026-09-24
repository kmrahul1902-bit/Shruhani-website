# PHASE 8 · SEO · performance · tests · launch

**Goal:** production‑harden and ship. Full `npm run check` green, deployed, domain
live, old site retired.

## Read first

- `plan/docs/02-architecture.md` (hosting path)
- `<REFERENCE>/src/app/{robots.js,sitemap.js}`, `next.config.mjs`
- `<REFERENCE>/scripts/{seo-checklist.mjs,audit-schema.mjs}`,
  `e2e/{seo,performance,responsive,design-system}.spec.js`
- `<REFERENCE>/DEPLOYMENT.md`

## SEO

- [ ] Per‑route `metadata` (title, description, canonical, OG/Twitter) — Shruhani
      copy + share image.
- [ ] `robots.js` + `sitemap.js` output correct `shruhani.com` URLs.
- [ ] JSON‑LD structured data (Organization, Product, FAQ, Article) via
      `audit-schema.mjs`; fix flagged items.
- [ ] `manifest.json`, favicon set, `theme-color = #E536A3`.
- [ ] Set the org's real social profiles + `sameAs`.

## Performance

- [ ] Images: `next/image`, correct sizes, modern formats, lazy below fold.
- [ ] Fonts: `next/font` with `display: swap`, subset.
- [ ] Lighthouse ≥ 90 on Performance/Accessibility/Best‑Practices/SEO (mobile).
- [ ] No console errors; no CLS from hero/animations.

## Tests / gates

- [ ] `npm run check` (lint + format + design‑budget + test + build) green.
- [ ] Full Playwright suite passes (`test:e2e`), incl. responsive + a11y specs.
- [ ] `design:budget` passes (no token collisions / drift).
- [ ] Final **zero‑blue** grep across `src` + `public` returns nothing.

## Launch (per hosting decision)

- **Path A (Vercel/Node):** connect repo, set env vars, deploy. Move
  `shruhani.com` DNS to the host; remove the GitHub Pages `CNAME`. Verify HTTPS +
  apex/www redirect. Wire the demo endpoint's email/CRM.
- **Path B (static export + GitHub Pages):** GitHub Action builds + publishes
  `out/`; keep `CNAME`. Verify the custom domain + HTTPS still resolve.
- [ ] 301 any changed URLs from the old single‑page site.
- [ ] Delete `legacy/index.html` and any leftover Sign3 assets.
- [ ] Resolve **all** remaining `TODO(content)` / `TODO(legal)` before go‑live, or
      explicitly sign off on what ships as placeholder.
- [ ] Tag the launch commit.

## Copy‑paste prompt

> Read `plan/docs/02-architecture.md` and the reference's `robots.js`, `sitemap.js`,
> SEO scripts, `next.config.mjs`, and `DEPLOYMENT.md`. Production‑harden our site:
> set per‑route Shruhani metadata + OG, correct robots/sitemap for shruhani.com, add
> JSON‑LD and fix `audit-schema` findings, finalize manifest/favicons/theme‑color,
> and optimize images/fonts for Lighthouse ≥ 90 mobile. Get `npm run check` and the
> full Playwright suite green, and confirm the final zero‑blue grep is clean.
> Prepare deployment for our hosting path (Vercel or static‑export GitHub Pages),
> including DNS/CNAME handling for shruhani.com and 301s for changed URLs. List every
> outstanding `TODO(content)`/`TODO(legal)` that must be resolved before launch.
> Give me the Phase 8 report with the go‑live checklist status.

## Acceptance gate (launch)

- `npm run check` + full e2e green; Lighthouse ≥ 90 (mobile) on all four categories.
- Zero blue anywhere (visual + grep).
- Deployed; `shruhani.com` serves the new site over HTTPS; redirects work.
- All `TODO(content)`/`TODO(legal)` resolved or explicitly signed off.
- `legacy/` and any Sign3 assets removed.

**Commit:** `phase(8): seo, perf, qa + launch` → **tag** `v2.0.0`
