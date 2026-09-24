"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { BAR_SCROLL_OFFSET_PX, STACK_BREAKPOINT_PX } from "../reader.constants";

/**
 * Drives the module reader: which of the clusters is showing, chosen by
 * OVERLAP with the sticky frame rather than a scroll threshold, ties broken
 * by centre distance.
 */
export function useSlideReader(count) {
  const [index, setIndex] = useState(0);
  const frameRef = useRef(null);
  const blockRefs = useRef([]);
  const prefersReduced = usePrefersReducedMotion();

  const registerBlock = useCallback((i) => {
    return (el) => {
      blockRefs.current[i] = el;
    };
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;

    let frame_ = 0;

    const pick = () => {
      frame_ = 0;
      if (window.innerWidth <= STACK_BREAKPOINT_PX) return;
      const box = frame.getBoundingClientRect();
      if (box.height === 0) return;

      const centre = (box.top + box.bottom) / 2;
      let best = -1;
      let bestOverlap = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      blockRefs.current.forEach((block, i) => {
        if (!block) return;
        const rect = block.getBoundingClientRect();
        const overlap =
          Math.min(rect.bottom, box.bottom) - Math.max(rect.top, box.top);
        const distance = Math.abs((rect.top + rect.bottom) / 2 - centre);
        if (overlap > bestOverlap + 1) {
          bestOverlap = overlap;
          best = i;
          bestDistance = distance;
        } else if (
          Math.abs(overlap - bestOverlap) <= 1 &&
          distance < bestDistance
        ) {
          best = i;
          bestDistance = distance;
        }
      });

      if (best >= 0) setIndex(best);
    };

    const onScroll = () => {
      if (!frame_) frame_ = requestAnimationFrame(pick);
    };

    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame_) cancelAnimationFrame(frame_);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  const goTo = useCallback(
    (i) => {
      const block = blockRefs.current[i];
      if (!block) return;
      window.scrollTo({
        top:
          block.getBoundingClientRect().top +
          window.scrollY -
          BAR_SCROLL_OFFSET_PX,
        behavior: prefersReduced ? "instant" : "smooth",
      });
    },
    [prefersReduced]
  );

  return { index, goTo, frameRef, registerBlock };
}

export default useSlideReader;
