"use client";

import { useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";
import { useAnimationFrameHeight } from "./hooks/useAnimationFrameHeight";
import { useAnimationPausedOffscreen } from "./hooks/useAnimationPausedOffscreen";
import { useNearViewport } from "./hooks/useNearViewport";

/**
 * A hero animation, framed from the handoff's own standalone file — ported
 * from the reference verbatim except for the reduced-motion branch below.
 *
 * The bundle ships each as a self-contained `animation.html`, served from
 * `public/animations/<slug>.html` rather than ported into JSX (the
 * reference's own reasoning: porting cost 2,600 lines and three new bugs for
 * decorative content nothing else varies).
 *
 * Adapted: the reference trusts `prefers-reduced-motion` to reach the
 * controller through "the media query inside the frame" — but only 5 of the
 * ~35 ported files actually carry that internal guard (checked by grep
 * during Phase 7's asset port; the rest are older bundles that predate it).
 * Rather than audit and patch embedded JS across 30 files we otherwise serve
 * byte-for-byte, this enforces it at the frame level instead: when reduced
 * motion is preferred, render the same static placeholder Phase 3 used
 * (never mount the iframe at all), for every slug uniformly.
 */
export default function HeroAnimation({ slug, title, className, frame }) {
  const frameRef = useRef(null);
  // Observed on the HOST, not the frame: the host is what reserves the box, so
  // it has a position before anything has loaded into it.
  const hostRef = useRef(null);
  const prefersReduced = usePrefersReducedMotion();

  // A composition whose frame the handoff STATES is not measured: measuring
  // reads the canvas at full size, so a drawing that fits itself came back 662
  // against a specified 264. Where `frame` is given it is the contract.
  useAnimationFrameHeight(frame ? { current: null } : frameRef);
  useAnimationPausedOffscreen(frameRef);
  const near = useNearViewport(hostRef);

  if (prefersReduced) {
    const style =
      frame?.height !== undefined ? { height: frame.height } : { height: 662 };
    return (
      <div className={cn("animation-host", className)}>
        <div
          role="img"
          aria-label={title}
          className="bg-surface-3 border-border-firm rounded-visual flex w-full items-center justify-center border"
          style={style}
        >
          <span className="text-caption text-faint font-mono">{slug}</span>
        </div>
      </div>
    );
  }

  // A composition that does not fit itself is scaled into the host instead, so
  // the iframe keeps its own drawn size and the WRAPPER reserves what that
  // comes to on screen.
  const scaled = frame?.scale
    ? {
        width: frame.width,
        height: frame.height,
        // Two things shrink this frame back to the host BEFORE the scale can
        // run, and both have to go or the drawing is cropped rather than
        // fitted: the host is a flex container, so the frame shrinks to fit
        // it, and preflight puts `max-width: 100%` on every replaced element.
        // The scale is what brings the drawing inside the host; nothing else
        // should be trying to.
        flexShrink: 0,
        maxWidth: "none",
        transform: `scale(${frame.scale})`,
        transformOrigin: "0 0",
      }
    : frame
      ? { height: frame.height }
      : undefined;

  return (
    <div
      ref={hostRef}
      className={cn("animation-host", className)}
      style={
        frame?.wrapperHeight
          ? {
              height: frame.wrapperHeight,
              overflow: "hidden",
              // The host centres its child, and it does that to the frame's
              // UNTRANSFORMED 680px box — which then scales about its own top
              // left, landing ~163px off to the left. A scaled frame is
              // positioned by its origin, so it starts at the host's edge.
              justifyContent: "flex-start",
            }
          : undefined
      }
    >
      <iframe
        ref={frameRef}
        src={near ? `/animations/${slug}.html` : undefined}
        title={title}
        aria-hidden="true"
        tabIndex={-1}
        loading="lazy"
        scrolling="no"
        className="animation-frame"
        style={scaled}
      />
    </div>
  );
}
