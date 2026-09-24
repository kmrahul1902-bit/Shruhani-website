import Button from "@/components/ui/Button";
import HeroAnimation from "@/components/shared/HeroAnimation";
import UseCases from "./UseCases";

/**
 * Home hero — headline block, the animated intelligence-layer diagram, then
 * the use-case grid (mockup .hero.hero--diagram, lines 4030–4491).
 *
 * Adapted from the reference: `content.hero` uses `heading` in our baked
 * JSON (`home.json`) where the reference component reads `h1` — the actual
 * field name in the CMS export, not a rename. There's no `content.labels`
 * in our content, so the animation's accessible title is a literal string
 * here instead.
 *
 * Server Component. The heading, deck and CTA render on the server; only the
 * diagram and the switcher are client islands, so the page's above-the-fold
 * text costs no JavaScript.
 */
export default function Hero({ content, demoHref, logoStrip }) {
  const { heading, sub, deck, ctaLabel } = content.hero;

  return (
    <section className="container-fluid max-mob:px-5 max-nav:pt-15 max-mob:-mt-16 max-mob:pt-21.5 max-nav:pb-10 relative overflow-x-clip pt-16 pb-15 text-center">
      <div
        aria-hidden="true"
        className="home-hero-wash pointer-events-none absolute inset-0 -z-1"
      />

      <div className="mx-auto max-w-240">
        <h1 className="text-display-2 tracking-display max-mob:text-title-1 text-ink font-bold">
          {heading}
        </h1>
        <p className="text-title-3 max-mob:text-body-md text-body mx-auto mt-2.5 max-w-160 font-semibold">
          {sub}
        </p>
        <p className="text-body-lg max-wide:text-body-md max-nav:text-body-md max-mob:text-body-md text-body tracking-snug mx-auto mt-3.5 max-w-180">
          {deck}
        </p>
        <div className="max-mob:flex-col mt-6 flex justify-center gap-3.5">
          <Button
            href={demoHref}
            size="lg"
            className="max-mob:min-h-12.5 max-mob:w-full"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>

      {/* Mobile hero animation — separate frame so the desktop one is never
          fetched at a width it isn't for. */}
      <div className="mob:hidden -mx-5 pt-1.5 pb-3.5">
        <HeroAnimation
          slug="home-stacked"
          title="Shruhani decision flow"
          className="w-full"
          frame={{ height: 450 }}
        />
      </div>

      <div className="max-mob:hidden">
        <HeroAnimation
          slug="home"
          title="Shruhani decision flow"
          className="home-animation-inset"
        />
      </div>

      {/* The logo strip sits INSIDE the hero, between the animation and the
          cases — .logo-grid-sec is a child of .hero in the handoff, not the
          section after it. */}
      {logoStrip}

      <UseCases items={content.useCases} />
    </section>
  );
}
