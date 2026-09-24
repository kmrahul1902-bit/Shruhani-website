/**
 * Marquee speeds, as classes rather than a prop the component writes into a
 * style attribute: no inline styles in this codebase, so a duration has to
 * exist as a utility before a component can ask for it.
 *
 * The handoffs use 26s for the logo rows and go up to 42s elsewhere; each speed
 * that a design actually asks for gets an entry here and a matching @utility in
 * globals.css. Adding a speed is two lines in two files, which is the point —
 * it keeps the set of speeds a design decision rather than a per-call number.
 */
export const MARQUEE_SPEEDS = {
  logos: "marquee-track-26s",
};

export const DEFAULT_MARQUEE_SPEED = "logos";
