import Image from "next/image";
import AccentText from "@/components/shared/AccentText";
import { cn } from "@/lib/cn";
import { SECTION_VARIANT } from "../product.constants";
import CheckIcon from "./CheckIcon";
import GapCard from "./GapCard";

/**
 * "The gap" — dark bento naming the four threats that only exist after
 * onboarding (mockup .gapx, lines 3591–3637).
 *
 * Six grid children across two rows of three: the title cell, four threat
 * cards, and the closing statement. The title and statement are cells with no
 * box of their own, which is what gives the block its bento rhythm.
 *
 * Server Component: the only interaction is a CSS hover lift.
 */
export default function Gap({
  heading,
  sub,
  image,
  statement,
  statementAccent,
  note,
  cards,
  variant = SECTION_VARIANT.CORTEX,
  fill = "bg-ground",
  artHeight,
  artClassName,
}) {
  const industry = variant === SECTION_VARIANT.INDUSTRY;
  /**
   * The module pages state the gap as one antithesis beside an illustration
   * rather than as a row of cards — same dark bento, same title cell, but the
   * second cell is a picture. A variant rather than a second component: the
   * section, its ground, its padding and its heading treatment are identical,
   * and only what fills the rest of the grid differs.
   */
  const isModule = variant === SECTION_VARIANT.MODULE;
  return (
    <section className="bg-ground max-bento:py-20 max-flow:py-15 pt-26 pb-27">
      <div className="max-bento:px-9 max-flow:px-5.5 mx-auto max-w-330 px-20">
        <div
          className={
            isModule
              ? "gap-module-grid max-flow:grid-cols-1 grid gap-5"
              : "max-bento:grid-cols-2 max-flow:grid-cols-1 grid grid-cols-3 gap-5"
          }
        >
          <div className="flex flex-col justify-center px-1 py-2">
            {/* whitespace-pre-line renders the design's own line break, which
                puts the two halves of the antithesis on their own lines. */}
            <h2
              className={
                isModule
                  ? "gap-module-title"
                  : "text-title-1 tracking-display font-bold text-balance whitespace-pre-line text-white"
              }
            >
              {heading}
            </h2>
            <p
              className={cn(
                "text-faint mt-4.5",
                isModule ? "gap-module-deck" : "text-body-md"
              )}
            >
              {sub}
            </p>
          </div>

          {isModule && image?.src && (
            <div className="max-flow:ml-0 ml-10 flex items-center justify-center">
              {/* `artClassName` REPLACES the default sizing, rather than being
                  appended to it: both set width and max-width, and two
                  utilities in the same layer are settled by Tailwind's emission
                  order, not by class order. See gap-module-art-bleed. */}
              <Image
                src={image.src}
                alt={image.alt}
                width={920}
                height={720}
                sizes="500px"
                className={
                  artClassName || "h-auto w-full max-w-115 object-contain"
                }
              />
            </div>
          )}

          {(cards ?? []).map((card) => (
            <GapCard
              key={card.key}
              card={card}
              variant={variant}
              fill={fill}
              artHeight={artHeight}
            />
          ))}

          {/* The closing cell is optional. The module pages state the gap as a
              title beside an illustration and pass neither of these, and this
              rendered regardless — an empty paragraph and a tick with no text
              beside it, in a design that has no tick at all. Each part is gated
              on its own content so a statement without a note does not bring a
              bare icon with it. */}
          {(statement || note) && (
            <div className="flex flex-col justify-center px-1 py-2">
              {statement && (
                <p className="text-title-3 text-on-dark-soft font-bold">
                  <AccentText
                    text={statement}
                    phrase={statementAccent}
                    className={`font-bold ${industry ? "text-blue" : "text-accent-bright"}`}
                  />
                </p>
              )}
              {note && (
                <span className="text-caption tracking-note text-muted mt-5 inline-flex items-center gap-2.5 font-semibold">
                  <CheckIcon
                    className={industry ? "text-blue" : "text-accent-bright"}
                  />
                  {note}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
