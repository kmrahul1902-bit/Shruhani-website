import Reveal from "@/components/shared/Reveal";
import { cn } from "@/lib/cn";
import { SECTION } from "./about.constants";

/**
 * Our journey — five milestones on a ruled timeline.
 *
 * The rule is each column's own top border rather than one line behind them, so
 * it breaks correctly when the grid rewraps: at three columns and at one, every
 * row gets its own rule instead of a single line stranded at the top.
 *
 * The dot sits ON that rule (`-top-1.5`, half its 11px height), with a 3px white
 * ring punching it out of the line. The active one takes a second, wider ring in
 * blue at 13%.
 */
export default function Journey({ journey }) {
  return (
    <section className={SECTION}>
      <Reveal
        as="h2"
        className="text-display-2 tracking-display font-display text-ink mt-4.5"
      >
        {journey.h2FirstLine}
        <br />
        {journey.h2SecondLine}
      </Reveal>

      <ol className="max-bento:grid-cols-3 max-bento:gap-y-6.5 max-flow:grid-cols-1 mt-15 grid grid-cols-5 pt-2.5">
        {journey.milestones.map((milestone, index) => (
          <Reveal
            as="li"
            key={milestone.year}
            delayIndex={index}
            className={cn(
              "border-au-hair-time au-dot-mark max-bento:pr-6.5 relative border-t pt-8.5 pr-7.5 pb-1.5 last:pr-0",
              milestone.now && "au-dot-mark-now"
            )}
          >
            <p className="text-title-3 tracking-display font-display text-faint flex items-baseline gap-2.5 font-bold">
              <span className={milestone.now ? "text-blue" : undefined}>
                {milestone.year}
              </span>
              {milestone.now && (
                <span className="text-eyebrow tracking-label bg-blue rounded-pill px-2 py-1 text-white uppercase">
                  {journey.nowLabel}
                </span>
              )}
            </p>
            <div className="mt-4.5">
              <b className="text-body-md tracking-snug font-display text-ink block font-bold">
                {milestone.title}
              </b>
              <p className="text-body-md text-body mt-2.5">
                {milestone.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
