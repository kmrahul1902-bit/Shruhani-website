import Image from "next/image";

/**
 * "Four threats that only appear after approval" (mockup .decisions, lines
 * 3944–3986).
 *
 * Each card's artwork is left-aligned and pulled back by a share of the column
 * (see the `threat-art-bleed` utility): the PNGs carry their own left margin,
 * so aligning the files' edges would leave the drawn content visibly indented
 * from the title beneath it.
 *
 * Server Component.
 */
/**
 * Cortex answers four questions and ScreenX three, so the grid and the width
 * it sits in differ — four narrow columns against three wider ones — and each
 * page's artwork carries a different amount of its own left margin, which is
 * what the two bleed values correct for.
 */
const VARIANTS = {
  cortex: {
    section: "max-w-330",
    grid: "max-threats:mx-auto max-threats:max-w-155 max-threats:grid-cols-2 max-threats:gap-9 max-mid:grid-cols-1 grid-cols-4 gap-7",
    art: "threat-art-bleed",
  },
  screenx: {
    section: "max-w-310",
    grid: "max-threats:mx-auto max-threats:max-w-115 max-threats:grid-cols-1 max-threats:gap-11 grid-cols-3 gap-9",
    art: "threat-art-bleed-sm",
  },
};

export default function Threats({ heading, sub, cards, variant = "cortex" }) {
  const styles = VARIANTS[variant];
  return (
    <section
      className={`max-threats:px-9 max-threats:pt-18 max-threats:pb-22 max-tile:px-5.5 max-tile:pt-14 max-tile:pb-16 mx-auto px-20 pt-27.5 pb-30 ${styles.section}`}
    >
      <div className="mx-auto mb-16 max-w-190 text-center">
        <h2 className="text-display-2 tracking-display text-ink font-semibold text-balance">
          {heading}
        </h2>
        <p className="text-body-md text-body mx-auto mt-5 max-w-150">{sub}</p>
      </div>

      <ul className={`grid ${styles.grid}`}>
        {cards.map((card) => (
          <li key={card.key} className="flex flex-col">
            <div className="rounded-card flex items-center justify-start overflow-hidden">
              {card.image?.src && (
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  width={718}
                  height={503}
                  sizes="(max-width: 980px) 45vw, 320px"
                  className={`h-auto w-full max-w-80 object-contain ${styles.art}`}
                />
              )}
            </div>
            <h3 className="text-title-3 text-ink mt-6.5 font-bold">
              {card.title}
            </h3>
            <p className="text-body-md text-muted mt-2.5">{card.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
