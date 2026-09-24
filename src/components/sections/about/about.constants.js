/**
 * The About page's shared section shells.
 *
 * The handoff draws four section boxes and reuses them down the page, so they
 * are named once here rather than re-typed per component:
 *
 *   .au-sec        1400px column, 112px/80px padding — the light sections
 *   .au-hero       90px top, no bottom; the metric strip closes it
 *   .au-band       #f7f9fc, hairline top and bottom, 104px/80px
 *   .au-dark       #060708, 112px/80px, inner column pinned to 1240px
 *
 * The gutter steps 80 → 44 → 22px, which is NOT `container-default`'s
 * 80 → 48 → 24: this page has its own. Both breakpoints are the handoff's
 * (1080px and 680px) and map to the existing `bento` and `flow` breakpoints.
 */
export const SECTION =
  "mx-auto max-w-350 px-20 py-28 max-bento:px-11 max-flow:px-5.5 max-flow:py-18";

/** The same box with its top padding removed — leaders and team follow on. */
export const SECTION_TIGHT =
  "mx-auto max-w-350 px-20 pt-0 pb-28 max-bento:px-11 max-flow:px-5.5 max-flow:pb-18";

/** The inner column every full-bleed section pins its content to. */
export const INNER = "mx-auto max-w-310";

/** Dark sections: the ground, and the same 112px/80px box. */
export const SECTION_DARK =
  "bg-ground text-white px-20 py-28 max-bento:px-11 max-flow:px-5.5";
