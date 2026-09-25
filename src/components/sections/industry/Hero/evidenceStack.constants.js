/**
 * The evidence stack's wiring, tones and drift timings.
 *
 * Extracted from the component: these describe one illustration — where each
 * wire runs, how long each node drifts — and none of it is rendering. Keeping
 * them here leaves EvidenceStack as the composition.
 *
 * Ported from the reference; `TONE.blue`'s hex recolored to the pink brand
 * (Phase 1) — the same strong-fill/brighter pairing as `--color-blue`
 * (`#c21e86`) and `--color-blue-edge` (`#f45fb8`) elsewhere on the site.
 * `TONE.violet` is Escalation's kept purple family (Option A), unchanged.
 */

export const WIRES = [
  {
    key: "device",
    in: "M34 63 H24 A6 6 0 0 0 18 69 V159 H34",
    out: "M370 159 H380 A6 6 0 0 1 386 165 V201 A6 6 0 0 0 392 207 H404",
    tone: "blue",
    begin: "0s",
  },
  {
    key: "behaviour",
    in: "M34 63 H24 A6 6 0 0 0 18 69 V231 H34",
    out: "M370 231 H380 A6 6 0 0 0 386 225 V213 A6 6 0 0 1 392 207 H404",
    tone: "violet",
    begin: "0.9s",
  },
  {
    key: "location",
    in: "M34 63 H24 A6 6 0 0 0 18 69 V303 H34",
    out: "M370 303 H380 A6 6 0 0 0 386 297 V213 A6 6 0 0 1 392 207 H404",
    tone: "blue",
    begin: "1.8s",
  },
  {
    key: "footprint",
    in: "M34 63 H24 A6 6 0 0 0 18 69 V369 A6 6 0 0 0 24 375 H34",
    out: "M370 375 H380 A6 6 0 0 0 386 369 V213 A6 6 0 0 1 392 207 H404",
    tone: "violet",
    begin: "2.7s",
  },
];

export const TONE = {
  blue: { halo: "#C21E86", core: "#F45FB8" }, // was #1D4ED8 / #3B6FF5
  violet: { halo: "#6D5AE6", core: "#7C6BEC" },
};

/** Each card drifts on its own period so the stack never pulses in unison. */
export const DRIFT = {
  device: "5.1s",
  behaviour: "6.3s",
  location: "4.7s",
  footprint: "5.8s",
};
