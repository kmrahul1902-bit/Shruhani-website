/**
 * The use-case stack's states and the wire runs beneath it.
 *
 * Extracted from the component. These describe one illustration — which node
 * connects to which, and what a state looks like — rather than how it renders.
 */

export const STATE = {
  ok: {
    value: "text-eyebrow tracking-note text-uc-ok",
    dot: "bg-uc-ok",
    icon: "uc-ic",
  },
  none: {
    value: "text-eyebrow tracking-note text-uc-muted",
    dot: "bg-uc-muted",
    icon: "uc-ic uc-ic-mute",
  },
};

/** Tick for a row that resolved, dash for one with nothing on record. */

/**
 * The dashed wiring, verbatim from the animation package.
 *
 * Five trunks run from the identity card down the left gutter into each row;
 * five returns run from the rows into the node. Durations are deliberately
 * mismatched — 2.6s to 4s — with negative `begin` offsets, so the lights never
 * march in step. Copying those numbers is the point: an even cadence reads as
 * a progress bar rather than as traffic.
 */
export const TRUNKS = [
  ["hfT1", "M34 50 H24 A6 6 0 0 0 18 56 V134 H34", 3.1, -0.4],
  ["hfT2", "M34 50 H24 A6 6 0 0 0 18 56 V192 H34", 3.7, -2.1],
  ["hfT3", "M34 50 H24 A6 6 0 0 0 18 56 V250 H34", 2.6, -1.3],
  ["hfT4", "M34 50 H24 A6 6 0 0 0 18 56 V308 H34", 4, -3.2],
  ["hfT5", "M34 50 H24 A6 6 0 0 0 18 56 V360 A6 6 0 0 0 24 366 H34", 3.4, -0.7],
];

export const RETURNS = [
  [
    "hfR1",
    "M434 134 H444 A6 6 0 0 1 450 140 V244 A6 6 0 0 0 456 250 H468",
    2.8,
    -0.9,
  ],
  [
    "hfR2",
    "M434 192 H444 A6 6 0 0 1 450 198 V244 A6 6 0 0 0 456 250 H468",
    3.4,
    -2.6,
  ],
  ["hfR3", "M434 250 H468", 3.9, -1.7],
  [
    "hfR4",
    "M434 308 H444 A6 6 0 0 0 450 302 V256 A6 6 0 0 1 456 250 H468",
    3.2,
    -2.9,
  ],
  [
    "hfR5",
    "M434 366 H444 A6 6 0 0 0 450 360 V256 A6 6 0 0 1 456 250 H468",
    3.6,
    -1.1,
  ],
];

export const WIRES = [...TRUNKS, ...RETURNS];
