/**
 * The evidence stack's glyphs, one path set per signal.
 *
 * Separate from evidence-art because they are markup, not values, and a data
 * module full of JSX is a data module you cannot read. Inline rather than
 * fetched: they inherit `currentColor` for the tone treatment, and six extra
 * requests for six paths is a poor trade.
 */
export const ICONS = {
  device: (
    <>
      <rect x="6.5" y="2.8" width="11" height="18.4" rx="2.6" />
      <path d="M10.6 18.4h2.8" />
    </>
  ),
  behaviour: <path d="M3 12.4h3.4l2-5.2 3.2 10 2.4-6.2 1.6 3.2h4.4" />,
  location: (
    <>
      <path d="M19 10.4c0 5-7 10.4-7 10.4s-7-5.4-7-10.4a7 7 0 1114 0z" />
      <circle cx="12" cy="10.2" r="2.5" />
    </>
  ),
  footprint: (
    <>
      <path d="M4.6 11.2c0-4.1 3.3-7.4 7.4-7.4s7.4 3.3 7.4 7.4" />
      <path d="M7.4 11.4a4.6 4.6 0 019.2 0v2.2c0 3.3-2 6.2-4.6 6.8" />
      <path d="M10 11.6a2 2 0 014 0v3.6" />
    </>
  ),
};
