# 02 · Architecture

## Target stack

Mirror the reference so its components drop in cleanly:

- **Next.js 16**, App Router, React Server Components by default.
- **React 19**.
- **Tailwind CSS v4** with the `@theme` token system (no `tailwind.config.js`
  color palette — tokens live in `globals.css`).
- **Radix UI** primitives + **lucide‑react** icons.
- **lottie‑web** for vector animation; `react-markdown` + `remark-gfm` +
  `rehype-*` for article/rich content.
- **Vitest** + Testing Library (unit), **Playwright** (e2e).
- **ESLint** (`eslint-config-next`, `jsx-a11y`, the `no-restricted-syntax` rule
  that blocks hardcoded design values) + **Prettier** + **Husky** pre‑commit.

## Target folder structure (from the reference)

```
src/
├── app/
│   ├── layout.js                 # root layout: fonts, header, footer, metadata
│   ├── page.js                   # home
│   ├── globals.css               # ← all design tokens (the rebrand file)
│   ├── not-found.js
│   ├── robots.js  sitemap.js     # SEO
│   ├── products/
│   │   ├── screenx/  cortex/  escalation/
│   │   └── modules/{behavioural-biometrics,device-intelligence,digital-footprint,
│   │                 image-intelligence,location-intelligence,sms-intelligence}/
│   ├── solutions/
│   │   ├── page.js
│   │   ├── use-cases/{fraud,credit-risk,onboarding,compliance}/
│   │   └── industries/{banks-sfbs,nbfcs-lending,fintechs-neobanks,ecommerce-marketplaces}/
│   ├── about/  faq/  investors-partners/  privacy-policy/
│   ├── resources/  resources/article/[slug]/
│   ├── book-a-demo/              # contact / primary CTA
│   └── api/ …                    # ONLY if you keep dynamic mode (see hosting)
├── components/
│   ├── layout/{Header,Footer}/   # header, mega-menu, mobile drawer, footer
│   └── sections/{Hero,CtaBand,…}/
└── lib/                          # helpers, content loaders, cn()
public/
├── logo.svg  logo-mono-white.svg  favicon…
└── animations/                   # Lottie JSON + support.js
```

## Migrating off the single static `index.html`

The current site is one hand‑written `index.html` on GitHub Pages (custom domain
via `CNAME` = `shruhani.com`). Approach:

1. **Do not port the old markup.** Its structure and blue theme are superseded by
   the reference. Instead, **mine it for real Shruhani facts** — company name,
   tagline, contact details, any real metrics/claims that are actually Shruhani's —
   and feed those into the new content (see `03-content-and-pages.md`). Keep a copy
   at `legacy/index.html` for reference during the build; delete before launch.
2. **Preserve the domain.** Keep `CNAME` (`shruhani.com`) if you stay on GitHub
   Pages; otherwise move the domain to the new host in Phase 8.
3. **Scaffold fresh** with the reference's config (Phase 0), then build pages
   phase by phase.

## Hosting decision (Phase 0 — pick one)

The reference is a **full dynamic Next.js app**: it has API routes
(`/api/demo-request`, `/api/revalidate`), ISR, and an optional Strapi CMS. That
**cannot** run on GitHub Pages (static‑only). Two clean paths:

### Path A — Vercel (or Railway/Node), full features _(recommended if you want the demo form + CMS)_

- Keep API routes, ISR, and (optionally) Strapi.
- Deploy to Vercel: zero‑config for Next.js. Point `shruhani.com` at Vercel; retire
  the GitHub Pages `CNAME`.
- Demo form posts to `/api/demo-request` (wire to email/CRM in Phase 6/8).

### Path B — Static export, keep GitHub Pages _(recommended if you want to keep Pages + simplicity)_

- Set `output: 'export'` in `next.config.mjs`.
- **Remove** `/api/*` routes and ISR; the demo form posts to a third‑party
  endpoint (Formspree / your backend) instead of a Next API route.
- **Bake content** from `cms-sync-baseline/*.json` at build time — drop live
  Strapi. Simpler and matches "keep it a static site" spirit.
- Keep the `CNAME`; GitHub Actions builds and publishes `out/`.

> **Default recommendation:** **Path B** unless you specifically need the live CMS
> and server‑side demo handling. It's the smallest jump from today's setup, keeps
> your domain/DNS untouched, and still gives you the full multi‑page animated site.
> Record the choice in `CLAUDE.md` → Decisions.

## Content source decision (Phase 0)

- **Baked JSON (recommended, pairs with Path B):** copy `cms-sync-baseline/*.json`
  into `src/content/`, load with plain imports/`fs`. No external service. Edit
  content by editing JSON in the repo.
- **Live Strapi (pairs with Path A):** stand up Strapi, run the reference's `cms:*`
  scripts to seed. More power, more moving parts, secrets to manage.

Whichever you choose, the **page components stay the same** — only the content
loader differs. Build pages against a thin `getContent(pageKey)` helper so
switching sources later is one file.
