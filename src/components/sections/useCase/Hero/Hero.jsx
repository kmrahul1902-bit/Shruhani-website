import Button from "@/components/ui/Button";
import UseCaseStack from "./UseCaseStack";

/**
 * Use-case hero — evidence stack on the left, headline and CTA on the right
 * (mockup .fx-hero / .fx-hero-inner).
 *
 * Same geometry and wash as the industry hero — both sit on institutional blue
 * with no product accent — so `industry-hero-wash` covers this too. The stack
 * is its own component: it shares the frame and scrim, but its column differs
 * and the result panel has no counterpart.
 *
 * The h1's second line is a plain span, not <em>: the mockup uses <em> as a
 * styling hook and overrides font-style, and marking it up as emphasis would
 * announce something a screen reader should not hear.
 *
 * Server Component: the stack is CSS + SMIL.
 */
export default function Hero({ hero, labels, demoHref }) {
  // pt on mobile: hero-under-nav's 72px for the nav, and nothing further. The
  // handoff put the headline another 30px down and the inner box another 40,
  // which stacked to 142px of dead space above the h1 against the industry
  // hero's 94 — the same header, two rhythms. Matched to industry.
  return (
    <section className="hero-under-nav industry-hero-wash max-mob:px-4.5 max-mob:pb-2.5">
      <div
        className={
          hero.stack
            ? "industry-hero-inner max-mob:flex max-mob:flex-col max-mob:gap-6 max-mob:pt-5.5 max-mob:pb-3"
            : "industry-hero-inner-solo max-mob:flex max-mob:flex-col max-mob:gap-6 max-mob:pt-5.5 max-mob:pb-3"
        }
      >
        {hero.stack && (
          <div className="max-threats:justify-center max-mob:order-2 max-mob:min-h-0 flex min-h-140 items-center justify-end">
            <UseCaseStack
              stack={hero.stack}
              photo={hero.visual}
              label={labels.heroRegion}
            />
          </div>
        )}

        <div className="max-mob:order-1 max-mob:text-center">
          <h1 className="text-display-2 tracking-display max-mob:text-title-1 text-ink text-balance">
            {hero.h1}
            {hero.h1Muted && (
              <span className="text-faint block">{hero.h1Muted}</span>
            )}
          </h1>
          <p className="text-body-md max-mob:text-body-md text-body mt-6 max-w-140 text-pretty">
            {hero.deck}
          </p>
          <div className="max-mob:flex-col max-mob:items-stretch max-mob:gap-2.5 mt-8.5 flex flex-wrap items-center gap-6.5">
            <Button
              href={demoHref}
              size="pill"
              className="max-mob:min-h-12 max-mob:w-full max-mob:justify-center"
            >
              {hero.ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
