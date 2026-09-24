import { cn } from "@/lib/cn";
import { MARQUEE_SPEEDS, DEFAULT_MARQUEE_SPEED } from "./marquee.constants";

/**
 * A row that scrolls its contents continuously, right to left.
 *
 * The mechanism is the handoff's: the track holds the item set TWICE and
 * translates to -50%, so the second copy is exactly where the first was when the
 * loop restarts and there is no jump. That only holds if half the track is one
 * exact pass, which is why the track carries a trailing gap — without it the
 * last item sits flush against the first of the second set and the seam shows.
 *
 * The duplicate is `aria-hidden`: it is the same content twice, and a screen
 * reader announcing every logo twice is worse than not announcing the effect at
 * all. The real set keeps its accessible name from `label`.
 *
 * Motion stops under `prefers-reduced-motion` (the utility handles it), leaving
 * a legible static row rather than an empty one.
 */
export default function Marquee({
  children,
  label,
  speed = DEFAULT_MARQUEE_SPEED,
  className,
}) {
  return (
    <div className={cn("marquee", className)} role="group" aria-label={label}>
      <div className={cn("marquee-track", MARQUEE_SPEEDS[speed])}>
        {children}
        <div className="contents" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
