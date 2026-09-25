"use client";

import { useEffect, useState } from "react";

/**
 * How far ahead of the viewport a frame starts loading.
 *
 * Generous on purpose. The point is not to save the last kilobyte, it is to
 * stop nine animation documents materialising at once on first paint; a frame
 * that begins a screen early is still loaded before the reader arrives, and a
 * frame that begins exactly on the boundary arrives visibly late.
 */
const ROOT_MARGIN = "1200px 0px";

/**
 * Whether `ref` has come close enough to the viewport to be worth loading.
 *
 * `loading="lazy"` was supposed to do this and does not: the home page carries
 * nine animation frames, and measured with no scrolling at all it still
 * materialised 9.65MB of script — the browser's own lazy threshold is
 * generous enough that most of them counted as "near". Three of those frames
 * each build a ~3MB copy of Babel to compile their JSX in the browser, so the
 * cost is parse and execute on the main thread, not bytes over the wire.
 *
 * Latches on: once a frame has loaded it stays loaded. Unsetting the src to
 * reclaim memory would restart the animation from frame zero every time the
 * reader scrolled past, which is worse than the memory.
 *
 * Falls back to loading immediately where there is no observer, so nothing
 * depends on JavaScript to appear at all.
 */
export function useNearViewport(ref) {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // No observer (jsdom, or a browser older than the browserslist targets):
    // load it. Deferred by a tick rather than set here, because setting state
    // synchronously in an effect body cascades renders — and seeding it from
    // useState instead would render a src on the server that the client would
    // not, which is a hydration mismatch on the one attribute that matters.
    if (typeof IntersectionObserver === "undefined") {
      const id = setTimeout(() => setNear(true), 0);
      return () => clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        observer.disconnect();
      },
      { rootMargin: ROOT_MARGIN }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return near;
}
