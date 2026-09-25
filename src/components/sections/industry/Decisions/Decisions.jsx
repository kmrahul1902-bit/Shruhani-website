import Image from "next/image";
import AccentText from "@/components/shared/AccentText";

/**
 * One illustrated decision card. The artwork bleeds to the card's top edge —
 * the negative margins pull it out of the padding the copy sits in — so the
 * illustration reads as the card's lid rather than as a picture inside it.
 *
 * `h-full` is what keeps the row's cards the same height. Their <li>s already
 * stretch to the tallest (flex-1 on a flex row), but a card only as tall as its
 * own copy left the short ones floating inside a full-height item — 388 against
 * 409 on banks-sfbs, 409 against 451 on fintechs-neobanks, differing per page
 * because it tracks how many lines each description wraps to. Equalising the
 * items was never the problem; filling them is.
 */
function DecisionCard({ card }) {
  return (
    <article className="border-card-hairline rounded-visual flex h-full flex-col overflow-hidden border bg-white px-5 pt-4.5 pb-5.5">
      <div className="-mx-5 -mt-4.5 flex items-center justify-center overflow-hidden bg-white">
        {/* The illustrations are the live site's isometric/3D-render art,
            which CLAUDE.md § Art Direction bans outright — wired anyway per
            an explicit, temporary override for the investor presentation
            (filled pages over empty boxes); slated for replacement with
            on-brand art. */}
        {card.image?.src && (
          <Image
            src={card.image.src}
            alt={card.image.alt}
            width={880}
            height={560}
            sizes="(max-width: 980px) 90vw, 420px"
            className="block h-auto w-full object-contain"
          />
        )}
      </div>
      <h3 className="text-body-lg tracking-snug text-ink mt-4.5 font-bold">
        {card.title}
      </h3>
      <p className="text-body-sm text-muted mt-2.5 text-pretty">
        {card.description}
      </p>
    </article>
  );
}

/**
 * "The decisions it sharpens" — the four decisions this industry's risk team
 * owns (mockup .bk-sec > .bk-bento).
 *
 * The layout is the point: the first card sits beside the copy, and the other
 * three run underneath as a row. The mockup builds it from grid areas
 * ("img copy" / "list list") so the copy can sit optically centred against the
 * tall first card, which a plain two-column grid would not do.
 *
 * Server Component.
 */
export default function Decisions({
  heading,
  sub,
  statement,
  statementAccent,
  cards,
}) {
  const [lead, ...rest] = cards;

  return (
    <section className="max-threats:px-9 max-threats:py-20 max-mob:px-4.5 max-mob:pt-13 max-mob:pb-14 mx-auto max-w-320 px-20 py-28">
      <div className="decisions-bento">
        <div className="decisions-lead min-h-85">
          <DecisionCard card={lead} />
        </div>

        <div className="decisions-copy self-center">
          <h2 className="text-title-1 tracking-display max-mob:text-title-2 text-ink text-balance">
            {heading}
          </h2>
          <p className="text-body-md text-body mt-4 max-w-165 text-pretty">
            {sub}
          </p>
          <p className="text-body-lg tracking-snug text-ink mt-6 font-bold text-balance">
            <AccentText
              text={statement}
              phrase={statementAccent}
              className="text-blue font-bold"
            />
          </p>
        </div>

        <ul className="decisions-row max-threats:flex-col flex gap-4.5">
          {rest.map((card) => (
            <li key={card.key} className="min-w-0 flex-1">
              <DecisionCard card={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
