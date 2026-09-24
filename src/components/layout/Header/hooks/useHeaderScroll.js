"use client";

import { useEffect, useState } from "react";

/**
 * Where the reader is on the page, as the header needs to know it.
 *
 * Two thresholds, one listener. They were two `useState`s and a `useEffect`
 * inside Header, which is three hooks of scroll plumbing sitting above markup
 * that only wants two booleans.
 *
 * The thresholds differ on purpose: the bar takes its scrolled treatment almost
 * immediately, while the CTA waits until the hero's own button has gone by, so
 * the two are never on screen together.
 */
const SCROLLED_AFTER_PX = 8;
const CTA_APPEARS_AFTER_PX = 100;

export function useHeaderScroll() {
  const [state, setState] = useState({ scrolled: false, showCta: false });

  useEffect(() => {
    const onScroll = () =>
      setState({
        scrolled: window.scrollY > SCROLLED_AFTER_PX,
        showCta: window.scrollY > CTA_APPEARS_AFTER_PX,
      });
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
}

export default useHeaderScroll;
