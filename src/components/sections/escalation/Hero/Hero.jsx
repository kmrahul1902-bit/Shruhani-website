import Button from "@/components/ui/Button";
import HeroAnimation from "@/components/shared/HeroAnimation";

/** The ghosted squares behind the headline — shared with the other two heroes. */
const GHOSTS = [
  { size: 120, top: "8%", left: "30%" },
  { size: 80, top: "62%", left: "4%" },
  { size: 150, top: "70%", left: "24%" },
  { size: 64, top: "18%", left: "2%" },
  { size: 100, top: "40%", left: "40%" },
];

/**
 * Escalation hero — headline over the case-flow scene (mockup .hero-wrap,
 * lines 2789–3146).
 *
 * The headline is the shared `.hero-mega` here (48/800), un-overridden — this
 * page's h1 is two short sentences, so it takes the full size the other two
 * product pages step down from.
 *
 * Adapted from the reference: our baked content's field is `hero.heading`
 * (not `h1`); no `labels` group (no CMS — see plan/CLAUDE.md → Decisions), so
 * the animation region's title is a fixed string. Content itself already
 * displays this product as "EscalationX" (see hero.deck) — kept as-is per
 * the Phase 0 naming decision.
 *
 * Server Component; only the scene is a client island.
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
          <h1 /* No max-width: unlike Cortex's, this page's .hero-mega is
              unconstrained, and the headline is meant to sit on one line. */
            className="text-display-2 tracking-display max-mob:text-title-2 tracking-display text-ink max-mob:mt-4 mx-auto mt-7 text-balance"
          >
            {hero.heading}
          </h1>
          <p className="text-body-lg max-mob:text-body-md text-body max-mob:mt-3.5 mx-auto mt-6.5 max-w-180 text-pretty">
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
            slug="escalation-mobile"
            title="EscalationX case-flow animation"
            className="hero-anim-bleed mob:hidden max-mob:mt-2 max-mob:mb-0 mt-6 mb-7"
          />
          <HeroAnimation
            slug="escalation"
            title="EscalationX case-flow animation"
            className="max-mob:hidden"
          />
        </>
      </div>
    </section>
  );
}
