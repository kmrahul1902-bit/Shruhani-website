/**
 * Mega-menu link icons, ported verbatim from the mockup's inline SVG (the 22
 * `.mega-ic svg` blocks in the #megaWrap panels).
 *
 * Every one shares the same attributes there — 24×24, no fill, currentColor
 * stroke at 1.7 with round caps and joins — so the wrapper owns them and each
 * entry is only its paths. Stroke weight is preserved exactly: it is what makes
 * these read as one set (handoff § Assets, "keep the stroke weights").
 *
 * `currentColor` is deliberate. The mockup tags some icons `.mega-ic.green` or
 * `.mega-ic.red`, but its own CSS resolves all three tone classes to the same
 * blue, so the tones are dead classes and are not reproduced — the plate colour
 * comes from the caller instead.
 *
 * Two pairs share paths in the source: AML & Compliance and Glossary are
 * identical (`doc`), and Case Studies / Blog differ only in two line offsets.
 */
const PATHS = {
  // Products
  screenx: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M8 9l2.5 2L8 13" />
      <path d="M13 13h3" />
    </>
  ),
  cortex: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.8 2.8M16.2 16.2 19 19M19 5l-2.8 2.8M7.8 16.2 5 19" />
    </>
  ),
  escalation: (
    <>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </>
  ),

  // Modules
  // A globe, not the fingerprint arcs this carried: the row is about a
  // phone and an email resolving into signals from across the web, and the
  // fingerprint belongs to Device Intelligence two rows above it — two
  // near-identical arc glyphs in one panel read as the same module twice.
  // Taken from the Aug 26 header handoff.
  footprint: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M8 6l1.5-2h5L16 6" />
      <circle cx="12" cy="13" r="3.2" />
    </>
  ),
  device: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </>
  ),
  // A speech bubble with two text lines — the inbox the module reads.
  sms: (
    <>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
      <path d="M8.5 10.5h7M8.5 14h4" />
    </>
  ),
  behaviour: (
    <>
      <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10" />
      <path d="M12 10V4.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M15 11V6.5a1.5 1.5 0 0 1 3 0V14c0 3.5-2.5 7-6 7s-6-2.5-6.5-5.5L5 12.5a1.5 1.5 0 0 1 2.6-1.4L9 13" />
    </>
  ),

  // Use cases
  onboarding: (
    <>
      <circle cx="10" cy="8" r="3.2" />
      <path d="M4 20c0-3.3 2.7-6 6-6 1 0 1.9.2 2.7.6" />
      <path d="M15 17l2 2 4-4" />
    </>
  ),
  fraud: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3Z" />
      <path d="M12 8v4M12 15.5v.5" />
    </>
  ),
  credit: (
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="M8 16v-3M12 16v-6M16 16v-4" />
      <path d="M7 8l4-3 3 2 4-4" />
      <path d="M18 3h0.5V3.5" />
    </>
  ),
  // AML & Compliance and Glossary share this in the source.
  doc: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </>
  ),

  // Industries
  bank: (
    <>
      <path d="M3 9l9-5 9 5" />
      <path d="M5 9v9M9 9v9M15 9v9M19 9v9" />
      <path d="M3 21h18" />
    </>
  ),
  lending: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9c-.5-1-1.5-1.5-2.5-1.5-1.4 0-2.5.9-2.5 2s1 1.7 2.5 2 2.5.9 2.5 2-1.1 2-2.5 2c-1 0-2-.5-2.5-1.5" />
      <path d="M12 6v1.5M12 16.5V18" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18M7 15h4" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2l2.2 11.5a1.5 1.5 0 0 0 1.5 1.2h8a1.5 1.5 0 0 0 1.5-1.2L20 8H6" />
      <circle cx="9" cy="20" r="1.3" />
      <circle cx="17" cy="20" r="1.3" />
    </>
  ),

  // Learn
  caseStudy: (
    <>
      <path d="M6 3h8l4 4v14H6Z" />
      <path d="M14 3v4h4" />
      <path d="M9 13h6M9 16h4" />
    </>
  ),
  blog: (
    <>
      <path d="M6 3h8l4 4v14H6Z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 15h4" />
    </>
  ),

  // Build
  api: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 6l-2 12" />,
  press: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 9h3M8 13h8M8 16h6" />
      <rect x="13" y="8" width="4" height="3" rx="0.5" />
    </>
  ),
  comparisons: (
    <>
      <path d="M4 7h10M4 12h16M4 17h7" />
      <circle cx="17" cy="7" r="2" />
      <circle cx="14" cy="17" r="2" />
    </>
  ),
};

/** One mega-menu link icon. Decorative — the link's text is its name. */
export function MegaIcon({ name }) {
  const paths = PATHS[name];
  if (!paths) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-5"
    >
      {paths}
    </svg>
  );
}

export default MegaIcon;
