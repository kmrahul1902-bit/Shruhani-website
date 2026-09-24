import { describe, it, expect } from "vitest";
import {
  wrapWithin,
  offsetFor,
  indexAt,
  driftTo,
  stepPlan,
} from "./carouselDrift.math";

/**
 * The real geometry of the toolkit row at 390px, measured in WebKit: a
 * padding-left of 77 centres the 236px card, the gap is 14, and five cards are
 * rendered twice.
 */
const M = { pad: 77, pitch: 250, perPass: 5, period: 1250 };

describe("wrapWithin", () => {
  it("stays inside [0, span) for negative values too", () => {
    expect(wrapWithin(30, 100)).toBe(30);
    expect(wrapWithin(130, 100)).toBe(30);
    expect(wrapWithin(-70, 100)).toBe(30);
    expect(wrapWithin(-170, 100)).toBe(30);
  });
});

describe("offsetFor / indexAt", () => {
  /**
   * The first card is at `pad`, not 0. Getting this wrong parks the row on the
   * empty gutter that centres it, with no card in the frame.
   */
  it("puts card 0 at the padding, not at zero", () => {
    expect(offsetFor(M, 0)).toBe(77);
    expect(offsetFor(M, 1)).toBe(327);
    expect(offsetFor(M, 5)).toBe(1327);
  });

  it("reads back the index the drift left mid-card", () => {
    expect(indexAt(M, 77)).toBe(0);
    expect(indexAt(M, 200)).toBe(0);
    expect(indexAt(M, 210)).toBe(1);
    expect(indexAt(M, 1327)).toBe(5);
  });
});

describe("driftTo", () => {
  it("advances by the elapsed distance", () => {
    expect(driftTo(M, 77, 10)).toBe(87);
  });

  /** Wrapping by one pass lands on the identical card, at `pad` — never 0. */
  it("wraps one pass onto the same card", () => {
    expect(driftTo(M, 1327, 0)).toBe(77);
    expect(driftTo(M, 1320, 10)).toBe(80);
  });

  /**
   * rAF stops in a backgrounded tab. The frame after it resumes can carry
   * seconds -- several periods -- and a single subtraction would leave the row
   * beyond the end of its own content, which is empty space.
   */
  it("survives a frame gap worth several passes", () => {
    const far = driftTo(M, 77, 30 * 1000 * 0.05); // 30s at 50px/s = 1500px
    expect(far).toBeGreaterThanOrEqual(M.pad);
    expect(far).toBeLessThan(M.pad + M.period);
    expect(driftTo(M, 77, 12_500)).toBe(77); // exactly ten passes
  });

  it("never returns a position below the padding", () => {
    for (let delta = 0; delta < 4000; delta += 37) {
      const at = driftTo(M, 77, delta);
      expect(at).toBeGreaterThanOrEqual(M.pad);
      expect(at).toBeLessThan(M.pad + M.period);
    }
  });
});

describe("stepPlan", () => {
  it("lands exactly on a card boundary", () => {
    expect(stepPlan(M, 77, 1)).toEqual({ hopTo: undefined, scrollTo: 327 });
    expect(stepPlan(M, 327, 1)).toEqual({ hopTo: undefined, scrollTo: 577 });
    expect(stepPlan(M, 577, -1)).toEqual({ hopTo: undefined, scrollTo: 327 });
  });

  /**
   * The old step added a hardcoded 16 to the card width when the gap is 14, so
   * each press overshot by 2px and the row walked off the boundaries for good.
   * A mid-card start must still resolve to a boundary.
   */
  it("re-aligns a row the drift left mid-card", () => {
    expect(stepPlan(M, 201, 1).scrollTo).toBe(327);
    expect(stepPlan(M, 199, 1).scrollTo).toBe(327);
  });

  it("re-enters through the duplicate when stepping back off the start", () => {
    const plan = stepPlan(M, 77, -1);
    expect(plan.hopTo).toBe(1327); // card 5 -- the copy of card 0
    expect(plan.scrollTo).toBe(1077); // one card left of it
  });

  it("re-enters through the duplicate when stepping past the last card", () => {
    const plan = stepPlan(M, 1327, 1);
    expect(plan.hopTo).toBe(77); // back to card 0
    expect(plan.scrollTo).toBe(327);
  });

  /** Whatever the direction or start, the target is always a real card. */
  it("never targets the gutter or the void past the duplicate", () => {
    for (let sl = 0; sl <= M.pad + 2 * M.period; sl += 31) {
      for (const direction of [1, -1]) {
        const { scrollTo } = stepPlan(M, sl, direction);
        expect(scrollTo).toBeGreaterThanOrEqual(M.pad);
        expect(scrollTo).toBeLessThanOrEqual(M.pad + 2 * M.period);
        expect((scrollTo - M.pad) % M.pitch).toBe(0);
      }
    }
  });
});
