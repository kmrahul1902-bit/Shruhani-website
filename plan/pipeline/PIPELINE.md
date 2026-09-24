# PIPELINE · Shruhani revamp orchestration

Nine phases, run in order. Each is one Claude Code session, ends at a gate you
verify by hand, then you commit. Do not skip ahead — later phases assume earlier
gates passed.

```
 PHASE 0  Bootstrap & decisions ─────────────┐
   scaffold Next.js from reference; pick       │ gate: app runs, blank shell builds
   hosting/content/naming; copy tokens         │
                                               ▼
 PHASE 1  Design system + PINK rebrand ───────┐
   port globals.css; swap blue/cyan → #E536A3  │ gate: /design-system all pink,
   grep sweep; wire fonts                       │       lint+build pass, zero blue
                                               ▼
 PHASE 2  Shell: header, footer, CTA ─────────┐
   Header+MegaMenu+MobileDrawer, Footer,        │ gate: nav works desktop+mobile,
   CtaBand, root layout, logo assets            │       footer correct, pink
                                               ▼
 PHASE 3  Home + hero ────────────────────────┐  gate: home renders, hero animates
                                               ▼
 PHASE 4  Products (ScreenX/Cortex/Escalation ┐  gate: all 9 product routes render
          + 6 modules)                         ▼
 PHASE 5  Solutions (4 use-cases + 4 industries)  gate: all 9 solution routes render
                                               ▼
 PHASE 6  Content pages (about, faq, investors,┐  gate: routes render; demo form
          contact/demo, privacy, resources)    ▼        submits; legal rewritten
 PHASE 7  Animations pass ────────────────────┐  gate: all animations pink + reduced-
   Lottie color convert, hero diagram, CSS      ▼        motion fallbacks
 PHASE 8  SEO · perf · tests · launch ────────┘  gate: full `npm run check` green,
                                                        deployed, domain live
```

## Conventions every phase follows

- **Read before writing.** Each phase names the exact `plan/…` docs and
  `<REFERENCE>/…` files to open first.
- **Tokens over hardcoding.** Never introduce a hex in a component (lint blocks it).
- **Content honesty.** Sign3‑specific facts get replaced or `TODO(content)` —
  see `CLAUDE.md` guardrail #2. Every phase report lists the `TODO(content)` it
  created.
- **Definition of done** (from `CLAUDE.md`) applies to every page/component.
- **One commit per phase**, message `phase(N): <summary>`. Tag the Phase‑8 launch
  commit.
- **Report format** at each gate:
  ```
  ## Phase N report
  - Done: …
  - Gate checks: build ✅ / lint ✅ / responsive ✅ / no-blue ✅
  - TODO(content) created: [list]
  - Deviations from plan: …
  - Ready for Phase N+1: yes/no
  ```

## Global gate helpers

```bash
npm run build            # must pass every phase
npm run lint             # blocks hardcoded design values
# zero-blue sweep (see docs/01 §5 for the full list):
grep -rniE '#(1d4ed8|0891b2|06b6d4|0e7490|2563eb|3b82f6|5B7CFA|3A56D4)' src public \
  --include='*.jsx' --include='*.js' --include='*.css' --include='*.svg' --include='*.json' \
  && echo "❌ blue found" || echo "✅ no blue"
```

## If a phase is too big for one session

Split by route group but keep the gate intact: e.g. Phase 4 can run as 4a
(suites) then 4b (modules), but only mark Phase 4 done when **all nine** product
routes pass. Never leave a half‑themed page on `main`.
