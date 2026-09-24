import { extendTailwindMerge } from "tailwind-merge";

/**
 * Custom token groups (font sizes, radii, shadows, tracking) get registered
 * here once `globals.css` defines them in Phase 1 — see CLAUDE.md →
 * Design-system rules. Phase 0 has no custom tokens yet, so this wraps
 * tailwind-merge's defaults unchanged.
 */
const twMerge = extendTailwindMerge({});

/**
 * Compose class names, dropping falsy values and resolving Tailwind
 * conflicts (last class wins) — see CLAUDE.md § Styling & Design System.
 *
 *   cn("p-4", isCompact && "p-2") // "p-2" when isCompact
 */
export function cn(...inputs) {
  return twMerge(inputs.flat(Infinity).filter(Boolean).join(" "));
}
