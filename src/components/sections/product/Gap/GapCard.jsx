import Image from "next/image";
import { cn } from "@/lib/cn";
import { SECTION_VARIANT } from "../product.constants";
import {
  CARD_ART,
  INDUSTRY_ART,
  INDUSTRY_FILL,
  INDUSTRY_LIFT,
  SLOT,
} from "./gap.constants";

/**
 * One bento card: a title, a sentence, and the illustration that sits under
 * them.
 *
 * Presentational. The industry pages draw every card from one art treatment
 * while the product pages give each its own, so which treatment applies is
 * decided here from the card's key rather than by the parent passing geometry
 * down — the parent has no business knowing an illustration's intrinsic size.
 */
export default function GapCard({ card, variant, fill, artHeight }) {
  const industry = variant === SECTION_VARIANT.INDUSTRY;
  const art = industry ? INDUSTRY_ART : CARD_ART[card.key];
  const lift = industry ? (INDUSTRY_LIFT[card.key] ?? 0) : 0;

  return (
    <article
      className={cn(
        "border-border-dark-soft rounded-band max-bento:min-h-105 max-flow:min-h-90 relative flex min-h-120 flex-col overflow-hidden border px-7.5 pt-7.5 transition duration-250 hover:-translate-y-0.75",
        industry
          ? cn("hover:border-blue-on-dark/40", INDUSTRY_FILL[card.key] ?? fill)
          : cn("hover:border-accent-bright/40", art?.fill)
      )}
    >
      <h3 className="text-body-lg tracking-snug font-bold text-white">
        {card.title}
      </h3>
      <p className="text-body-sm text-on-dark-muted mt-3">{card.description}</p>

      {/* The slot reserves the illustration's height so the copy above it does
          not reflow as the image loads. */}
      {(industry || art?.slot) && (
        <div
          className={SLOT[variant]}
          style={
            artHeight ? { "--bento-art-height": `${artHeight}px` } : undefined
          }
        />
      )}

      {card.image?.src && art && (
        <Image
          src={card.image.src}
          alt={card.image.alt}
          width={art.intrinsic[0]}
          height={art.intrinsic[1]}
          sizes="300px"
          style={{
            width: art.width,
            height: art.height,
            ...(industry
              ? { bottom: lift, left: 0 }
              : art.top === undefined
                ? { bottom: 20 }
                : { top: art.top }),
          }}
          className={cn(
            "absolute object-contain",
            !industry && "left-1/2 -translate-x-1/2"
          )}
        />
      )}
    </article>
  );
}
