import Button from "@/components/ui/Button";
import HeroAnimation from "@/components/shared/HeroAnimation";

/**
 * The ghosted squares drifting behind the headline (mockup .hero-ghost, lines
 * 3053–3057). Percentages so they hold their composition as the hero widens;
 * sizes in px because they are artwork, not a scale.
 */
const GHOSTS = [
  { size: 120, top: "8%", left: "30%" },
  { size: 80, top: "62%", left: "4%" },
  { size: 150, top: "70%", left: "24%" },
  { size: 64, top: "18%", left: "2%" },
  { size: 100, top: "40%", left: "40%" },
];

/**
 * Cortex hero — centred headline over the live session monitor (mockup
 * .hero-wrap / .hero-card).
 *
 * The wash is the shared `hero-wash` utility, which reads the accent tokens, so
 * the page's `data-accent="cortex"` is what makes it emerald.
 *
 * Adapted from the reference: our baked content's field is `hero.heading`
 * (not `h1`); no `labels` group (no CMS — see plan/CLAUDE.md → Decisions), so
 * the animation region's title is a fixed string.
 *
 * Server Component: the monitor is the handoff's standalone animation, framed
 * rather than ported — see shared/HeroAnimation.
 */
export default function Hero({ hero, demoHref }) {
  return (
    <section className="hero-wash hero-under-nav relative w-full overflow-hidden">
      {/* The mobile handoff gives this card its own box: 26px/18px/46px and a
          26px rhythm, against the desktop 40/10/72 and 48. */}
      <div className="max-nav:px-6 max-mob:gap-6.5 max-mob:px-4.5 max-mob:pt-6.5 max-mob:pb-11.5 relative mx-auto flex max-w-370 flex-col items-center gap-12 px-10 pt-10 pb-18 text-center">
        {/* Hidden on mobile. These are decorative white squares placed at
            desktop pixel offsets; at 390 they land on top of the hero
            animation and read as a white strip across it — which is exactly
            what they were reported as. The design keeps them at desktop, where
            there is room for them to sit behind the headline instead. */}
        <div
          aria-hidden="true"
          className="max-mob:hidden pointer-events-none absolute inset-0 z-0"
        >
          {GHOSTS.map((ghost) => (
            <span
              key={`${ghost.top}-${ghost.left}`}
              className="absolute rounded-sm bg-white/45"
              style={{
                width: ghost.size,
                height: ghost.size,
                top: ghost.top,
                left: ghost.left,
              }}
            />
          ))}
        </div>

        <div className="relative z-1">
          <h1 className="text-display-2 tracking-display max-mob:text-title-2 tracking-display text-ink max-mob:mt-4 mx-auto mt-7 max-w-225 text-balance">
            {hero.heading}
          </h1>
          <p className="text-body-lg max-mob:text-body-md text-body max-mob:mt-3.5 mx-auto mt-6 max-w-180 text-pretty">
            {hero.deck}
          </p>
          {/* Full width on mobile: the hero's action is the page's primary
              one, and on a phone it should be the width of the thumb's
              reach rather than of its label. */}
          <div className="max-mob:mt-6 max-mob:flex-col max-mob:items-stretch mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Button
              href={demoHref}
              size="hero"
              className="max-mob:w-full max-mob:justify-center"
            >
              {hero.ctaLabel}
            </Button>
          </div>
        </div>

        <>
          {/* The square sequence below 620px. Two frames rather than one that
              swaps its source: a hidden lazy iframe is never fetched, so only
              one loads at any width. Both are Phase 3's static placeholder —
              real motion is Phase 7. */}
          <HeroAnimation
            slug="cortex-mobile"
            title="Cortex session monitor"
            className="hero-anim-bleed mob:hidden max-mob:mt-2 max-mob:mb-0 mt-6 mb-7"
          />
          <HeroAnimation
            slug="cortex"
            title="Cortex session monitor"
            className="max-mob:hidden"
          />
        </>
      </div>
    </section>
  );
}
