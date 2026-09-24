"use client";

import { useEffect, useState } from "react";

/**
 * Which heading the reader is currently in, for the TOC's active state.
 *
 * An IntersectionObserver over the heading anchors, not scroll maths — scroll
 * maths has to be re-run on every resize, every image that loads late and
 * every font swap, where the observer simply fires again.
 */
export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!ids.length) return undefined;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return undefined;

    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const first = ids.find((id) => visible.has(id));
        if (first) setActiveId(first);
      },
      { rootMargin: "-110px 0px -65% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
