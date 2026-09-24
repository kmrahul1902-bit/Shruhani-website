# PHASE 1 · Design system + the PINK rebrand

**Goal:** port the reference's `globals.css` token system and swap every blue/cyan
to the logo pink `#E536A3`, so every later component inherits the brand for free.
This is the phase the whole rebrand hinges on.

## Read first

- `plan/docs/01-design-system-and-rebrand.md` (the exact token map — follow it literally)
- `<REFERENCE>/src/app/globals.css`
- `<REFERENCE>/CLAUDE.md` §§ "Styling & Design System", "Color has three jobs", "Typography"

## Tasks

- [ ] Copy `<REFERENCE>/src/app/globals.css` into `src/app/globals.css` verbatim.
- [ ] Apply the token‑value swaps from `docs/01` §3: - 3a blue family → pink - 3b default accent (cyan → pink) - 3c product‑identity screenx + hero wash - 3d `--shadow-glow` rgba - 3e blog blue tokens + gradients
- [ ] **Do not** touch signal colors (`reader-ok/warn/bad`, `signal-*`) — §3f.
- [ ] Product accents: apply §4 Option A (keep Cortex green / Escalation purple)
      **or** Option B (unify to pink family) per the `CLAUDE.md` decision. Record it.
- [ ] Wire fonts: ensure `--font-display` (Plus Jakarta Sans) is actually applied to
      `display-*` + `title-1` (the reference notes it was loaded but "not yet wired").
- [ ] Set `<meta name="theme-color" content="#E536A3">`, favicon/manifest theme.
- [ ] Port `/design-system` page from the reference so you can eyeball every token.
- [ ] **Grep sweep** for stragglers (`docs/01` §5) across `src` and `public`,
      including inline SVG fills and Lottie JSON. Convert any remaining blue.

## Copy‑paste prompt

> Read `plan/docs/01-design-system-and-rebrand.md` and the reference's
> `src/app/globals.css`. Copy that file into our project, then apply **exactly** the
> token‑value swaps in §3 of the doc to turn every blue/cyan into the pink palette
> (base `#E536A3`, text‑safe `#B01B77`, button fill `#C21E86`, on‑dark `#F98BCE`,
> tints `#FCE9F4/#FDF1F8/#FEF8FB`). Do not rename tokens and do not touch the signal
> colors. For product accents, apply Option __ from §4 (per our recorded decision).
> Wire Plus Jakarta Sans onto the display/title‑1 roles. Set theme‑color and favicon
> theme to the pink. Port the `/design-system` page so I can review every token. Then
> run the zero‑blue grep sweep from §5 across `src` and `public` (incl. SVG fills and
> Lottie JSON) and fix anything it finds. Run `npm run lint` and `npm run build`, then
> give me the Phase 1 report including the grep output.

## Acceptance gate

- `/design-system` renders and shows **pink** accents everywhere; signal colors
  still green/amber/red.
- Zero‑blue grep returns nothing (or only intentional non‑brand blues you note).
- White text only ever sits on the AA‑safe fill (`#C21E86`), never light pink.
- `npm run lint` + `npm run build` pass.
- Fonts: display headings render in Plus Jakarta Sans; body in Inter.

**Commit:** `phase(1): port design system + rebrand to #E536A3`
**Rollback:** revert `src/app/globals.css`; nothing else depends on it yet.
