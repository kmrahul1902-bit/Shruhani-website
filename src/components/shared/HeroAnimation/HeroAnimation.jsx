import { cn } from "@/lib/cn";

/**
 * Phase 3 placeholder for the reference's iframe-based hero/flow animations
 * (each one served from `public/animations/<slug>.html`). Those assets
 * aren't ported yet — that's Phase 7's animation-system pass (see
 * plan/docs/04-components-and-animations.md) — so this reserves the same
 * layout box (`.animation-host`, `globals.css`) the real animation will use,
 * with a static token-colored placeholder instead of the iframe. Callers
 * don't need to change when Phase 7 swaps this for the real thing.
 */
export default function HeroAnimation({ slug, title, className, frame }) {
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
