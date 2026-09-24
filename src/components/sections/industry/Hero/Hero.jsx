import Button from "@/components/ui/Button";
import HeroAnimation from "@/components/shared/HeroAnimation";

/**
 * Industry hero — headline + CTA, with a decorative visual on the right.
 *
 * Adapted from the reference: the baked content has no `hero.identity` /
 * `hero.signals` / `hero.visual` (that's live customer-account data from
 * the CMS, absent from the export snapshot) and no `hero.eyebrow` /
 * `hero.sub` either — so the reference's interactive `EvidenceStack`
 * (a customer-identity card + animated signal rows) isn't ported here.
 * Both the mobile AND desktop visual slots use the same `HeroAnimation`
 * static placeholder every other Hero in this project already uses for
 * its currently-missing Phase 7 motion assets, so the page isn't left
 * with an empty column. Also: `hero.heading`, not `hero.h1` (the baked
 * JSON's actual field name).
 *
 * Server Component.
 */
export default function Hero({ hero, labels, demoHref, animationSlug }) {
  return (
    <section className="hero-under-nav industry-hero-wash">
      <div className="industry-hero-inner max-mob:flex max-mob:flex-col max-mob:gap-6.5 max-mob:px-4.5 max-mob:pt-5.5 max-mob:pb-11">
        {/* Below 620px: the mobile-frame placeholder, same as desktop. */}
        <HeroAnimation
          slug={`${animationSlug}-mobile`}
          title={labels?.heroRegion}
          className="mob:hidden max-mob:order-2 w-full"
          frame={{ height: 371 }}
        />

        <div className="max-threats:justify-center max-mob:hidden flex min-h-140 items-center justify-end">
          <HeroAnimation
            slug={animationSlug}
            title={labels?.heroRegion}
            className="w-full"
          />
        </div>

        <div className="max-mob:order-1 max-mob:text-center">
          {hero.eyebrow && <p className="eyebrow mb-4.5">{hero.eyebrow}</p>}
          <h1 className="text-display-2 tracking-display max-mob:text-title-2 tracking-heading text-ink text-balance">
            {hero.sub ? (
              /* The claim holds one line by design, but only at `desktop` —
                 see --breakpoint-desktop in globals.css. Only NBFCs' content
                 sets `hero.sub` in the reference; ours doesn't, so this
                 branch is unreached today but kept for when it is. */
              <>
                <span className="text-blue-headline desktop:whitespace-nowrap block">
                  {hero.heading}
                </span>
                <span className="text-body-lg tracking-display mt-5.5 block font-medium">
                  {hero.sub}
                </span>
              </>
            ) : (
              hero.heading
            )}
          </h1>
          <p className="text-body-md max-mob:text-body-md text-body max-mob:mt-4 mt-6 max-w-140 text-pretty">
            {hero.deck}
          </p>
          <div className="max-mob:mt-6 max-mob:flex-col max-mob:items-stretch max-mob:gap-2.5 mt-8.5 flex flex-wrap items-center gap-6.5">
            <Button href={demoHref} size="pill">
              {hero.ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
