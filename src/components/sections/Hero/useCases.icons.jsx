/**
 * Inline icon set for the hero diagram and the use-case switcher (mockup lines
 * 4094–4116, 4175–4188, 4423–4436).
 *
 * Every path is verbatim from the mockup; `fill`/`stroke` are switched to
 * `currentColor` so the caller sets colour with a token class instead of each
 * glyph carrying its own hex. Stroke weights are preserved exactly — the
 * handoff calls those out specifically (§ Assets).
 */

/* Orbiting signal chips — solid glyphs, 24×24. */
const SIGNAL_PATHS = {
  device:
    "M6 3.5A2.5 2.5 0 018.5 1h7A2.5 2.5 0 0118 3.5v17A2.5 2.5 0 0115.5 23h-7A2.5 2.5 0 016 20.5zM10 19.4h4a.9.9 0 010 1.8h-4a.9.9 0 010-1.8z",
  email:
    "M2 6.6A2.6 2.6 0 014.6 4h14.8A2.6 2.6 0 0122 6.6v.4l-10 5.8L2 7zM2 9.3l9.5 5.5a1 1 0 001 0L22 9.3v8.1a2.6 2.6 0 01-2.6 2.6H4.6A2.6 2.6 0 012 17.4z",
  image:
    "M3 5.6A2.6 2.6 0 015.6 3h12.8A2.6 2.6 0 0121 5.6v12.8a2.6 2.6 0 01-2.6 2.6H5.6A2.6 2.6 0 013 18.4zm5.6 1.7a2.1 2.1 0 100 4.2 2.1 2.1 0 000-4.2zM5 18.2l4.3-4.4 3.3 3.3 2.7-2 3.7 3.3v.2H5z",
  phone:
    "M6.4 2.6h4.2l2.1 5.3-2.7 1.6a12.4 12.4 0 004.5 4.5l1.6-2.7 5.3 2.1v4.2a2.2 2.2 0 01-2.4 2.2A17.4 17.4 0 014.2 5a2.2 2.2 0 012.2-2.4z",
  location:
    "M12 1.8a7.7 7.7 0 00-7.7 7.7c0 5.7 6.7 11.8 7 12.1a1 1 0 001.4 0c.3-.3 7-6.4 7-12.1A7.7 7.7 0 0012 1.8zm0 10.2a2.5 2.5 0 110-5 2.5 2.5 0 010 5z",
  behavior:
    "M3 13.5h2.6V19H3zm4.7-4.8h2.6V19H7.7zm4.7-4.4H15V19h-2.6zm4.7 6.4h2.6V19h-2.6z",
};

/**
 * The same glyphs as fragments, for callers that set their own fill on the
 * <svg> — ScreenX's hero tints its chips with the live risk accent rather than
 * the fixed blue below. `documents` is ScreenX-only: its orbit swaps the home
 * page's image chip for a document one.
 */
export const CHIP_GLYPHS = {
  ...Object.fromEntries(
    Object.entries(SIGNAL_PATHS).map(([name, d]) => [
      name,
      <path key={name} fillRule="evenodd" clipRule="evenodd" d={d} />,
    ])
  ),
  documents: (
    <>
      <path d="M6.2 2.4h7l4.6 4.6v14.6H6.2zm7 1.6v3.6h3.6z" />
      <path d="M8.6 12.4h6.8v1.6H8.6zm0 3.4h6.8v1.6H8.6z" fill="#FFFFFF" />
    </>
  ),
};

/* The blue is set on the glyph itself, not its plate: the mockup's chip plate
   inherits the page's ink and only the SVG is blue, and a plate tinted blue
   would hand that colour to anything else inside it. */
export function SignalIcon({ name }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-blue"
    >
      <path fillRule="evenodd" clipRule="evenodd" d={SIGNAL_PATHS[name]} />
    </svg>
  );
}

/** Shield + tick — the APPROVE verdict badge. */
export function ShieldCheckIcon({ size = 46 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.4a1 1 0 00-.4.1L4.5 5.3a1 1 0 00-.6.9v5.4c0 5.1 3.4 9.4 8.1 11.1a1 1 0 00.7 0c4.7-1.7 8.1-6 8.1-11.1V6.2a1 1 0 00-.6-.9L12.4 2.5a1 1 0 00-.4-.1z" />
      <path d="M8.4 11.6l2.4 2.5 4.5-4.7 1.5 1.5-6 6.2-3.9-4z" fill="#fff" />
    </svg>
  );
}

/** Shield + padlock — the FREEZE verdict badge. */
export function ShieldLockIcon({ size = 46 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.4a1 1 0 00-.4.1L4.5 5.3a1 1 0 00-.6.9v5.4c0 5.1 3.4 9.4 8.1 11.1a1 1 0 00.7 0c4.7-1.7 8.1-6 8.1-11.1V6.2a1 1 0 00-.6-.9L12.4 2.5a1 1 0 00-.4-.1z" />
      <path
        d="M9.6 9.2V8.1a2.4 2.4 0 014.8 0v1.1h.6c.5 0 .9.4.9.9v4.3c0 .5-.4.9-.9.9H9c-.5 0-.9-.4-.9-.9v-4.3c0-.5.4-.9.9-.9zm1.5 0h1.8V8.1a.9.9 0 00-1.8 0z"
        fill="#fff"
      />
    </svg>
  );
}

/** Institution mark preceding the "Decision" caption. */
export function BankIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="mr-1.5 -mb-0.5 inline-block"
    >
      <path d="M12 2.3 22 7.4v2H2v-2zM4.6 11.4h2.3v6.9H4.6zm3.9 0h2.3v6.9H8.5zm3.9 0h2.3v6.9h-2.3zm3.9 0h2.3v6.9h-2.3zM2.6 20.1h18.8v1.9H2.6z" />
    </svg>
  );
}

/* Use-case tab glyphs — 24×24 stroked outlines. */
const USE_CASE_PATHS = {
  shield: <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3Z" />,
  user: (
    <>
      <circle cx="10" cy="8" r="3.2" />
      <path d="M4 20c0-3.3 2.7-6 6-6" />
      <path d="M17 13.5v6M14 16.5h6" />
    </>
  ),
  pulse: <path d="M3 12h4l2 6 4-14 2 8h6" />,
  doc: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </>
  ),
};

export function UseCaseIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      {USE_CASE_PATHS[name]}
    </svg>
  );
}

/** Arrow used by the use-case "Know more" button. */
export function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
