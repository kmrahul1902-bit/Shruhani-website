"use client";

import { useEffect } from "react";

/**
 * Pauses a hero animation while it is off screen.
 *
 * The bundle asks for this — "wrap each controller in an IntersectionObserver so
 * the sequence begins when the hero is visible and does not burn CPU offscreen"
 * — and none of the seventeen standalones ship one, so it is ours to add.
 *
 * It lives on THIS side of the frame, not in the injected override, because "is
 * this on screen" is a question about the page. An element inside an iframe is
 * always inside the iframe's own viewport, so an observer written in there has
 * nothing useful to answer.
 *
 * `loading="lazy"` on the frame already covers the first half of the rule: a
 * hero the reader never reaches is never fetched. This covers the second half,
 * which lazy loading does not — once a frame has loaded, scrolling away leaves
 * it animating for as long as the page is open.
 *
 * What it reaches: every declarative animation — CSS animations and transitions
 * through getAnimations(), SMIL through pauseAnimations(). That is the
 * compositor work, and the bulk of the cost. What it does not reach: the
 * controllers' own timers and rAF loops, and any animation they start while the
 * hero is off screen. Stopping those needs the hook the README asks the designer
 * to add on rebuild; reaching into their internals from out here would be
 * guesswork against a file we otherwise serve verbatim.
 */
export function useAnimationPausedOffscreen(frameRef) {
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;

    let onScreen = true;

    const setPaused = (paused) => {
      let doc;
      try {
        doc = frame.contentDocument;
      } catch {
        return; // Treated as cross-origin — leave it running.
      }
      if (!doc) return;
      doc
        .getAnimations?.()
        .forEach((animation) =>
          paused ? animation.pause() : animation.play()
        );
      doc.querySelectorAll("svg").forEach((svg) => {
        if (paused) svg.pauseAnimations?.();
        else svg.unpauseAnimations?.();
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      setPaused(!onScreen);
    });
    observer.observe(frame);

    // A frame that loads while off screen starts its animations playing, so the
    // current state has to be re-applied once there is a document to apply it to.
    const applyOnLoad = () => setPaused(!onScreen);
    frame.addEventListener("load", applyOnLoad);

    return () => {
      observer.disconnect();
      frame.removeEventListener("load", applyOnLoad);
      setPaused(false);
    };
  }, [frameRef]);
}

export default useAnimationPausedOffscreen;
