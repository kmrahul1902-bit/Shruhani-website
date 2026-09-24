import Image from "next/image";
import AccentText from "@/components/shared/AccentText";

/**
 * The capability section on a phone (use-case mobile handoff, the ".fs"
 * section).
 *
 * Two things the desktop layout does are wrong at 390px and are undone here:
 *
 * Three gutters were stacking — the section's own 18px, the inner block's 24px
 * and the head's 52px — which left the copy 201px wide inside a 390px screen.
 * The inner gutter is dropped and the head's cut back, giving the copy 313px.
 *
 * And the capability card stacked a 90px icon ABOVE its title, which spent most
 * of the card's height on artwork. The handoff puts the icon and title on one
 * row at 46px with the chips beneath, so the card is a row of meaning rather
 * than a column of picture. Expressed as flex rather than the mockup's
 * grid-template-areas: with one icon, one title and one chip row the areas buy
 * nothing that a row and a stack do not.
 *
 * Server Component.
 */
export default function CapabilitiesMobile({
  heading,
  headingAccent,
  lead,
  punchline,
  gapItems,
  cardsHeading,
  cardsLead,
  cards,
}) {
  return (
    <section className="bg-white px-4.5 pt-11 pb-12">
      <div className="fs-head-wash border-blue/10 rounded-visual overflow-hidden border px-5 pt-6.5 pb-7">
        <h2 className="text-title-2 text-ink font-bold text-balance">
          <AccentText
            text={heading}
            phrase={headingAccent}
            className="text-blue"
          />
        </h2>
        <p className="text-body-md text-body mt-5.5 text-pretty">{lead}</p>
        {punchline && (
          <p className="text-body-md text-blue mt-5.5 font-bold">{punchline}</p>
        )}

        <ul className="mt-6 flex flex-col gap-3">
          {gapItems?.map((item) => (
            <li
              key={item.key}
              className="fs-gap-rule border-border-faint shadow-gap-item rounded-panel border bg-white py-3.5 pr-4 pl-4.5"
            >
              <b className="text-body-sm tracking-snug text-ink block font-bold">
                {item.title}
              </b>
              <span className="text-body-sm text-muted mt-1.5 block">
                {item.description}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* The source sets this heading `white-space: nowrap` inline at 32px,
          which runs straight off the side of a phone. It wraps here, at 24. */}
      <h3 className="text-title-3 text-ink mt-6 font-bold text-balance">
        {cardsHeading}
      </h3>
      <p className="text-body-md text-body mt-3.5 text-pretty">{cardsLead}</p>

      <ul className="mt-6 flex flex-col gap-3">
        {cards?.map((card) => (
          <li key={card.key} className="fs-card py-3.5 pr-4 pl-4.5">
            <div className="flex items-center gap-3">
              {card.image?.src && (
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  width={184}
                  height={184}
                  sizes="46px"
                  className="size-11.5 shrink-0 object-contain"
                />
              )}
              <h4 className="text-body-md text-ink font-bold">{card.title}</h4>
            </div>
            <ul className="mt-2.5 flex flex-wrap gap-2.5">
              {card.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="text-eyebrow text-body border-fs-chip-border bg-scard-fill rounded-tile-sm border px-3 py-2 font-semibold"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
