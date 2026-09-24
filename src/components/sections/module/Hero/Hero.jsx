import AccentText from "@/components/shared/AccentText";
import Button from "@/components/ui/Button";

/**
 * The module hero: headline, sub, one CTA, and the module's own animation.
 * Shared by all six module pages.
 *
 * Adapted from the reference: baked content has `hero.heading`/`hero.sub`,
 * not the reference's `hero.h1`/`hero.h1Accent` split — no field in our
 * content names an accent phrase, so `AccentText` renders plain text (it
 * degrades gracefully when `phrase` is empty/undefined).
 */
export default function Hero({ hero, demoHref, children }) {
  return (
    <section className="hero-under-nav module-hero-wash">
      <div className="module-hero-inner">
        <div className="module-hero-copy">
          <h1 className="module-hero-h1">
            <AccentText
              text={hero.heading}
              phrase={hero.h1Accent}
              className="font-extrabold"
            />
          </h1>
          <p className="module-hero-sub">{hero.sub}</p>
          <div className="module-hero-actions">
            <Button href={demoHref} size="lg">
              {hero.ctaLabel}
            </Button>
          </div>
        </div>

        {children && <div className="module-hero-animation">{children}</div>}
      </div>
    </section>
  );
}
