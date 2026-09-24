import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";

// This config encodes the mechanically-checkable rules from CLAUDE.md.
// Judgment-based rules (separation of concerns, prop drilling, right
// abstraction, server/client boundaries) are enforced in code review.
//
// Note: eslint-config-next already registers eslint-plugin-jsx-a11y and its
// recommended rules, so we only override the specific rules we want stricter.
const eslintConfig = defineConfig([
  ...nextVitals,

  {
    rules: {
      // --- JavaScript Standards (CLAUDE.md § JavaScript Standards) ---
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "warn",
      "object-shorthand": ["warn", "always"],
      "prefer-template": "warn",
      eqeqeq: ["error", "smart"],
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // --- React Rendering (CLAUDE.md § React Architecture & Rendering) ---
      // Correct effect dependencies; avoid stale/unnecessary effects.
      "react-hooks/exhaustive-deps": "error",

      // --- Design System (CLAUDE.md § Styling & Design System) ---
      // Ban Tailwind arbitrary values (text-[#123456], rounded-[13px], w-[50%]).
      // Use centralized tokens from globals.css @theme instead.
      "no-restricted-syntax": [
        "error",
        {
          // Flags hardcoded design values (text-[#123], w-[50%]) but permits
          // state-variant selectors (data-[state=…], aria-[…], supports-[…])
          // and CSS-variable references (h-[var(--radix-…)]) — those aren't
          // magic design values. Radix/shadcn components rely on both.
          selector:
            "JSXAttribute[name.name='className'] Literal[value=/(?<!data|aria|supports)-\\[(?!var\\(--)/]",
          message:
            "Avoid Tailwind arbitrary values (e.g. text-[#123456], rounded-[13px]). Use centralized design tokens from globals.css @theme. If genuinely unavoidable, disable this rule on the line with a justifying comment.",
        },
      ],

      // --- Accessibility (CLAUDE.md § Accessibility) ---
      // Never use <div>/<span> as interactive controls — use <button>/<a>.
      "jsx-a11y/no-static-element-interactions": "error",
      "jsx-a11y/click-events-have-key-events": "error",
    },
  },

  {
    /**
     * Import order, from the team's frontend guidelines: library imports,
     * then components, then custom hooks, then utils/helpers, then constants,
     * then CSS.
     *
     * A rule rather than a convention: it is exactly the kind of thing that
     * decays silently, and eslint --fix on commit keeps it true without anyone
     * having to think about it. The guidelines' `models` and `redux` groups
     * have no equivalent here — this codebase has neither — so the remaining
     * groups keep their relative order.
     */
    files: ["src/**/*.{js,jsx}"],
    rules: {
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "@/components/**",
              group: "internal",
              position: "before",
            },
            { pattern: "@/hooks/**", group: "internal" },
            { pattern: "@/services/**", group: "internal" },
            { pattern: "@/lib/**", group: "internal", position: "after" },
            { pattern: "@/data/**", group: "internal", position: "after" },
            { pattern: "@/config/**", group: "internal", position: "after" },
            { pattern: "**/*.css", group: "index", position: "after" },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "never",
        },
      ],
    },
  },

  {
    // CLI dev tools (e.g. scripts/parity-audit.mjs) — their whole job is
    // printing a report to stdout, so plain console.log is the point, not
    // a stray debug statement.
    files: ["scripts/**/*.mjs"],
    rules: {
      "no-console": "off",
    },
  },

  // Must come LAST: disables stylistic rules that conflict with Prettier.
  prettier,

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // gitignored scratch space (incl. design-handoff mockup JS) — not our code
    "claude-docs/**",
    // The hero animations are the designers' files, served verbatim — the whole
    // point of framing them rather than porting them. Their .html was never
    // linted because it is not JS; the mobile square sequences load a shared
    // runtime that IS, and linting vendor code we are contractually not editing
    // only produces 35 errors nobody may act on. scripts/sync-hero-animations
    // is where our changes to these files live, and that file IS linted.
    "public/animations/**",
  ]),
]);

export default eslintConfig;
