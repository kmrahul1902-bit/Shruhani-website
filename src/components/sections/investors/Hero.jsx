/**
 * Hero — the headline, its one line of context, and the funding stat strip.
 *
 * The wash is a vertical gradient that starts tinted and is fully white by 48%
 * of the section's height, so the hero fades into the page rather than ending
 * on an edge.
 */
export default function Hero({ hero }) {
  return (
    <section className="ip-hero-wash">
      <div className="max-flow:px-5.5 max-flow:pt-12 max-flow:pb-10 mx-auto max-w-310 px-12 pt-18 pb-16 text-center">
        <h1 className="text-display-2 tracking-display font-display text-ink mx-auto max-w-215 font-semibold text-balance">
          {hero.h1Before}
          <strong className="font-extrabold">{hero.h1Accent}</strong>
          {hero.h1After}
        </h1>
        <p className="text-body-md text-body mx-auto mt-5.5 max-w-165 text-pretty">
          {hero.sub}
        </p>

        {/* Ruled top and bottom, with a hairline between cells — the same
            open-ended strip the About page's metrics use. */}
        <dl className="border-ip-rule max-flow:flex-wrap mx-auto mt-14 flex max-w-225 justify-center border-y">
          {hero.stats.map((stat) => (
            <div
              key={stat.label}
              className="border-ip-hair max-flow:basis-1/2 max-flow:border-l-0 flex-1 border-l px-5 py-6.5 text-center first:border-l-0"
            >
              <dd className="text-title-2 tracking-heading font-display text-ink font-bold">
                {stat.value}
              </dd>
              <dt className="text-eyebrow tracking-note text-muted mt-1.5 font-semibold uppercase">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
