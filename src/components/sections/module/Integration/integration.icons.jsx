/**
 * The integration cards' glyphs. Content names one by key; an unknown key
 * renders nothing rather than throwing.
 */
const STROKE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const SHIELD_TICK = (
  <>
    <path d="M12 3l7 3v6c0 4.2-2.9 7.7-7 9-4.1-1.3-7-4.8-7-9V6z" />
    <path d="M9 12l2 2 4-4" />
  </>
);

const PATHS = {
  delivery: (
    <>
      <path d="M9 8L5 12l4 4" />
      <path d="M15 8l4 4-4 4" />
    </>
  ),
  footprint: (
    <>
      <path d="M12 3l8 4v10l-8 4-8-4V7z" />
      <path d="M4 7l8 4 8-4M12 11v10" />
    </>
  ),
  response: <path d="M13 3L5 14h6l-1 7 8-11h-6z" />,
  timeline: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2.5" />
      <path d="M4 10h16M9 3v4M15 3v4" />
    </>
  ),
  compliance: SHIELD_TICK,
  consent: SHIELD_TICK,
  inbox: (
    <>
      <path d="M4 5h16v11H8l-4 4z" />
      <path d="M8 9h8M8 12.5h5" />
    </>
  ),
  privacy: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
};

export function IntegrationIcon({ name }) {
  const paths = PATHS[name];
  if (!paths) return null;
  return (
    <svg {...STROKE} className="block size-6" aria-hidden="true">
      {paths}
    </svg>
  );
}
