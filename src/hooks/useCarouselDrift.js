"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { driftTo, stepPlan } from "@/hooks/carouselDrift.math";

/**
 * Pixels per second the track creeps by on its own.
 *
 * 50, not the 22 this shipped with: both the product and the module handoffs
 * describe the same rate — "0.85px/frame", which is ~50px/s at 60fps — and 22
 * read as almost stationary. Expressed per second rather than per frame so the
 * speed does not double on a 120Hz display.
 */
const DRIFT_PX_PER_SECOND = 50;
/** How long a tap on an arrow stops the drift for, so a reader can look. */
const PAUSE_AFTER_STEP_MS = 5000;
/** Only reached if a track somehow has one card and no pitch to measure. */
const FALLBACK_PITCH_PX = 250;

/**
 * The track's geometry, measured rather than assumed.
 *
 * Every position comes from these three numbers, all of which are decided in
 * CSS and were previously hardcoded or derived wrongly:
 *
 * - `pad`. `.carousel-track` has a padding-left of `(100vw - 236px) / 2`, which
 *   centres the first card. It is part of the scrollable extent, so the first
 *   card sits at `scrollLeft === pad`, NOT 0.
 * - `pitch`. Card width plus gap, read from where the second card actually
 *   starts, so a change to either in CSS cannot desync this.
 * - `period`. One full pass of the set — the distance that wraps invisibly.
 *   NOT `scrollWidth / 2`, which includes `pad` counted once across two passes.
 *
 * @returns `{ pad, pitch, perPass, period }`, or null if there is nothing to
 *   measure yet — a track can be laid out before its cards have width.
 */
function measure(track) {
  const first = track.firstElementChild;
  if (!first) return null;
  const perPass = track.children.length / 2;
  if (perPass < 1) return null;

  const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
  const second = first.nextElementSibling;
  const pitch = second
    ? second.getBoundingClientRect().left - first.getBoundingClientRect().left
    : FALLBACK_PITCH_PX;
  if (!(pitch > 0)) return null;

  return { pad, pitch, perPass, period: pitch * perPass };
}

/**
 * The toolkit row's continuous drift, and the arrows that step it.
 *
 * The handoff describes exactly this: "rAF drift on a native scroll container,
 * duplicated set for a seamless loop, with right-aligned prev / next arrows that
 * step one card and pause the drift for 5s".
 *
 * A native scroll container rather than a transform, because the row should
 * still be swipeable — the drift is an invitation, not the only way through.
 * That is also why the loop is a duplicated set and a scroll-position wrap
 * rather than a translate: scrollLeft is a thing a finger can already move, so
 * the two mechanisms do not fight.
 *
 * The arithmetic lives in `carouselDrift.math` because none of it is reachable
 * from a test through this hook: jsdom reports zero for every measurement, and
 * the frame-gap case cannot be staged in a real browser either.
 *
 * Under `prefers-reduced-motion` the drift never starts. The row is still a
 * scroll container and the arrows still work, so nothing becomes unreachable —
 * it simply stops moving on its own.
 */
export function useCarouselDrift(trackRef) {
  const prefersReduced = usePrefersReducedMotion();
  const pausedUntil = useRef(0);

  /** Steps one card and holds the drift, so a tap is not immediately undone. */
  const step = useCallback(
    (direction) => {
      const track = trackRef.current;
      const metrics = track && measure(track);
      if (!metrics) return;

      pausedUntil.current = performance.now() + PAUSE_AFTER_STEP_MS;

      const { hopTo, scrollTo } = stepPlan(
        metrics,
        track.scrollLeft,
        direction
      );
      // Unanimated on purpose: the hop moves between two identical cards, so
      // it must not be seen. It is what lets "next" from the last card move one
      // card right instead of sweeping the whole row back to the start.
      if (hopTo !== undefined) track.scrollLeft = hopTo;
      track.scrollTo({ left: scrollTo, behavior: "smooth" });
    },
    [trackRef]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReduced) return undefined;

    let frame = 0;
    let last = performance.now();
    // The position is accumulated HERE rather than read back from scrollLeft
    // each frame. At 22px/s a frame advances about a third of a pixel, and
    // scrollLeft rounds to whole pixels — so reading it back rounded every
    // increment away and the track never moved at all.
    let position = track.scrollLeft;
    // Measured once rather than per frame: reading layout 60 times a second is
    // a main-thread cost for numbers that only change when the row is resized.
    let metrics = measure(track);
    const remeasure = () => {
      metrics = measure(track);
    };
    const observer = new ResizeObserver(remeasure);
    observer.observe(track);

    const tick = (now) => {
      const elapsed = now - last;
      last = now;
      frame = requestAnimationFrame(tick);
      if (!metrics) {
        remeasure();
        return;
      }
      if (now < pausedUntil.current) {
        // A finger or an arrow may have moved it; take their position back.
        position = track.scrollLeft;
        return;
      }

      position = driftTo(
        metrics,
        position,
        (DRIFT_PX_PER_SECOND * elapsed) / 1000
      );
      track.scrollLeft = position;
    };

    frame = requestAnimationFrame(tick);

    // A finger on the track owns it while it is there.
    const hold = () => {
      pausedUntil.current = performance.now() + PAUSE_AFTER_STEP_MS;
    };
    track.addEventListener("pointerdown", hold, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      track.removeEventListener("pointerdown", hold);
    };
  }, [trackRef, prefersReduced]);

  return { step };
}

export default useCarouselDrift;
