"use client";

import { useEffect, useRef } from "react";

/**
 * Fades a block up 18px as it scrolls into view, once.
 *
 * The About handoff specifies this on nearly every block: `opacity 0` and
 * `translateY(18px)` at rest, 700ms on `cubic-bezier(.16,1,.3,1)`, staggered by
 * `(index % 4) * 70ms`, driven by an IntersectionObserver at threshold 0.12 with
 * a `-8%` bottom root margin.
 *
 * Three things it gets right that a naive version does not:
 *
 * - **Anything already on screen at load is left alone.** The mockup's own
 *   script does this; without it the hero fades in after the page has already
 *   painted, which reads as a slow load rather than as an effect.
 * - **It observes once and disconnects.** Nothing here re-hides on scroll up.
 * - **Reduced motion means no motion, not no content** — the block is simply
 *   visible, and no class is ever added.
 *
 * The hidden state is applied imperatively rather than held in state. It is one
 * class on one element, it is never read back, and rendering it through state
 * would re-render every revealed block on the page twice for no gain. It also
 * means the SERVER renders the finished, visible block: a reader with JS off,
 * and a crawler, get the page whole, and the hidden state only ever exists
 * after the client has decided this block is off screen.
 */
export default function Reveal({
  as: Tag = "div",
  delayIndex = 0,
  className,
  children,
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No observer, or the reader asked for no motion: leave it visible.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    // Already in view on load — visible, and without animating in.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add("au-reveal", "au-reveal-hidden");
    el.style.transitionDelay = `${(delayIndex % 4) * 70}ms`;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            el.classList.remove("au-reveal-hidden");
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delayIndex]);

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  );
}
