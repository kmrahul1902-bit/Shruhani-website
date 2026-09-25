import Image from "next/image";
import AccentText from "@/components/shared/AccentText";

/**
 * "Five dimensions, evaluated at once" (mockup .fs).
 *
 * Two halves, and the order is the argument: a washed panel naming what each
 * existing check actually verifies — KYC the document, bureau the history,
 * liveness the face — and then the five capabilities that cover what none of
 * them does. The gap is stated before it is filled.
 *
 * Server Component.
 */
export default function Capabilities({
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
    <section className="bg-white py-26">
      <div className="max-threats:px-9 mx-auto max-w-365 px-20">
        <div className="fs-head-wash fs-head-grid border-blue/10 rounded-visual max-flow:p-8 overflow-hidden border px-13 py-12">
          <div>
            <h2 className="text-display-2 tracking-display text-ink max-w-190 text-balance">
              <AccentText
                text={heading}
                phrase={headingAccent}
                className="text-blue"
              />
            </h2>
            <p className="text-body-md text-body mt-5.5 max-w-165 text-pretty">
              {lead}
            </p>
            {punchline && (
              <p className="text-title-3 tracking-heading text-blue mt-5.5 font-bold">
                {punchline}
              </p>
            )}
          </div>

          {/* Each check, and the one thing it verifies. */}
          <ul className="flex flex-col gap-3">
            {gapItems?.map((item) => (
              <li
                key={item.key}
                className="fs-gap-rule border-border-faint shadow-gap-item rounded-panel border bg-white py-4.5 pr-5.5 pl-6.5"
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

        <h3 className="text-title-1 tracking-display text-ink mt-8 font-bold text-balance">
          {cardsHeading}
        </h3>
        <p className="text-body-md text-body mt-3.5 max-w-220 text-pretty">
          {cardsLead}
        </p>

        {/* Six columns for five cards: the mockup spans each across two so the
            last two centre themselves under the first three. */}
        <ul className="fs-cols mt-11">
          {cards?.map((card) => (
            <li key={card.key} className="fs-card">
              {/* The icons are the live site's isometric icon-pack renders,
                  which CLAUDE.md § Art Direction bans outright — wired
                  anyway per an explicit, temporary override for the
                  investor presentation (filled pages over empty boxes);
                  slated for replacement with on-brand art. */}
              {card.image?.src && (
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  width={90}
                  height={90}
                  sizes="90px"
                  className="fs-card-icon"
                />
              )}
              <h4 className="text-body-md tracking-snug text-ink mt-5.5 font-bold text-balance">
                {card.title}
              </h4>
              <ul className="mt-4.5 flex flex-wrap gap-2.5">
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
      </div>
    </section>
  );
}
