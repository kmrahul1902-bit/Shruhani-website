import Image from "next/image";
import AccentText from "@/components/shared/AccentText";
import CheckIcon from "@/components/sections/product/Gap/CheckIcon";

/**
 * "The gap" on a phone (industry mobile handoff, `.gap`).
 *
 * The desktop bento pins each card's illustration with inline top/left/width so
 * it sits behind the copy. None of that survives one column, so the handoff
 * pulls the artwork back into flow under the copy and drops the grid to a
 * single column.
 *
 * A separate component from the product pages' dark bento: that one centres its
 * cards and carries a statement and a note in a different order, and expressing
 * both through one component would take a variant per difference.
 *
 * Server Component.
 */
export default function GapMobile({
  heading,
  sub,
  cards,
  statement,
  statementAccent,
  note,
}) {
  return (
    <section className="bg-ground pt-13 pb-14">
      <div className="px-4.5">
        <h2 className="text-title-3 tracking-heading font-bold text-white">
          {heading}
        </h2>
        <p className="text-body-sm text-on-dark-muted mt-4">{sub}</p>
      </div>

      <div className="mt-8 flex flex-col gap-3.5 px-4.5">
        {(cards ?? []).map((card) => (
          <article
            key={card.key}
            // The lift and border change are the design's own, and it leaves
            // them unqualified — so on a phone they fire on tap, which is the
            // card's tap feedback. Deliberately NOT gated to pointer devices:
            // this component only ever renders on a touch screen, where the
            // state IS the interaction.
            className="border-border-dark-soft rounded-surface hover:border-blue-edge/40 border px-5 pt-5.5 pb-5 transition duration-250 hover:-translate-y-0.75"
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
                sizes="300px"
                className="mx-auto mt-5 block h-auto w-full max-w-75 object-contain"
              />
            )}
          </article>
        ))}
      </div>

      {statement && (
        <p className="text-body-lg text-on-dark-soft mt-8 px-4.5 font-bold">
          {/* Institutional blue (now pink), not a per-product accent: every
              industry mockup runs on the default, which is why these pages
              carry no data-accent. */}
          <AccentText
            text={statement}
            phrase={statementAccent}
            className="text-blue font-bold"
          />
        </p>
      )}

      {note && (
        <span className="text-caption tracking-note text-muted mt-5 flex items-center gap-2.5 px-4.5 font-semibold">
          <CheckIcon className="text-blue" />
          {note}
        </span>
      )}
    </section>
  );
}
