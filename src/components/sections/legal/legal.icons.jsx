/**
 * The two glyphs under the contents rail — 1.7 stroke on a 24px grid,
 * `currentColor`, so the button owns the colour and the hover state.
 */
const STROKE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const PATHS = {
  envelope: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </>
  ),
  chat: <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l.9-4.4A8 8 0 1 1 20 12Z" />,
};

/** Decorative: each button carries its own accessible name. */
export function LegalIcon({ name }) {
  const paths = PATHS[name];
  if (!paths) return null;
  return (
    <svg {...STROKE} className="block size-4" aria-hidden="true">
      {paths}
    </svg>
  );
}
