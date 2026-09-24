import { withIndexKeys } from "@/components/sections/product/product.constants";

/**
 * The three suites, in the fixed lifecycle order every industry page's
 * `mapping.cards` uses (verified across all four content files — titles
 * read "ScreenX/Cortex/Escalation" on two pages and "Input/Enrich/Decide"
 * on the other two, but the position always maps to the same three
 * suites, confirmed by checking each file). `Mapping.jsx` looks up each
 * card's suite-tone wash by `card.key` (`SUITE_TONE[card.key]`), not just
 * as a React key — an index fallback would silently paint every card
 * ScreenX's color instead of its own.
 */
const SUITE_ORDER = ["screenx", "cortex", "escalation"];

export function withSuiteKeys(cards) {
  return (cards ?? []).map((card, i) => ({
    ...card,
    key: card.key ?? SUITE_ORDER[i] ?? i,
  }));
}

/**
 * Adds the `key` every industry section's card list needs (React key, and
 * for `mapping` the suite-tone lookup) to a page's raw `getContent()`
 * result — the one place our baked JSON differs from the reference's CMS
 * shape (no `key`/`image` per card) is patched here, once, per page.
 */
export function enrichIndustryContent(content) {
  return {
    ...content,
    gap: { ...content.gap, cards: withIndexKeys(content.gap?.cards) },
    decisions: {
      ...content.decisions,
      cards: withIndexKeys(content.decisions?.cards),
    },
    mapping: {
      ...content.mapping,
      cards: withSuiteKeys(content.mapping?.cards),
    },
  };
}
