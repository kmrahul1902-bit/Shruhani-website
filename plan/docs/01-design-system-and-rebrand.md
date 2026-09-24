# 01 · Design System & the Pink Rebrand

The reference funnels **all** color through CSS variables in
`src/app/globals.css` and blocks hardcoded hex via ESLint. That means the rebrand
is mostly **changing token values in one file**, plus a grep sweep for stragglers
in SVGs and Lottie JSON. This doc is the exact map.

---

## 1. The brand color

Sampled from your logo: **`#E536A3`** · `rgb(229, 54, 163)` — a vivid magenta‑pink.

WCAG contrast (white text on the color / near‑black `#0a0a0a` on the color):

| Hex                               | Role                                | White‑on | Ink‑on | AA verdict                          |
| --------------------------------- | ----------------------------------- | -------- | ------ | ----------------------------------- |
| `#E536A3`                         | **base accent** (logo)              | 3.9      | 5.08   | Large text / UI / big headings only |
| `#F45FB8`                         | accent‑bright (decor)               | 2.93     | 6.76   | Decorative on light; not for text   |
| `#B01B77`                         | accent‑deep / links / headline text | 6.42     | 3.08   | **AA for body text on white**       |
| `#C21E86`                         | solid button fill (white label)     | 5.49     | 3.6    | **AA for white text**               |
| `#A81873`                         | button hover                        | 6.7      | 2.9    | AA                                  |
| `#F98BCE`                         | accent‑on‑dark                      | 2.18     | 9.06   | For use **on dark** grounds         |
| `#FCE9F4` / `#FDF1F8` / `#FEF8FB` | tint‑1/2/3 (washes)                 | —        | —      | Backgrounds only                    |

**Rule of thumb:** the logo pink (`#E536A3`) is beautiful but only ~3.9:1 on white —
use it for large display type, icons, borders, and washes. For **body‑size text
and white‑on‑pink buttons, use the deeper `#B01B77` / `#C21E86`.** This mirrors how
the reference already splits `--color-accent` (bright, decorative) from
`--color-accent-deep` (text‑safe).

---

## 2. Where blue/cyan lives today

The reference has two blue/cyan systems:

- **`--color-blue*`** — a blue‑700 (`#1d4ed8`) family used for headlines, filled
  buttons, glow shadow, blog category chips, avatar gradients, data bars.
- **`--color-accent*`** — the _themeable_ identity color. Default is **ScreenX
  cyan** (`#0891b2`), re‑themed per product via a `[data-accent]` cascade
  (`cortex` = green, `escalation` = purple).

"Replace the blue" = swap **both** the `--color-blue*` family **and** the default
cyan `--color-accent*` to the pink palette above.

---

## 3. The token map (edit `src/app/globals.css`)

Change **values only**. Do not rename tokens — everything downstream references
them. Line numbers are approximate (from the reference at time of writing); search
by token name.

### 3a. Blue family → pink (in the main `@theme` block, ~line 240)

```css
--color-blue: #c21e86; /* was #1d4ed8  — strong fill / brand */
--color-blue-hover: #a81873; /* was #2453e0  — hover state */
--color-blue-headline: #b01b77; /* was #2353e0  — headline type (AA on white) */
--color-blue-on-dark: #f98bce; /* was #4d82f3  — on dark grounds */
```

### 3b. Default accent (cyan → pink) (~line 441)

```css
--color-accent: #e536a3; /* was #0891b2  — the logo */
--color-accent-bright: #f45fb8; /* was #06b6d4 */
--color-accent-deep: #b01b77; /* was #0e7490  — text-safe */
--color-accent-tint-1: #fce9f4; /* was #e6f5fb */
--color-accent-tint-2: #fdf1f8; /* was #eef9fc */
--color-accent-tint-3: #fef8fb; /* was #f5fcfe */
--color-accent-on-dark: #f98bce; /* was #4ad4e8 */
```

### 3c. Product identity + hero wash (~line 480–495)

```css
--color-prod-screenx: #e536a3; /* was #0891b2  — primary product = logo */
--color-suite-title-screenx: #b01b77; /* was #0891b2  — AA text version */

--hero-wash-a: rgba(245, 79, 184, 0.16); /* was rgba(56,189,248,.16) */
--hero-wash-b: rgba(229, 54, 163, 0.14); /* was rgba(6,182,212,.14) */
```

### 3d. Elevation glow (~line, `@theme` elevation block)

```css
--shadow-glow: 0 10px 30px rgba(229, 54, 163, 0.35); /* was rgba(29,78,216,.35) */
```

### 3e. Blog blue tokens (~lines 40–75)

```css
--color-blog-wash: #fdebf6; /* was #eaf3ff */
--color-blog-hover-border: #f6d6ea; /* was #d8e2f5 */
--color-blog-tint-border: #f3c9e1; /* was #c7d7f7 */
--color-blog-cool-border: #f6d6ea; /* was #e0e9f7 */
--color-blog-fraud: #b01b77; /* was #1d4ed8  — "fraud" category chip */
/* avatar + data-bar gradients that were blue: */
--color-avatar-a-from: #f45fb8;
--color-avatar-a-to: #b01b77; /* were #3b82f6 / #1d4ed8 */
--color-bar-blue-from: #b01b77;
--color-bar-blue-to: #c21e86; /* were #1d4ed8 / #2563eb */
```

> Leave `--color-blog-growth` (cyan `#06b6d4`) and `--color-blog-risk` (`#f87171`)
> **only if** you keep multi‑hue blog categories. If you want a monochrome pink
> blog, map `growth` to `#F45FB8`. Record the choice in `CLAUDE.md`.

### 3f. Signal colors — **do not touch**

`--color-reader-ok`, `-warn`, `-bad` and `signal-*` encode verdicts (approve /
review / decline). They stay green/amber/red. Recoloring them pink destroys the
one place color carries data.

---

## 4. Product accents — a decision

The system uses **one accent per product** as identity (`[data-accent]`):

- ScreenX = cyan → **now pink `#E536A3`** (done above).
- Cortex = green `#059669`.
- Escalation = purple `#7a63c9`.

**Option A (recommended — matches the system's "accent = identity" rule):** keep
Cortex green and Escalation purple as distinct product identities. Only the
_default/blue_ becomes pink. Cleanest, least risk.

**Option B (full monochrome pink):** re‑theme the two `[data-accent]` blocks
(~lines 1001 & 1018) to pink‑family hues so the whole site is one brand color.
Suggested berry/plum set that stays distinguishable:

```css
[data-accent="cortex"] {
  /* deep magenta */
  --color-accent: #c21e86;
  --color-accent-bright: #e24fa6;
  --color-accent-deep: #8e1560;
  --color-accent-tint-1: #f9e4f1;
  --color-accent-tint-2: #fceff7;
  --color-accent-tint-3: #fef7fb;
  --color-accent-on-dark: #ee83c4;
}
[data-accent="escalation"] {
  /* plum */
  --color-accent: #a21c86;
  --color-accent-bright: #c74fa9;
  --color-accent-deep: #77105f;
  --color-accent-tint-1: #f5e3f0;
  --color-accent-tint-2: #faeff6;
  --color-accent-tint-3: #fdf7fb;
  --color-accent-on-dark: #de85c8;
}
```

Also update the fixed product‑identity tokens if you pick B:
`--color-prod-cortex`, `--color-prod-escalation`, `--color-suite-title-cortex`,
`--color-suite-title-escalation`, and `--color-nav-glass-violet`.

---

## 5. Stragglers outside globals.css

Because ESLint blocks arbitrary Tailwind values, most stray color hides in
**non‑lintable** places: inline SVG `fill`/`stroke`, `<meta name="theme-color">`,
manifest/OG images, and Lottie JSON. Sweep with:

```bash
# hex blues/cyans anywhere in source and public assets
grep -rniE '#(1d4ed8|2453e0|2353e0|4d82f3|2563eb|3b82f6|38bdf8|0891b2|06b6d4|0e7490|4ad4e8|1e40af|60a5fa)' \
  src public --include='*.jsx' --include='*.js' --include='*.css' --include='*.svg' --include='*.json'

# rgb()/rgba() blues
grep -rniE 'rgba?\(\s*(29|30|37|56|59|38)\s*,' src public

# the old Shruhani blue, if any markup was carried over
grep -rniE '#(5B7CFA|3A56D4)' src public
```

For **Lottie JSON** (`public/animations/*.json`), colors are `[r,g,b,a]` floats
0–1. Blue like `#1d4ed8` = `[0.114, 0.306, 0.847, 1]`. Convert your pink:
`#E536A3` → `[0.898, 0.212, 0.639, 1]`; `#B01B77` → `[0.690, 0.106, 0.467, 1]`.
Replace in‑place and re‑test the animation. `scripts/sync-hero-animations.mjs`
exists in the reference for regenerating hero animation data — prefer editing the
source of truth over the built JSON where one exists.

---

## 6. Typography, spacing, radius, shadow

Keep the reference's scale verbatim — it's already a tight, tokenized system:

- **Type scale:** `display-1/2`, `title-1/2/3`, `body-lg/md/sm`, etc., defined once
  in `@theme`. Weights 400/500/600/700 only. Two faces: Plus Jakarta Sans
  (display + title‑1), Inter (rest). Wire Jakarta if the reference left it loaded
  but unused.
- **Spacing:** 2px grid tokens. **Radius / shadow:** the `--radius-*` and
  `--shadow-*` tokens (`raise`, `card`, `overlay`, `dark`, `glow`).
- Do not introduce new scales. Compose from these + a one‑off utility for genuine
  exceptions.

## 7. Fonts, favicon, and logo assets (Shruhani)

- Replace the favicon, `apple-touch-icon`, `<meta name="theme-color">` (set to
  `#E536A3`), `manifest.json` theme/background, and any OG/Twitter share image
  with Shruhani‑branded versions of the fingerprint‑S logo.
- Place the logo SVG at `public/logo.svg` (and a white‑on‑transparent variant for
  dark headers/footer at `public/logo-mono-white.svg`). The header/footer read
  these — see `04-components-and-animations.md`.
