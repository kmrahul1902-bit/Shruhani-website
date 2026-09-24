import Reveal from "@/components/shared/Reveal";
import { INNER } from "./about.constants";

/**
 * Mission — the page's opening statement and the metric strip that closes it.
 *
 * The two radial washes are drawn on a `::before` (the `au-hero-wash` utility)
 * rather than as a background on the section itself: the metric strip sits over
 * them and the section clips them, which is what keeps the second wash from
 * bleeding past the right edge at narrow widths.
 *
 * Server Component — the reveal is the only client part, and it wraps.
 */
export default function Hero({ hero }) {
  return (
    <section className="au-hero-wash max-bento:px-11 max-flow:px-5.5 max-flow:pt-23 relative overflow-hidden px-20 pt-22.5">
      <div className={`relative text-center ${INNER}`}>
        <Reveal
          as="h1"
          className="text-display-2 font-display text-ink max-w-au-h1 mx-auto mt-6 font-semibold text-balance"
        >
          {hero.h1Before}
          <span className="text-blue font-extrabold">{hero.h1Accent}</span>
          {hero.h1After}
        </Reveal>
        <Reveal
          as="p"
          delayIndex={1}
          className="text-body-md text-body mx-auto mt-6 max-w-180 text-pretty"
        >
          {hero.sub}
        </Reveal>
      </div>

      {/* The strip is a sibling of the text column, not a child: it spans the
          full 1240px where the copy is centred inside it. */}
      <Reveal
        delayIndex={2}
        className={`border-au-hair-metric max-bento:grid-cols-2 max-flow:grid-cols-1 relative mt-16 grid grid-cols-4 border-t ${INNER}`}
      >
        {hero.metrics.map((metric) => (
          <div
            key={metric.label}
            /* Every cell carries a left hairline and the first drops it, which
               is what leaves the strip open at both ends. At two columns the
               first cell keeps its rule — the handoff turns it back on there,
               because the second row's first cell needs it. */
            className="border-au-hair max-bento:px-6 max-bento:first:border-l border-l px-7.5 pt-6.5 pb-7.5 text-center first:border-l-0"
          >
            <b className="text-title-1 tracking-heading font-display text-ink block font-bold">
              {metric.value}
            </b>
            <span className="text-body-sm text-muted mt-2.5 block font-medium">
              {metric.label}
            </span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
