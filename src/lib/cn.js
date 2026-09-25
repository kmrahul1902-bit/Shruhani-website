import { extendTailwindMerge } from "tailwind-merge";

/**
 * Custom token groups, registered so tailwind-merge dedupes them against
 * their own family instead of falling through to an unrelated one — the
 * gap this file's Phase 0 comment flagged and left open.
 *
 * The concrete failure: `text-` is Tailwind's prefix for BOTH font-size
 * (`text-sm`) and text-color (`text-white`) utilities. Unregistered, an
 * unrecognized custom size like `text-body-md` doesn't match tailwind-merge's
 * built-in font-size list, so it falls into the generic text-color group by
 * default — colliding with a real color class ahead of it in the string and
 * silently deleting it. `Button`'s `size="hero"` (`text-body-md ...`) is
 * concatenated after `variant="primary"` (`... text-white ...`), so
 * `cn(buttonVariants({ variant: "primary", size: "hero" }))` produced
 * `bg-blue ... text-body-md ...` with `text-white` gone — a button with no
 * text color at all, inheriting the page's dark ink on a dark fill. Any
 * component pairing a custom size token with a text-color class had the
 * same latent bug.
 *
 * Radius, shadow and tracking don't share their prefix with another
 * property, so an unrecognized custom value there doesn't get mis-sorted
 * into the wrong group — it just never dedupes against a same-family class
 * it should override (both apply, and the stylesheet's own rule order picks
 * the winner instead of the last class in the string). Lower stakes than
 * the font-size case, but registering them here makes `cn()` actually do
 * what CLAUDE.md § Styling & Design System says it does.
 *
 * The lists below are every literal `--text-*` / `--radius-*` / `--shadow-*`
 * / `--tracking-*` name declared in `globals.css`'s `@theme` block (aliases
 * included — an alias still generates a real, separate utility class).
 * Keep them in sync when a token is added, renamed or removed there.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "body-lg",
            "body-md",
            "body-sm",
            "caption",
            "display-1",
            "display-2",
            "eyebrow",
            "title-1",
            "title-2",
            "title-3",
          ],
        },
      ],
      rounded: [
        {
          rounded: [
            "au-badge",
            "au-card",
            "au-panel",
            "band",
            "card",
            "chip",
            "circle",
            "field",
            "frame",
            "hero-img",
            "ip-card",
            "ip-partner",
            "ip-pic",
            "ip-type",
            "menu",
            "menu-tag",
            "node",
            "panel",
            "pill",
            "scard-mob",
            "stage",
            "surface",
            "tag",
            "tile",
            "tile-sm",
            "visual",
          ],
        },
      ],
      shadow: [
        {
          shadow: [
            "au-badge",
            "au-card",
            "au-dot",
            "au-dot-now",
            "au-press",
            "au-press-dark",
            "badge",
            "blog-card",
            "blog-chart",
            "blog-chip",
            "blog-feat",
            "blog-fig",
            "blog-search",
            "blue-glow",
            "card",
            "card-hover",
            "chip",
            "dark",
            "elevated",
            "feature",
            "gap-item",
            "glow",
            "ip-card",
            "ip-lift",
            "layer",
            "layer-hover",
            "menu",
            "menu-card",
            "monitor",
            "nav",
            "nav-mob",
            "node",
            "node-active",
            "overlay",
            "panel",
            "raise",
            "scard-mob",
            "stage",
            "suite",
            "tile",
            "tile-hover",
          ],
        },
      ],
      tracking: [
        { tracking: ["caps", "display", "heading", "label", "note", "snug"] },
      ],
    },
  },
});

/**
 * Compose class names, dropping falsy values and resolving Tailwind
 * conflicts (last class wins) — see CLAUDE.md § Styling & Design System.
 *
 *   cn("p-4", isCompact && "p-2") // "p-2" when isCompact
 */
export function cn(...inputs) {
  return twMerge(inputs.flat(Infinity).filter(Boolean).join(" "));
}
