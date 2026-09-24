import Image from "next/image";
import { resolveGlyph } from "@/lib/glyph";
import { SCARD_ICONS } from "./split.icons";

/**
 * The dark two-column that frames the problem (mockup .fx-split).
 *
 * Copy on the left over its own near-black, the photograph on the right, and
 * the stat cards floating across the seam between them. The cards are
 * `pointer-events-none` and absolutely placed in the mockup precisely because
 * they overhang the image — they are decoration over the join, not a column of
 * their own.
 *
 * Server Component: static copy and one image.
 */
export default function Split({ heading, paragraphs, cards, image }) {
  return (
    <section className="bg-ink split-grid relative">
      <div className="bg-split-dark max-flow:px-6 max-flow:py-16 flex flex-col justify-center px-20 py-27.5">
        <h2 className="text-display-2 tracking-display max-w-115 text-balance text-white">
          {heading}
        </h2>
        {paragraphs?.map((paragraph) => (
          <p
            key={paragraph}
            className="text-body-md mt-6 max-w-130 text-pretty text-white/62"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="relative min-h-160">
        {image?.src && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 680px) 100vw, 50vw"
            className="object-cover"
          />
        )}
      </div>

      {cards?.length > 0 && (
        <ul className="split-cards pointer-events-none">
          {cards.map((card) => (
            <li key={card.key} className="split-card">
              {resolveGlyph(SCARD_ICONS, card.key, "Split") && (
                <span className="split-card-ic" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {resolveGlyph(SCARD_ICONS, card.key, "Split")}
                  </svg>
                </span>
              )}
              <span className="block flex-1">
                <b className="text-body-md tracking-snug text-ink block font-bold">
                  {card.title}
                </b>
                <span className="text-body-sm text-muted mt-1 block">
                  {card.description}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
