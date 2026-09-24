import Image from "next/image";
import { SECTION_VARIANT } from "../product.constants";

/**
 * The persona layers on a phone (product mobile handoffs, mockup
 * .persona-sec).
 *
 * Rebuilt against the rendered design rather than its written spec, which
 * described the type but not the card. Each module is a ROW — a 56px glyph and
 * the module's name, nothing else. The content model agrees: these cards carry
 * a title and an image and no description at all, so the stacked card with a
 * 280px illustration this first shipped as was showing artwork the design never
 * asks for and copy that does not exist.
 *
 * The card treatment is the desktop section's, unchanged: the same 11px radius,
 * the same shadow, and `layer-card-border` — the 3px gradient rim, which is a
 * utility rather than a border because the gradient has to paint the border box
 * while a flat white fill covers the padding box. Only the frame around it is
 * different here. The design keeps the row and drops the desktop grid to one
 * column, so what changes at 390px is the section's padding, the column gap and
 * the type sizes — not the card.
 *
 * `sub` is an array: the design sets this section's introduction as two
 * paragraphs, and the content module stores it that way.
 */
/**
 * Escalation paints the card rim violet where ScreenX and Cortex paint it
 * blue, and starts the section a full 56px down where they pull their heading
 * up into the section above and start it at 16 — the same two splits the
 * desktop section already makes, on the same two utilities.
 */
const VARIANTS = {
  [SECTION_VARIANT.PRODUCT]: { border: "layer-card-border", top: "pt-4" },
  [SECTION_VARIANT.ESCALATION]: {
    border: "layer-card-border-violet",
    top: "pt-14",
  },
};

export default function PersonaMobile({
  heading,
  sub,
  cards,
  variant = SECTION_VARIANT.PRODUCT,
}) {
  const styles = VARIANTS[variant];

  return (
    <section className={`px-4.5 pb-15 text-center ${styles.top}`}>
      <h2 className="text-title-2 tracking-display text-footer-heading mb-10 whitespace-pre-line">
        {heading}
      </h2>

      {/* The gap below this block is 56px, and the last paragraph's own 14px
          margin collapses into it — the mockup's arrangement, and the desktop
          section's, so the two stay comparable. */}
      <div className="mb-14">
        {sub.map((paragraph) => (
          <p key={paragraph} className="text-body-sm text-slate-muted mb-3.5">
            {paragraph}
          </p>
        ))}
      </div>

      <ul className="flex flex-col gap-3.5">
        {cards.map((card) => (
          <li
            key={card.key}
            className={`rounded-node ${styles.border} shadow-layer hover:shadow-layer-hover flex items-center gap-4 px-4.5 py-3 text-left transition duration-200 hover:-translate-y-0.5`}
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
    </section>
  );
}
