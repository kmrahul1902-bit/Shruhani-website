// The word each headline emphasises is coloured by what the case is about:
// fraud red, approval green, risk amber, compliance violet.
const EMPHASIS_TONE = {
  fraud: "text-fraud",
  pass: "text-prod-cortex",
  warn: "text-warn-bright",
  violet: "text-prod-escalation",
};

/**
 * How wide the illustration actually renders, so next/image can pick a
 * derivative that matches it.
 *
 * This said `300px` while the panel drew the image at 535-562px, which is not a
 * rounding error: `sizes` is what Next multiplies by the device pixel ratio to
 * choose a srcset entry, so a retina desktop asked for ~600px, got the 640
 * candidate, and painted it into a 1070-1124px box. Measured across the
 * breakpoints, every desktop width was upscaling by 1.5-1.8x — the images were
 * soft everywhere, from the attribute alone, whatever the source was.
 *
 * Measured slot as a share of the viewport: ~36-37% from 768 to 1440, falling
 * to 29% at 1920 where the section's gutter clamp stops growing, and 76-86%
 * wherever the grid is one column — which is everything below 721px, not below
 * 621: the panels go two-up at the card breakpoint, not the mobile one, so a
 * single 620px step left 621-720 asking for a third of the width it draws. The
 * values below sit just above each measured share, so the chosen candidate is
 * never smaller than the box.
 */
export const USE_CASE_ILLUSTRATION_SIZES =
  "(max-width: 620px) 90vw, (max-width: 720px) 80vw, (max-width: 1600px) 38vw, 580px";

/**
 * The artwork's own proportions, for the box Next reserves before it loads.
 *
 * 720x960 was hardcoded here from the era when these were 3:4 portraits. The
 * handoff replaced them with 3:2 landscape crops, so the reserved box was the
 * wrong shape on every panel. Strapi reports the real intrinsic size when it
 * has it; this is the fallback for a local render, and it matches the current
 * artwork rather than the previous generation of it.
 */
export const USE_CASE_ILLUSTRATION_RATIO = { width: 1200, height: 800 };

/**
 * Colours the accent phrase inside a heading.
 *
 * The content model gives one complete sentence plus the substring to
 * emphasise, rather than three fragments — an editor cannot leave it
 * grammatically broken that way. If the phrase is not found (a typo, or copy
 * edited without updating it) the sentence still renders in full, unstyled.
 */
export function AccentHeading({ heading, accentPhrase, tone }) {
  const at = accentPhrase ? heading.indexOf(accentPhrase) : -1;
  if (at === -1) return heading;
  return (
    <>
      {heading.slice(0, at)}
      <span className={EMPHASIS_TONE[tone]}>{accentPhrase}</span>
      {heading.slice(at + accentPhrase.length)}
    </>
  );
}
