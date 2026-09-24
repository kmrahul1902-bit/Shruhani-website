/**
 * The reader's icon set — one 24px line glyph per signal card. Content names
 * an icon by KEY, never by markup; an unknown key renders nothing rather
 * than throwing.
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
  fingerprint: (
    <>
      <path d="M12 3c-2.4 0-4.5 1.2-5.7 3" />
      <path d="M4.6 9.6A8 8 0 0 1 20 12v3" />
      <path d="M7.5 20a12 12 0 0 1-1.4-5.6A5.9 5.9 0 0 1 12 8.5a5.9 5.9 0 0 1 5.9 5.9" />
      <path d="M11 20.6a8 8 0 0 1-.9-3.6A1.9 1.9 0 0 1 14 17" />
    </>
  ),
  shield: <path d="M12 3l7 3v6c0 4.2-2.9 7.7-7 9-4.1-1.3-7-4.8-7-9V6z" />,
  link: (
    <>
      <path d="M10 13a4 4 0 0 0 5.7 0l2.6-2.6A4 4 0 0 0 12.6 4.7L11.3 6" />
      <path d="M14 11a4 4 0 0 0-5.7 0L5.7 13.6A4 4 0 0 0 11.4 19.3L12.7 18" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  cube: (
    <>
      <path d="M12 3l8 4v10l-8 4-8-4V7z" />
      <path d="M4 7l8 4 8-4M12 11v10" />
    </>
  ),
  clone: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3" />
    </>
  ),
  source: (
    <>
      <circle cx="8.5" cy="12" r="3.5" />
      <path d="M12 12h8M17 12v3" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M9 20h6" />
    </>
  ),
  cast: <path d="M5 4l13 6-5.5 1.8L10 18z" />,
  phone: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      <path d="M11 18h2" />
    </>
  ),
  wifi: (
    <>
      <path d="M4 9a12 12 0 0 1 16 0" />
      <path d="M7 12.5a8 8 0 0 1 10 0" />
      <path d="M10 16a4 4 0 0 1 4 0" />
      <circle cx="12" cy="19" r="1" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.4 2.4 14.1 0 17-2.4-2.9-2.4-14.6 0-17z" />
    </>
  ),
  sim: (
    <>
      <path d="M6 4h8l4 4v12H6z" />
      <rect x="9" y="12" width="6" height="5" rx="1" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19h16" />
      <path d="M7 19v-5M12 19V7M17 19v-8" />
    </>
  ),
  star: (
    <path d="M12 4l1.8 4.6L18.5 10l-4.7 1.4L12 16l-1.8-4.6L5.5 10l4.7-1.4z" />
  ),
};

/** One signal-card glyph. Decorative: the card's label carries the meaning. */
export function ReaderIcon({ name }) {
  const paths = PATHS[name];
  if (!paths) return null;
  return (
    <svg {...STROKE} className="block size-4.5" aria-hidden="true">
      {paths}
    </svg>
  );
}

/**
 * The bullet tick. Heavier stroke than the card glyphs (3.4 against 1.7)
 * because it is drawn at 11px inside an 18px disc, where a hairline
 * disappears.
 */
export function ReaderTick() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block size-2.75"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
