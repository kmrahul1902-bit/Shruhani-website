import Image from "next/image";
import { SECTION_VARIANT } from "../product.constants";

/**
 * "What Cortex watches on every session" — the three signal layers (mockup
 * .persona-sec, lines 3861–3885).
 *
 * A list, not a grid of divs: these are the three modalities named in the copy
 * above them, so the markup carries that relationship for a screen reader
 * rather than leaving it to the visual grouping.
 *
 * Server Component.
 */
/**
 * Cortex and ScreenX pull their heading up into the section above; Escalation
 * does not, and paints its card border violet rather than blue.
 *
 * TODO(content): none of the three product pages' `personaLayers.cards[].image`
 * fields are wired. The live site's CDN candidates for this section (and for
 * `gap.cards[].image`, `howItWorks.steps[].image`/`.visual`, and
 * `threats.cards[].image` on all three pages — see matching notes on
 * `GapCard.jsx`, `HowItWorks.jsx`, `Threats.jsx`) are isometric/3D icon-pack
 * renders in blue and purple, both banned outright by CLAUDE.md § Art
 * Direction ("Isometric / flat clipart from icon packs", "3D podium renders,
 * glow rims, floating device composites") — recoloring wouldn't fix the
 * imagery problem, only the palette. Left unwired rather than wiring content
 * that violates the design system.
 */
const VARIANTS = {
  product: { top: "-mt-10 mb-10", border: "layer-card-border" },
  escalation: { top: "mb-10", border: "layer-card-border-violet" },
};

export default function SignalLayers({
  heading,
  sub,
  cards,
  variant = SECTION_VARIANT.PRODUCT,
}) {
  const styles = VARIANTS[variant];
  return (
    <section className="max-xs:px-5 max-xs:py-16 bg-white px-10 pt-10 pb-27.5">
      <div className="mx-auto max-w-300">
        {/* The pull-up and the gap below belong to this wrapper, not the
            heading — the mockup's .persona-top carries them so the h2 keeps
            zero margins and stays swappable. */}
        <div
          className={`flex flex-col items-center gap-6 text-center ${styles.top}`}
        >
          {/* whitespace-pre-line: ScreenX's heading carries an explicit break
              (the design's, not a wrap that happens to land there), stored as
              "\n" in the content module — the same convention the home page's
              panel headings use. */}
          <h2 className="text-display-2 tracking-display text-footer-heading font-semibold whitespace-pre-line">
            {heading}
          </h2>
        </div>
        <div className="mb-14 text-center">
          {sub.map((paragraph) => (
            <p
              key={paragraph}
              className="text-body-md text-slate-muted mx-auto mb-3.5 max-w-240"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <ul className="max-logos:grid-cols-2 max-xs:grid-cols-1 mx-auto grid max-w-240 grid-cols-3 gap-4.5">
          {cards.map((card) => (
            <li
              key={card.key}
              className={`rounded-node ${styles.border} shadow-layer hover:shadow-layer-hover flex items-center gap-4 px-4.5 py-3 transition duration-200 hover:-translate-y-0.5`}
            >
              {card.image?.src && (
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  width={1254}
                  height={1254}
                  sizes="56px"
                  className="size-14 shrink-0 object-contain"
                />
              )}
              <h3 className="text-body-md tracking-snug font-bold text-black">
                {card.title}
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
