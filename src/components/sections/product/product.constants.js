/**
 * Shared enum for the product-page section variants. Ported as a local
 * constant, not the reference's `config/constants.js` — this project has no
 * config/routes registry (see plan/CLAUDE.md → Decisions).
 */
export const SECTION_VARIANT = {
  CORTEX: "cortex",
  SCREENX: "screenx",
  ESCALATION: "escalation",
  INDUSTRY: "industry",
  MODULE: "module",
  PRODUCT: "product",
  INLINE: "inline",
};

/**
 * `gap.constants.js`'s `CARD_ART` is keyed by a content `key` field the
 * reference's CMS supplies per card; our baked JSON only carries
 * title/description (no `key`, no `image`). These are the exact keys from
 * `CARD_ART`, in the same order the baked content's cards already come in
 * (verified by matching each card's title against the reference source) —
 * zipping them on gives `GapCard` the same art lookup without a CMS.
 */
export const GAP_CARD_KEYS = {
  screenx: [
    "clean-kyc-malicious-intent",
    "bureau-thin-applicants",
    "no-early-read-on-default",
    "structured-data-only",
  ],
  cortex: [
    "mules-activate-after-approval",
    "takeovers-wear-the-right-credentials",
    "rings-hide-in-plain-sight",
    "risk-surfaces-too-late",
  ],
  escalation: [
    "cases-built-from-scratch",
    "lea-requests-by-email-in-volume",
    "detection-and-action-don-t-talk",
    "audit-trail-assembled-after-the-fact",
  ],
};

/** Zips a suite's gap cards with their known keys (see `GAP_CARD_KEYS`). */
export function withGapKeys(cards, suite) {
  const keys = GAP_CARD_KEYS[suite] ?? [];
  return (cards ?? []).map((card, i) => ({ ...card, key: keys[i] ?? i }));
}

/** Any list of cards that only needs a stable-enough React key (no art
 * lookup depends on it) — HowItWorks steps, Toolkit/Threats/SignalLayers
 * cards. Falls back to the index since the baked content has no `key`. */
export function withIndexKeys(items) {
  return (items ?? []).map((item, i) => ({ ...item, key: item.key ?? i }));
}

/**
 * Adds the `key` every section component's card list needs (React key, and
 * for Gap the CARD_ART lookup) to a suite's raw `getContent()` result. Keeps
 * the section components themselves an unmodified port — the one place our
 * baked JSON differs from the reference's CMS shape (no `key`/`image` per
 * card) is patched here, once, per page.
 */
export function enrichProductContent(content, suite) {
  return {
    ...content,
    gap: { ...content.gap, cards: withGapKeys(content.gap?.cards, suite) },
    howItWorks: {
      ...content.howItWorks,
      steps: withIndexKeys(content.howItWorks?.steps),
    },
    personaLayers: {
      ...content.personaLayers,
      sub: Array.isArray(content.personaLayers?.sub)
        ? content.personaLayers.sub
        : [content.personaLayers?.sub].filter(Boolean),
      cards: withIndexKeys(content.personaLayers?.cards),
    },
    toolkit: {
      ...content.toolkit,
      cards: withIndexKeys(content.toolkit?.cards),
    },
    threats: {
      ...content.threats,
      cards: withIndexKeys(content.threats?.cards),
    },
  };
}
