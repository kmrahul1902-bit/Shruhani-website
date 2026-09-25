/**
 * Design-token budget gate — counts the design system and fails when it grows.
 *
 * CLAUDE.md § "The scale IS the system" sets hard caps on the design system:
 * 10 type roles, ~24 color roles, 4 radii + pill, 3 elevations, an 8-point
 * spacing scale. Those numbers are countable, so they are counted here rather
 * than argued about in review.
 *
 *   npm run design:budget          report + gate (used by `npm run check`)
 *   npm run design:budget -- --update   ratchet the recorded marks down
 *
 * WHY A RATCHET AND NOT THE CAPS. Every metric currently sits far above its
 * cap — the system was transcribed from fifteen handoff mockups, one token per
 * mockup element, so it opens at 378 type roles across 53 distinct font sizes
 * and 194 color roles. A gate that simply enforced the caps would make
 * `npm run check` red on day one, and a permanently red gate is a gate someone
 * switches off. So:
 *
 *   - at or under the cap  -> pass, and the cap is enforced from then on
 *   - over the cap         -> the recorded high-water mark is enforced instead
 *
 * Either way the number can never rise. The collapse can then land surface by
 * surface, each one lowering the mark with `--update`, and the gate tightens
 * behind it automatically. When a mark reaches its cap it is simply deleted.
 *
 * ALIASES DO NOT COUNT. The sanctioned migration in CLAUDE.md points a legacy
 * per-element name at a scale step (`--text-applies-title: var(--text-title-2)`).
 * That introduces no new value, so a bare `var()` is excluded from every count
 * — otherwise the migration recipe would fail the gate that exists to enforce
 * it, and the only way to pass would be to delete call sites instead of
 * aliasing them.
 *
 * Exits non-zero if any metric regressed.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const CSS_PATH = join(HERE, "..", "src", "app", "globals.css");
const MARKS_PATH = join(HERE, "design-budget.json");

/**
 * The caps from CLAUDE.md. `cap` is the destination; `label` is what prints.
 * Keep this table and the one in CLAUDE.md in sync — if they disagree, CLAUDE.md
 * is the standard and this is the bug.
 */
export const BUDGET = {
  typeSizes: { cap: 10, label: "Distinct font sizes" },
  typeRoles: { cap: 10, label: "Type roles (non-alias)" },
  colorRoles: { cap: 24, label: "Color roles" },
  radii: { cap: 6, label: "Radius values (5 + pill)" },
  shadows: { cap: 6, label: "Elevations" },
  spacing: { cap: 10, label: "Spacing tokens" },
  spacingOffGrid: { cap: 0, label: "Spacing steps off 2px grid" },
  fontWeights: { cap: 4, label: "Font weights" },
  tracking: { cap: 6, label: "Tracking values" },
};

/**
 * Bodies of every `@theme` block.
 *
 * The naive `@theme[^{]*\{` is wrong on this file: globals.css documents the
 * accent override with "Sits OUTSIDE @theme so the cascade overrides the :root
 * values", and `[^{]*` runs straight through that prose into the next rule's
 * brace, swallowing the override as theme. Only spaces and word characters may
 * sit between the at-rule and its brace.
 */
export function themeBlocks(css) {
  const out = [];
  const open = /@theme[ \t\w-]*\{/g;
  let m;
  while ((m = open.exec(css))) {
    const start = m.index + m[0].length;
    let i = start;
    let depth = 1;
    while (depth > 0 && i < css.length) {
      if (css[i] === "{") depth += 1;
      else if (css[i] === "}") depth -= 1;
      i += 1;
    }
    out.push(css.slice(start, i - 1));
    open.lastIndex = i;
  }
  return out;
}

const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "");

/**
 * Every custom property declared inside a theme block, split into the family
 * (`text`, `color`, …), the base token name, and the Tailwind modifier if any:
 * `--text-display--line-height` is the `line-height` OF the `display` token,
 * not a token in its own right.
 */
export function declarations(css) {
  const out = [];
  for (const body of themeBlocks(css)) {
    const decl = /--([a-z][a-z0-9]*)-([a-z0-9-]+?)\s*:\s*([^;]+);/gi;
    let m;
    const clean = stripComments(body);
    while ((m = decl.exec(clean))) {
      const [, family, rest, raw] = m;
      const cut = rest.indexOf("--");
      out.push({
        name: `${family}-${rest}`,
        family,
        base: cut === -1 ? rest : rest.slice(0, cut),
        modifier: cut === -1 ? null : rest.slice(cut + 2),
        value: raw.trim().replace(/\s+/g, " "),
      });
    }
  }
  return out;
}

/** A bare `var(--x)` — a migration alias, carrying no new value of its own. */
export function isAlias(value) {
  return /^var\(\s*--[a-z0-9-]+\s*\)$/i.test(value);
}

const distinct = (rows, pick) => new Set(rows.map(pick)).size;

/** Counts the system. One number per row of the budget table. */
export function census(css) {
  const all = declarations(css);
  const base = all.filter((d) => d.modifier === null);
  const real = base.filter((d) => !isAlias(d.value));
  const of = (family) => real.filter((d) => d.family === family);

  /**
   * Weight and tracking live on MODIFIER declarations
   * (`--text-x--font-weight`), not on base tokens, so they are counted from
   * `all` rather than from `base`. Both are as capable of sprawl as the sizes
   * were: a system with 650 and 900 alongside 600, 700 and 800 has not chosen
   * a weight, and thirteen negative tracking values between -0.005em and
   * -0.045em are not thirteen decisions.
   */
  const mods = (name) =>
    all.filter((d) => d.modifier === name && !isAlias(d.value));

  /**
   * Literals fold into the metric they belong to rather than sitting in a
   * column of their own. A radius is a radius whether it was written as a
   * token or into a rule, and splitting them would let a family look
   * compliant while half of it lived somewhere the cap did not reach.
   */
  const lit = literalDeclarations(css);
  const withLiterals = (values, prop) =>
    new Set([...values, ...(lit[prop] ?? [])]).size;

  return {
    typeSizes: withLiterals(
      of("text").map((d) => d.value),
      "font-size"
    ),
    typeRoles: of("text").length,
    colorRoles: of("color").length,
    radii: withLiterals(
      of("radius").map((d) => d.value),
      "border-radius"
    ),
    shadows: withLiterals(
      of("shadow").map((d) => d.value),
      "box-shadow"
    ),
    spacing: of("spacing").length,
    fontWeights: withLiterals(
      mods("font-weight").map((d) => d.value),
      "font-weight"
    ),
    tracking: withLiterals(
      [...mods("letter-spacing"), ...of("tracking")].map((d) => d.value),
      "letter-spacing"
    ),
  };
}

/**
 * Compares a census against the caps and the recorded marks.
 *
 * A metric is `ok` once it is at or under its cap — from then on the cap is
 * what it is held to. Above the cap it is held to its mark, so it can only
 * ever come down.
 */
export function evaluate(counts, budget, marks) {
  const rows = [];
  const failures = [];
  const improvements = {};

  for (const [key, { cap, label }] of Object.entries(budget)) {
    const now = counts[key];
    if (now === undefined) continue;

    const mark = marks[key] ?? now;
    const limit = mark <= cap ? cap : mark;
    const status = now <= cap ? "ok" : "over";
    const improved = now < mark;

    if (now > limit) {
      failures.push(
        `${label}: ${now} exceeds the ${
          mark <= cap ? `cap of ${cap}` : `recorded mark of ${mark}`
        }.`
      );
    }
    if (improved) improvements[key] = now;

    rows.push({ key, label, now, cap, mark, limit, status, improved });
  }

  return { rows, failures, improvements };
}

/**
 * Literal design values written straight into a CSS rule, outside @theme.
 *
 * The blind spot this closes: the census only ever read @theme, so a token
 * count of 18 radii sat alongside 20 more radii written directly into rules,
 * and nobody was counting the second set. A value in a rule is as much a
 * design decision as a token — it is simply a decision nothing can enforce.
 *
 * Rules that read a token are already centralised, so only literals count.
 */
const LITERAL_PROPS = [
  "font-size",
  "line-height",
  "letter-spacing",
  "font-weight",
  "border-radius",
  "box-shadow",
];

export function literalDeclarations(css) {
  // Everything OUTSIDE the theme blocks.
  let body = css;
  for (const block of themeBlocks(css)) body = body.replace(block, "");
  body = stripComments(body);

  const out = {};
  for (const prop of LITERAL_PROPS) {
    const re = new RegExp(`(?:^|[;{\\s])${prop}\\s*:\\s*([^;}]+)`, "g");
    const vals = new Set();
    for (const m of body.matchAll(re)) {
      const v = m[1].trim().replace(/\s+/g, " ");
      if (!v || v.includes("var(") || v === "inherit" || v === "normal")
        continue;
      // A shadow with no offset, no blur and no spread draws nothing — it is a
      // keyframe endpoint, not an elevation. Counting it would measure the
      // animation rather than the design system.
      if (prop === "box-shadow" && /^0 0 0 0(\s|$)/.test(v)) continue;
      vals.add(v);
    }
    if (vals.size) out[prop] = [...vals];
  }
  return out;
}

/**
 * Spacing is the one system with no tokens to count.
 *
 * It is expressed as Tailwind numeric utilities, so the only honest
 * measurement is what the components actually use. Width, height and inset
 * are deliberately excluded: they are sizing, which answers to the content
 * and the container, not to the page's vertical rhythm.
 */
const SPACING_UTILITIES =
  "p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|gap|gap-x|gap-y|space-y|space-x";

export function spacingSteps(source) {
  const re = new RegExp(
    `(?:^|[\\s"'\`:])(?:${SPACING_UTILITIES})-(\\d+(?:\\.\\d+)?)(?![\\w.-])`,
    "g"
  );
  const out = new Set();
  for (const m of source.matchAll(re)) out.add(Number(m[1]));
  return [...out].sort((a, b) => a - b);
}

/**
 * Steps at 1px granularity, against Tailwind's 4px base: .25 and .75.
 *
 * The cap is 0 and needs no debate — nobody is defending a 1px difference in
 * a gap, and every one of them sits next to a step already in the system. The
 * .5 steps (2px) are NOT counted here: 464 uses rest on them, and whether
 * they are legal is a question about the grid, not a cleanup.
 */
export function offGrid(steps) {
  return steps.filter((s) => Math.round(s * 4) % 2 !== 0);
}

/**
 * Tokens declared more than once.
 *
 * CSS takes the last one, silently. `--radius-tag` was declared twice, so a
 * canonical value written at the top of the file never applied and the census
 * counted both — a token that looks set and is not is worse than one that is
 * missing.
 */
export function duplicates(css) {
  const seen = new Map();
  for (const d of declarations(css).filter((x) => x.modifier === null)) {
    if (!seen.has(d.name)) seen.set(d.name, []);
    seen.get(d.name).push(d.value);
  }
  return [...seen]
    .filter(([, values]) => values.length > 1)
    .map(([name, values]) => ({ name, values }));
}

/**
 * Token names that two families both claim, where Tailwind maps both to the
 * same utility prefix.
 *
 * `--color-body` and `--text-body` both produce `.text-body`, and in Tailwind
 * v4 the color namespace wins — so the font-size token is generated but can
 * never be applied, silently. Nothing errors, nothing warns, and the scale
 * step simply does not work. Cheap to detect, so detect it.
 */
export const SHARED_PREFIX = [["color", "text"]];

export function collisions(css) {
  const base = declarations(css).filter((d) => d.modifier === null);
  const out = [];
  for (const [a, b] of SHARED_PREFIX) {
    const inA = new Set(base.filter((d) => d.family === a).map((d) => d.base));
    for (const d of base.filter((x) => x.family === b)) {
      if (inA.has(d.base)) out.push({ name: d.base, wins: a, loses: b });
    }
  }
  return out;
}

/**
 * The marks to persist after a run.
 *
 * A metric at or under its cap is dropped — the cap holds it from then on, and
 * leaving a stale mark behind would let it drift back up to that mark. A
 * metric over its cap is recorded at its current value, which on the first run
 * is how the starting position gets seeded at all: nothing has "improved" yet,
 * because there was no mark to improve on.
 */
export function nextMarks(rows, marks, { reseed = false } = {}) {
  const out = { ...marks };
  for (const r of rows) {
    if (r.status === "ok") delete out[r.key];
    // `reseed` is the only way a mark ever rises, and it exists for one
    // situation: the MEASUREMENT changed, not the system. When the census
    // learned to read literal CSS declarations, shadows went 37 -> 69
    // without a single new shadow being written. Without a named escape
    // hatch someone edits the JSON by hand and nobody learns the number
    // moved.
    else if (reseed) out[r.key] = r.now;
    else out[r.key] = Math.min(r.now, out[r.key] ?? r.now);
  }
  return out;
}

/* ── CLI ─────────────────────────────────────────────────────────────── */

const isMain =
  process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isMain) {
  const update = process.argv.includes("--update");
  const reseed = process.argv.includes("--reseed");
  const css = readFileSync(CSS_PATH, "utf8");

  let marks = {};
  try {
    marks = JSON.parse(readFileSync(MARKS_PATH, "utf8")).marks ?? {};
  } catch {
    // No marks yet: this run records the starting position.
  }

  const counts = census(css);

  // Spacing lives in the components, not the stylesheet, so it needs its own
  // pass over src/ rather than another regex on globals.css.
  const seen = new Set();
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!["node_modules", ".next"].includes(entry.name)) walk(full);
      } else if (
        /\.(js|jsx)$/.test(entry.name) &&
        !/\.test\./.test(entry.name)
      ) {
        for (const step of spacingSteps(readFileSync(full, "utf8")))
          seen.add(step);
      }
    }
  };
  walk(join(HERE, "..", "src"));
  counts.spacingOffGrid = offGrid([...seen]).length;
  const { rows, failures, improvements } = evaluate(counts, BUDGET, marks);

  console.log("\n[design:budget] src/app/globals.css\n");
  console.log(
    `  ${"Metric".padEnd(26)}${"now".padStart(6)}${"cap".padStart(6)}${"mark".padStart(7)}   status`
  );
  for (const r of rows) {
    const mark = r.mark <= r.cap ? "—" : String(r.mark);
    const note =
      r.status === "ok"
        ? "within cap"
        : r.improved
          ? `over cap, down from ${r.mark}`
          : "over cap, held";
    console.log(
      `  ${r.label.padEnd(26)}${String(r.now).padStart(6)}${String(r.cap).padStart(6)}${mark.padStart(7)}   ${note}`
    );
  }

  const left = rows.filter((r) => r.status === "over");
  if (left.length) {
    console.log(
      `\n  ${left.length} metric(s) still above cap. See CLAUDE.md § "The scale IS the system".`
    );
  }

  if (reseed && !process.argv.includes("--because")) {
    console.error(
      '[design:budget] --reseed needs --because "<reason>".\n' +
        "  It is the only way a mark goes UP, so the file has to say why."
    );
    process.exit(1);
  }

  if (update || reseed) {
    const next = nextMarks(rows, marks, { reseed });
    writeFileSync(
      MARKS_PATH,
      `${JSON.stringify(
        {
          _comment:
            "High-water marks for npm run design:budget. Written by --update. A metric at or under its cap is removed; the cap holds it from then on. A mark only ever rises via --reseed, which records why below.",
          ...(reseed
            ? {
                _reseeded: {
                  on: new Date().toISOString().slice(0, 10),
                  because: process.argv[process.argv.indexOf("--because") + 1],
                },
              }
            : {}),
          marks: next,
        },
        null,
        2
      )}\n`
    );
    console.log(`\n[design:budget] marks updated in ${MARKS_PATH}`);
  } else if (Object.keys(improvements).length) {
    console.log(
      `\n[design:budget] ${Object.keys(improvements).length} metric(s) improved — run with --update to ratchet the marks down.`
    );
  }

  const dupes = duplicates(css);
  if (dupes.length) {
    console.error(`\n[design:budget] ${dupes.length} DUPLICATE TOKEN(S):`);
    for (const d of dupes)
      console.error(
        `  --${d.name} is declared ${d.values.length} times: ${d.values.join(" then ")}. CSS takes the last.`
      );
    process.exit(1);
  }

  const clashes = collisions(css);
  if (clashes.length) {
    console.error(`\n[design:budget] ${clashes.length} TOKEN COLLISION(S):`);
    for (const c of clashes) {
      console.error(
        `  --${c.loses}-${c.name} is unreachable: --${c.wins}-${c.name} already owns the \`${c.wins === "color" ? "text" : c.wins}-${c.name}\` utility.`
      );
    }
    console.error("\n  Rename one of them. Tailwind picks silently.\n");
    process.exit(1);
  }

  if (failures.length) {
    console.error(`\n[design:budget] ${failures.length} REGRESSION(S):`);
    for (const f of failures) console.error(`  ${f}`);
    console.error(
      "\n  The design system may not grow. Compose from the existing scale,\n  or alias a legacy name onto a scale step — aliases do not count.\n"
    );
    process.exit(1);
  }
  console.log("\n[design:budget] no regression.\n");
}
