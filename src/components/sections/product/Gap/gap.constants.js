/**
 * The bento cards' artwork treatment, and the fills each variant uses.
 *
 * Extracted from Gap so the component reads as the composition it is. Every
 * value here describes THIS illustration set rather than a reusable scale,
 * which is why it stays beside the component instead of becoming tokens.
 */

export const CARD_ART = {
  // ── Cortex ──
  "mules-activate-after-approval": {
    fill: "bg-black",
    slot: true,
    width: 300,
    height: 270,
    intrinsic: [1498, 1254],
  },
  "takeovers-wear-the-right-credentials": {
    fill: "bg-abyss",
    slot: true,
    width: 300,
    height: 270,
    intrinsic: [1254, 1254],
  },
  "rings-hide-in-plain-sight": {
    fill: "bg-black",
    slot: false,
    width: 300,
    height: 270,
    intrinsic: [1165, 1254],
  },
  "risk-surfaces-too-late": {
    fill: "bg-abyss",
    slot: true,
    width: 250,
    height: 225,
    intrinsic: [2660, 2364],
  },

  // ── ScreenX. Keyed in the same table because card keys are unique across
  // pages, which keeps this a plain lookup instead of a prop threaded through
  // the page for something no editor will ever change. ──
  "clean-kyc-malicious-intent": {
    fill: "bg-abyss-2",
    slot: false,
    width: 300,
    height: 270,
    intrinsic: [1254, 1254],
  },
  "bureau-thin-applicants": {
    fill: "bg-abyss-2",
    slot: true,
    width: 300,
    height: 270,
    intrinsic: [1254, 1254],
  },
  "no-early-read-on-default": {
    fill: "bg-abyss",
    slot: true,
    width: 300,
    height: 270,
    intrinsic: [1254, 1254],
  },
  "structured-data-only": {
    fill: "bg-abyss-3",
    slot: true,
    width: 300,
    height: 270,
    intrinsic: [1254, 1254],
  },

  // ── Escalation. Its art is anchored from the TOP of the card rather than
  // the bottom: these illustrations are drawn with their subject high in the
  // frame, so bottom-anchoring them left a gap under the copy. ──
  "cases-built-from-scratch": {
    fill: "bg-black",
    slot: true,
    top: 172,
    width: 348,
    height: 313,
    intrinsic: [1480, 1480],
  },
  "lea-requests-by-email-in-volume": {
    fill: "bg-abyss",
    slot: true,
    top: 214,
    width: 327,
    height: 270,
    intrinsic: [1480, 1480],
  },
  "detection-and-action-don-t-talk": {
    fill: "bg-black",
    slot: true,
    top: 172,
    width: 348,
    height: 313,
    intrinsic: [1480, 1480],
  },
  "audit-trail-assembled-after-the-fact": {
    fill: "bg-abyss",
    slot: true,
    top: 172,
    width: 348,
    height: 313,
    intrinsic: [1480, 1480],
  },
};

/**
 * The reserved plate an over-hanging illustration sits in front of. Cortex
 * rounds its bottom corners hard so the artwork's shadow doesn't square off
 * the card; ScreenX runs its art taller and rounds the plate evenly.
 */
export const SLOT = {
  cortex: "bento-art-slot",
  screenx: "bento-art-slot-even",
  industry: "bento-art-slot-flush",
};

/**
 * The industry pages draw this bento differently enough to be a variant rather
 * than more rows in CARD_ART: every card takes the SAME dark fill (the
 * alternation is a product-page rhythm), the emphasis is institutional blue
 * rather than the page accent, and the four illustrations sit on one shared
 * baseline at a single size instead of each carrying its own.
 *
 * `lift` is the design's one exception — the banks regulatory card's artwork
 * sits 12px higher than the rest, called out explicitly in the handoff.
 */
export const INDUSTRY_ART = { intrinsic: [652, 524], width: 326, height: 262 };
export const INDUSTRY_LIFT = { "regulatory-weight": 12 };

/**
 * Per-card fill overrides. Each industry page has a base fill (passed in as
 * `fill`), and NBFCs alone breaks it: three of its four cards go to pure black
 * so the remaining one reads as a raised panel between them.
 */
export const INDUSTRY_FILL = {
  "the-squeeze": "bg-black",
  "the-bureau-gap": "bg-black",
  "the-segment-you-can-see-but-can-t-serve": "bg-black",
};
