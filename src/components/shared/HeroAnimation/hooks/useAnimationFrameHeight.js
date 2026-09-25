"use client";

import { useEffect, useRef } from "react";

/**
 * How long to keep watching the artwork, how often to look, and how far back to
 * count what we saw.
 *
 * The animations run a 14s cycle (ANIMATION-SPEC), and their deepest moment is
 * somewhere inside it — the home hero paints 74px below its own layout box only
 * part-way through. Measuring once on load reserves too little and clips;
 * measuring forever resizes the frame on every tick.
 *
 * The maximum is taken over a TRAILING WINDOW of one cycle rather than over all
 * time, which is what separates the two kinds of tall moment:
 *
 *  - A deep frame of the animation is PERIODIC. It recurs every cycle, so it
 *    lands inside every window of one cycle and is never lost.
 *  - The pre-fit layout is a ONE-OFF. The scale-to-fit animations (location,
 *    device) size their wrapper from JS, and until that runs the wrapper is
 *    auto-height — the full unscaled composition. Location's is 739px against
 *    the 306px it settles at on mobile, so an all-time high-water mark latched
 *    794px onto a 416px document and left a ~380px hole under the hero.
 *
 * Two cycles of watching, so a one-off has time to age out of the window and a
 * periodic peak has time to recur inside it.
 */
const CYCLE_MS = 14_000;
const SETTLE_MS = CYCLE_MS * 2 + 2_000;
const SAMPLE_EVERY_MS = 500;

/**
 * Sizes a hero-animation iframe to the height its content actually occupies.
 *
 * The animations fit THEMSELVES — each scales its own stage against its host —
 * so the frame gets the full width and no transform; scaling it too
 * double-scales the artwork. Height is all that is left to set, and an iframe
 * has no idea how tall its document is.
 *
 * Same-origin, so the document is readable directly. Still guarded: a frame that
 * has not loaded, or that a browser treats as cross-origin, must leave the
 * reserved height alone rather than throw.
 */
export function useAnimationFrameHeight(frameRef) {
  const samples = useRef([]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;

    /**
     * The painted extent of the artwork, and how far it spills past its own
     * layout box.
     *
     * Both obvious answers are wrong: `scrollHeight` reports the UNSCALED
     * artboard, over-reserving by hundreds of pixels, and the root element's
     * rect under-reserves — the home animation's captions paint ~20px below
     * their row and were cropped off.
     *
     * So take the furthest bottom edge any descendant paints at, clamped to any
     * clipping ancestor (a marquee inside a window must not count its whole
     * strip), and keep the largest seen in the last cycle. The extent moves as
     * the animation runs, so a windowed maximum settles instead of resizing on
     * every tick — and forgets a pre-fit transient that never comes back.
     *
     * The spill is published as `--animation-overflow` so a host can take it out
     * of its own bottom padding, keeping the host's total height fixed while the
     * frame grows into it.
     */
    const measure = () => {
      let doc;
      try {
        doc = frame.contentDocument;
      } catch {
        return; // Treated as cross-origin — keep whatever height is set.
      }
      if (!doc?.body) return;
      const root = [...doc.body.children].find(
        (el) => !["STYLE", "SCRIPT", "LINK"].includes(el.tagName)
      );
      if (!root) return;

      const layoutBottom = root.getBoundingClientRect().bottom;

      /**
       * How far down this element can actually paint.
       *
       * An element inside a clipped container never shows below it, so its own
       * rect is the wrong answer: ScreenX's marquee and Escalation's track are
       * long strips that translate through a window, and their boxes reach
       * hundreds of pixels past anything visible. Taking them at face value
       * reserved 180px and 230px of dead space under those two heroes.
       */
      const paintedBottom = (el) => {
        let limit = Infinity;
        for (let node = el.parentElement; node; node = node.parentElement) {
          const style = getComputedStyle(node);
          if (/hidden|clip|auto|scroll/.test(style.overflowY)) {
            limit = Math.min(limit, node.getBoundingClientRect().bottom);
          }
          if (node === root) break;
        }
        return Math.min(el.getBoundingClientRect().bottom, limit);
      };

      let bottom = layoutBottom;
      for (const el of root.querySelectorAll("*")) {
        const rect = el.getBoundingClientRect();
        // Cheap rejections first, and they reject nearly everything: only an
        // element that already reaches past the deepest point can move it. This
        // ordering matters — getComputedStyle forces style resolution, and the
        // hook samples every 500ms across a subtree of hundreds of elements, so
        // calling it per element was tens of thousands of resolutions during
        // load. Now it runs only for the handful of genuine candidates.
        if (rect.width <= 0 || rect.height <= 0) continue;
        if (rect.bottom <= bottom) continue;
        // Fixed elements resolve against the frame's own viewport, so they
        // would pin the height to it and grow it on every measure.
        if (getComputedStyle(el).position === "fixed") continue;
        const visible = paintedBottom(el);
        if (visible > bottom) bottom = visible;
      }

      const measured = Math.ceil(bottom);
      if (measured <= 0) return;

      // Keep one cycle of history and reserve the deepest point in it.
      const now = performance.now();
      const kept = samples.current.filter((s) => now - s.at <= CYCLE_MS);
      kept.push({ at: now, value: measured });
      samples.current = kept;
      const height = kept.reduce((max, s) => Math.max(max, s.value), 0);

      frame.style.height = `${height}px`;
      frame.parentElement?.style.setProperty(
        "--animation-overflow",
        `${Math.max(0, height - Math.ceil(layoutBottom))}px`
      );
    };

    // The animations scale on their own resize handler, so re-measure after
    // theirs has run rather than racing it.
    const remeasure = () => requestAnimationFrame(measure);

    measure();
    frame.addEventListener("load", remeasure);
    const observer = new ResizeObserver(remeasure);
    observer.observe(frame);

    // Watch it through two cycles so the windowed maximum is the real periodic
    // maximum, then leave it alone.
    const sampler = setInterval(measure, SAMPLE_EVERY_MS);
    const settled = setTimeout(() => clearInterval(sampler), SETTLE_MS);

    return () => {
      frame.removeEventListener("load", remeasure);
      observer.disconnect();
      clearInterval(sampler);
      clearTimeout(settled);
    };
  }, [frameRef]);
}

export default useAnimationFrameHeight;
