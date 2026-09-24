import Image from "next/image";
import AccentText from "@/components/shared/AccentText";
import { cn } from "@/lib/cn";
import CheckIcon from "../Gap/CheckIcon";

/**
 * The gap bento on a phone (product mobile handoffs, "The gap").
 *
 * A separate component rather than responsive classes on the desktop bento,
 * which is the approach this codebase now takes wherever the ARRANGEMENT
 * differs rather than just the type. The desktop card places its illustration
 * absolutely so it can sit beside the copy, sized inline per card; the mobile
 * card puts it in flow, centred below. Expressing both through one element cost
 * three !importants, an inverted cascade, and a regression that rendered the
 * desktop artwork four times too large — none of which this can do, because it
 * never touches the desktop component.
 *
 * Content comes in as props from the same page content the desktop section
 * reads. Nothing is re-authored here: both layouts render and one is hidden, so
 * two copies of a string would be two things to keep in step.
 */
export default function GapMobile({
  heading,
  sub,
  cards,
  statement,
  statementAccent,
  note,
  accent = "text-accent-bright",
}) {
  return (
    <section className="bg-ground px-4.5 py-14">
      <div className="text-center">
        <h2 className="text-title-2 font-bold whitespace-pre-line text-white">
          {heading}
        </h2>
        <p className="text-body-sm text-faint mt-4.5">{sub}</p>
      </div>

      <div className="mt-9 flex flex-col gap-5">
        {cards.map((card) => (
          <article
            key={card.key}
            // The lift and border change are the design's own, and it leaves
            // them unqualified — so on a phone they fire on tap, which is the
            // card's tap feedback. Deliberately NOT gated to pointer devices
            // here: on the desktop bento that gating stops a stuck hover state,
            // but this component only ever renders on a touch screen, where the
            // state IS the interaction.
            className={cn(
              "border-border-dark-soft rounded-band flex flex-col border px-5.5 pt-6 pb-6.5",
              "hover:border-accent-bright/40 transition duration-250 hover:-translate-y-0.75"
            )}
          >
            <h3 className="text-body-lg font-bold text-white">{card.title}</h3>
            <p className="text-body-sm text-on-dark-muted mt-3">
              {card.description}
            </p>
            {card.image?.src && (
              <Image
                src={card.image.src}
                alt={card.image.alt}
                width={900}
                height={720}
                sizes="260px"
                className="mx-auto mt-5 block h-auto w-full max-w-65 object-contain"
              />
            )}
          </article>
        ))}
      </div>

      {statement && (
        <p className="text-body-lg text-on-dark-soft mt-9 text-center font-bold">
          <AccentText
            text={statement}
            phrase={statementAccent}
            className={cn("font-bold", accent)}
          />
        </p>
      )}
      {note && (
        <span className="text-caption tracking-note text-muted mt-5 flex items-center justify-center gap-2.5 text-center font-semibold">
          <CheckIcon className={accent} />
          {note}
        </span>
      )}
    </section>
  );
}
