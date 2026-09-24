import { resolveGlyph } from "@/lib/glyph";
import { ICONS } from "./toolkit.icons";
import { VARIANTS } from "./toolkit.constants";
/**
 * "Everything Cortex returns on every account" — five dark tiles (mockup
 * .tk-sec, lines 3906–3940).
 *
 * A centred flex wrap rather than a 3-column grid, because five items in a
 * grid leave a hole: the design wants three then two, centred, and that is
 * what `flex-wrap` + a one-third basis produces at every column count.
 *
 * Server Component: the hover treatment is pure CSS.
 */
/**
 * Both pages return five things and both lay them out three-then-two, centred
 * — but the mockups reach it differently and tune the tile to their own page.
 * Cortex uses a flex wrap with a one-third basis; ScreenX a 3-column grid with
 * a second, narrower row. The rendered result is the same shape, so this stays
 * one component with the flex mechanism (which is correct at every column
 * count) and a variant for the tuning.
 */

export default function Toolkit({ heading, sub, cards, variant = "cortex" }) {
  const styles = VARIANTS[variant];
  return (
    <section
      className={`bg-dark max-tile:px-5.5 max-tile:py-18 ${styles.section}`}
    >
      <div className={`mx-auto ${styles.wrap}`}>
        <div className={`text-center ${styles.head}`}>
          <h2 className={`text-balance text-white ${styles.heading}`}>
            {heading}
          </h2>
          <p className={`text-body-md mx-auto ${styles.deck}`}>{sub}</p>
        </div>

        <ul className={`flex flex-wrap justify-center ${styles.grid}`}>
          {cards.map((card) => (
            <li
              key={card.key}
              className={`rounded-surface hover:border-accent-on-dark/40 toolkit-tile border border-white/8 bg-white/4 transition duration-200 hover:-translate-y-0.75 hover:bg-white/6 ${styles.tile}`}
            >
              <span className="bg-accent-on-dark/14 text-accent-on-dark rounded-node mb-5.5 flex size-10.5 items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5.5"
                  aria-hidden="true"
                >
                  {resolveGlyph(ICONS, card.icon, "Toolkit")}
                </svg>
              </span>
              <h3 className="text-body-lg tracking-snug font-bold text-white">
                {card.title}
              </h3>
              <p className="text-body-sm mt-2.5 text-white/55">
                {card.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
