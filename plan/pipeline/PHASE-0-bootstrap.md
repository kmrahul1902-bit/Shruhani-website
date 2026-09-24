# PHASE 0 · Bootstrap & decisions

**Goal:** lock the three decisions, scaffold a Next.js 15 app matching the
reference, and get a blank shell building — before any design or page work.

## Read first

- `plan/CLAUDE.md`
- `plan/docs/02-architecture.md` (stack, folders, hosting + content decisions)
- `<REFERENCE>/package.json`, `next.config.mjs`, `eslint.config.mjs`,
  `postcss.config.mjs`, `jsconfig.json`, `components.json`, `.prettierrc.json`

## Decisions to record in `CLAUDE.md` → Decisions

1. **Hosting:** Path A (Vercel/Node, full features) **or** Path B (static export,
   keep GitHub Pages). _Default: B._
2. **Content source:** baked JSON **or** live Strapi. _Default: baked JSON (pairs with B)._
3. **Product naming:** keep reference names (ScreenX/Cortex/Escalation + 6 modules)
   **or** rename. _Default: keep for now; renaming is a later content pass._

## Tasks

- [ ] Preserve the current site: move existing `index.html` → `legacy/index.html`
      (kept for fact‑mining; deleted before launch). Keep `CNAME` if staying on Pages.
- [ ] Scaffold Next.js 15 App Router matching the reference's config. Copy over:
      `next.config.mjs` (set `output:'export'` **iff** Path B), `eslint.config.mjs`
      (incl. the `no-restricted-syntax` rule), `postcss.config.mjs`, `jsconfig.json`,
      `.prettierrc.json`, `.editorconfig`, `.nvmrc`, Husky hooks.
- [ ] Recreate `package.json` scripts from the reference (dev/build/lint/format/
      test/test:e2e/check). Drop `cms:*` scripts **iff** content = baked JSON.
- [ ] Install deps to match the reference (`next react react-dom tailwindcss
    @tailwindcss/postcss radix-ui lucide-react lottie-web class-variance-authority
    tailwind-merge react-markdown remark-gfm rehype-raw rehype-slug`; dev:
      `vitest @testing-library/* @playwright/test eslint prettier husky …`).
- [ ] Create the folder skeleton from `docs/02` (empty `app/` routes returning a
      placeholder, `components/layout`, `components/sections`, `lib/`, `public/`).
- [ ] Add a minimal root `layout.js` (fonts: Inter + Plus Jakarta Sans via
      `next/font`) and a placeholder `page.js`.
- [ ] **If Path B / baked JSON:** copy `<REFERENCE>/cms-sync-baseline/*.json` →
      `src/content/`, and add `src/lib/content.js` (`getContent`) per `docs/03`.
- [ ] Add `.env.example` (no secrets); ensure `.env.local` is git‑ignored.

## Copy‑paste prompt

> Read `plan/CLAUDE.md`, `plan/docs/02-architecture.md`, and the reference's config
> files. Ask me the three Phase‑0 decisions (hosting, content source, product
> naming) and record my answers in `CLAUDE.md` → Decisions. Then scaffold a Next.js
> 15 App Router project matching the reference: copy its lint/prettier/postcss/
> jsconfig/husky config and `package.json` scripts (dropping CMS scripts if I chose
> baked JSON), install matching dependencies, create the empty route + component
> folder skeleton, add a minimal root layout with Inter + Plus Jakarta Sans, and a
> placeholder home page. Move the existing `index.html` to `legacy/`. If I chose
> baked JSON, copy `cms-sync-baseline/*.json` to `src/content/` and add the
> `getContent` helper. Do **not** style anything yet — that's Phase 1. Run
> `npm run build`, then give me the Phase 0 report.

## Acceptance gate

- `npm run dev` serves a blank placeholder without errors.
- `npm run build` passes.
- `npm run lint` passes on the skeleton.
- Folder structure matches `docs/02`; decisions recorded in `CLAUDE.md`.
- Old `index.html` preserved in `legacy/`; `CNAME` handled per hosting choice.

**Commit:** `phase(0): scaffold next.js app + record decisions`
**Rollback:** the scaffold is additive; `legacy/index.html` still holds the live
site, so `main` can revert to it if needed.
