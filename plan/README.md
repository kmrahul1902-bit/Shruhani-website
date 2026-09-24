# Shruhani Website Revamp — Claude Code Playbook

This folder is a **self-contained plan** for rebuilding
[shruhani.com](https://shruhani.com) as a full, animated marketing site modeled on
the `sign3-nexus` codebase (Next.js 15 App Router + Tailwind v4), **rebranded to
Shruhani** with your logo's magenta‑pink (`#E536A3`) replacing every blue/cyan in
the design system.

You hand these files to **Claude Code** and run them **phase by phase**. Each phase
has a goal, the exact inputs to read, a task checklist, a copy‑paste prompt, and an
acceptance gate you must pass before moving on.

---

## What you're starting from vs. what you're building

|             | Now                                     | Target                                                                        |
| ----------- | --------------------------------------- | ----------------------------------------------------------------------------- |
| Stack       | One static `index.html` (~26 KB)        | Next.js 15 App Router + Tailwind v4                                           |
| Pages       | 1 landing page                          | ~25 routes (products, use‑cases, industries, about, resources, FAQ, contact…) |
| Brand color | Blue `#5B7CFA`                          | **Pink `#E536A3`** (your logo)                                                |
| Layout      | Inline `<style>`                        | Token‑driven design system, single source of truth                            |
| Motion      | Minimal                                 | Full animation system (Lottie + CSS + hero diagrams)                          |
| Deploy      | GitHub Pages via `CNAME` (shruhani.com) | Decision in Phase 0 (Vercel _or_ static‑export to keep Pages)                 |

The `sign3-nexus` project is the **reference for structure, components, and layout**.
Its content lives in `cms-sync-baseline/*.json`. You reuse the _scaffolding_; you
**replace Sign3‑specific facts** (named clients, metrics, certifications, people,
addresses, press) with Shruhani's own verified content — see the guardrail in
`CLAUDE.md`.

---

## File map

```
shruhani-revamp/
├── README.md                         ← you are here
├── CLAUDE.md                         ← drop into repo root; Claude Code reads it every session
├── docs/
│   ├── 01-design-system-and-rebrand.md   ← the pink token map (blue/cyan → #E536A3)
│   ├── 02-architecture.md                ← stack, folders, static→Next migration, hosting
│   ├── 03-content-and-pages.md           ← every route, its content source, substitution rules
│   └── 04-components-and-animations.md    ← header/mega‑menu/footer/CTA/hero + motion system
└── pipeline/
    ├── PIPELINE.md                   ← the orchestration: phase graph, gates, chaining
    ├── PHASE-0-bootstrap.md          ← decisions + scaffold the Next.js app
    ├── PHASE-1-design-system.md      ← tokens + the pink rebrand (the color swap)
    ├── PHASE-2-shell.md              ← header, mega‑menu, mobile drawer, footer, CTA band
    ├── PHASE-3-home.md               ← home page + hero
    ├── PHASE-4-products.md           ← ScreenX / Cortex / Escalation + 6 modules
    ├── PHASE-5-solutions.md          ← 4 use‑cases + 4 industries
    ├── PHASE-6-content-pages.md      ← about, FAQ, investors, contact, privacy, resources
    ├── PHASE-7-animations.md         ← wire all animations + reduced‑motion
    └── PHASE-8-seo-qa-launch.md      ← SEO, perf, tests, deploy
```

---

## How to run it (quick start)

1. **Put the reference next to your repo.** Unzip `sign3-nexus-main.zip` somewhere
   Claude Code can read — e.g. a sibling folder `../sign3-nexus/` — or a
   `reference/` subfolder inside your repo (git‑ignored). The plan refers to it as
   `<REFERENCE>`.
2. **Copy `CLAUDE.md`** from this folder into your repo root. It's the always‑on
   brief; keep it updated as decisions are made.
3. **Copy the `docs/` and `pipeline/` folders** into your repo (e.g. under
   `plan/`), so Claude Code can open them by path.
4. **Open Claude Code in the repo** and start Phase 0:
   > Read `plan/CLAUDE.md` and `plan/pipeline/PIPELINE.md`, then execute
   > `plan/pipeline/PHASE-0-bootstrap.md`. Stop at the acceptance gate and report.
5. **Run one phase per session.** After each phase, verify the gate (build passes,
   page renders, no blue left, etc.), commit, then start the next phase.

> **Order matters.** Phase 1 (the pink design system) must land before any page
> work, so every component inherits the brand from tokens instead of hardcoding it.

---

## The one thing to get right first

The whole rebrand hinges on **tokens, not find‑and‑replace across components**.
The Sign3 system already funnels every color through CSS variables in
`src/app/globals.css` and **blocks hardcoded hex via ESLint**. So the pink swap is
mostly _changing token values in one file_ + a grep sweep for stragglers in SVGs
and Lottie JSON. `docs/01-design-system-and-rebrand.md` has the exact map.
