/**
 * The suite names on the phone.
 *
 * Product identity, fixed per suite. Two of these are NOT the desktop accents:
 * mobileLayerV2 restyles `.m-p-title b` explicitly and gives Cortex a deeper
 * green (#059669 against #16a34a) and Escalation a deeper violet (#7C3AED
 * against #8b5cf6). The older mobile layer left the name unstyled, so it used
 * to inherit the desktop values and these tokens did not exist.
 */
export const SUITE_TITLE = {
  screenx: "text-suite-title-screenx",
  cortex: "text-suite-title-cortex",
  escalation: "text-suite-title-escalation",
};

/**
 * Each flow's artboard, as an aspect ratio.
 */
export const FLOW_ASPECT = {
  screenx: "aspect-flow-screenx",
  cortex: "aspect-flow-cortex",
  escalation: "aspect-flow-escalation",
};

/**
 * The floor every sticky suite card shares, so the three stay the same height.
 */
export const SUITE_CARD_MIN_H = "min-h-101";

/**
 * Structural metadata (route/key/animation) for the three suites, in the
 * same order `home.json`'s `productShowcase.panels` carries them — confirmed
 * by each panel's own `tabLabel` (ScreenX, Cortex, Escalation). The
 * reference reads `key`/`href`/`animation` from the CMS alongside the copy;
 * we have no CMS, so it lives here instead (see plan/CLAUDE.md → Decisions).
 * `animation` slugs match the flow-diagram files ported in Phase 7
 * (`public/animations/<slug>.html`).
 */
export const PRODUCT_META = [
  { key: "screenx", href: "/products/screenx", animation: "screenx-flow" },
  { key: "cortex", href: "/products/cortex", animation: "cortex-flow" },
  {
    key: "escalation",
    href: "/products/escalation",
    animation: "escalation-flow",
  },
];
