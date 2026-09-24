/**
 * Module-page chrome labels (accessibility strings, not editorial content).
 *
 * The reference reads these from a CMS shell (`content.labels`) that this
 * project doesn't have — see plan/CLAUDE.md → Decisions. The baked
 * `cms-sync-baseline/module*.json` files carry no `labels.*` keys at all, so
 * these are the fallback every module page uses.
 */
export const MODULE_LABELS = {
  heroAnimation: "Product walkthrough",
  readerRegion: "Signal reader",
  readerBar: "Signal cluster",
  integrationPrev: "Previous",
  integrationNext: "Next",
};
