"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

// The server can't know the preference; `false` keeps the markup it renders
// stable, and the first client render corrects it before anything animates.
const getServerSnapshot = () => false;

/**
 * Tracks the user's reduced-motion preference.
 *
 * Every animated block in the handoff mockups has a
 * `prefers-reduced-motion: reduce` branch that freezes it in a final, readable
 * state (handoff § Interactions & motion). CSS animations handle that
 * themselves; this hook is for the JS-driven parts — autoplaying carousels,
 * timed animation cycles — which have to opt out in script.
 *
 * `useSyncExternalStore` rather than state + an effect: the value is already
 * correct on the first client render, so a caller can gate timers on it without
 * a round of "start, then immediately cancel".
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default usePrefersReducedMotion;
