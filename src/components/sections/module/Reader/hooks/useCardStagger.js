"use client";

import { useEffect, useState } from "react";
import {
  CARD_EXIT_MS,
  CARD_EXIT_STAGGER_MS,
  REDUCED,
} from "../reader.constants";

/**
 * Sequences the reader's card groups: outgoing cards peel away, then the
 * incoming ones arrive. Two phases rather than a cross-fade — the brief
 * empty frame is what makes the swap legible.
 */
export function useCardStagger({ activeIndex, cardCount, prefersReduced }) {
  const [shown, setShown] = useState(activeIndex);
  const phase = shown === activeIndex ? "in" : "out";

  useEffect(() => {
    if (shown === activeIndex) return undefined;
    const timing = prefersReduced
      ? REDUCED
      : { CARD_EXIT_MS, CARD_EXIT_STAGGER_MS };
    const exitMs =
      timing.CARD_EXIT_MS +
      Math.max(0, cardCount - 1) * timing.CARD_EXIT_STAGGER_MS;
    const timer = setTimeout(() => setShown(activeIndex), exitMs);
    return () => clearTimeout(timer);
  }, [activeIndex, shown, cardCount, prefersReduced]);

  return { shown, phase };
}

export default useCardStagger;
