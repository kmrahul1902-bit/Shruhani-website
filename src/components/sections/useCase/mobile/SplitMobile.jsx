import Image from "next/image";
import { resolveGlyph } from "@/lib/glyph";
import { SCARD_ICONS } from "../Split/split.icons";

/**
 * The split section on a phone (use-case mobile handoff, ".fx-split").
 *
 * The desktop version is a two-column band: copy on the dark left half, a photo
 * on the right, and the four cards positioned absolutely over the photo. None
 * of that survives one column — "over the photo, to the right of the copy" has
 * no meaning at 390px.
 *
 * So the handoff re-cuts it: headline and opening paragraph, then the photo
 * becomes a full-bleed STAGE that carries the four cards, then the remaining
 * paragraphs. The cards keep 40px of photograph each side so it reads as a
 * background rather than a border, and the stage carries a scrim (see the
 * `split-stage` utility) because white cards over an arbitrary photo are
 * otherwise unreadable.
 *
 * The copy is centred and the cards' own text is left-aligned: they are
 * icon-plus-text rows, not prose.
 *
 * Server Component — nothing here is interactive.
 */
export default function SplitMobile({
  heading,
  paragraphs = [],
  cards,
  image,
}) {
  const [lede, ...rest] = paragraphs;

  return (
    <section className="bg-ink pt-11 pb-12 text-center">
      <h2 className="text-title-2 mb-4.5 px-4.5 font-bold text-pretty text-white">
        {heading}
      </h2>
      {lede && (
        <p className="text-body-md mb-4.5 px-4.5 text-white/62">{lede}</p>
      )}

      {image?.src && (
        <div className="split-stage my-6.5 mb-7 px-10 pt-8 pb-9">
          {/* The photograph is the stage's background rather than an <img>, so
              the cards can sit on it without a positioning context of their
              own. next/image still serves it, sized for the one width this
              layout ever renders at. */}
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="390px"
            className="z-0 object-cover"
          />
          {cards?.length > 0 && (
            <ul className="relative z-2 flex flex-col gap-2.5">
              {cards.map((card) => (
                <li
                  key={card.key}
                  className="rounded-scard-mob shadow-scard-mob flex gap-3 bg-white p-4 text-left"
                >
                  {resolveGlyph(SCARD_ICONS, card.key, "SplitMobile") && (
                    <span className="text-accent shrink-0" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {resolveGlyph(SCARD_ICONS, card.key, "SplitMobile")}
                      </svg>
                    </span>
                  )}
                  <span className="block flex-1">
                    <b className="text-body-sm text-ink block font-bold">
                      {card.title}
                    </b>
                    <span className="text-caption text-muted mt-1 block">
                      {card.description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {rest.map((paragraph) => (
        <p
          key={paragraph}
          className="text-body-md mb-4.5 px-4.5 text-white/62 last:mb-0"
        >
          {paragraph}
        </p>
      ))}
    </section>
  );
}
