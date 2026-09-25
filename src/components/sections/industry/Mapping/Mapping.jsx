import Image from "next/image";
import AccentText from "@/components/shared/AccentText";

/**
 * Each suite card is washed in its own product colour. These identify a
 * PRODUCT, not the page, so they are the fixed suite identities rather than an
 * accent — the same three colours on all four industry pages.
 */
const SUITE_TONE = {
  screenx: "suite-screenx",
  cortex: "suite-cortex",
  escalation: "suite-escalation",
};

/**
 * "One platform across onboarding, monitoring and financial-crime operations"
 * — the three suites mapped onto this industry's lifecycle (mockup
 * .bk-carousel).
 *
 * Despite the mockup's class name it is a three-column grid, not a scroller:
 * the three suites are read together as one lifecycle, so nothing is hidden
 * off-screen. Each card carries a stage label ("At the gate") above its name.
 *
 * Server Component.
 */
export default function Mapping({ heading, sub, note, noteAccent, cards }) {
  return (
    <section className="max-threats:px-9 max-threats:pb-20 mx-auto max-w-320 px-20 pt-8 pb-28">
      <h2 className="text-display-2 text-footer-heading mb-2 max-w-225 text-balance">
        {heading}
      </h2>
      <p className="text-body-md text-slate-muted mb-12">{sub}</p>

      <ul className="max-threats:grid-cols-1 mt-11 grid grid-cols-3 gap-6">
        {cards.map((card) => (
          <li
            key={card.key}
            className={`border-border-cool rounded-band suite-wash hover:shadow-suite relative flex min-h-120 flex-col overflow-hidden border p-7.5 transition duration-250 hover:-translate-y-0.75 ${
              SUITE_TONE[card.key] ?? SUITE_TONE.screenx
            }`}
          >
            <span className="text-suite-stage">{card.stage}</span>
            {/* the mockup puts the 6px on the head row, not the heading */}
            <div className="mt-1.5">
              <h3 className="text-title-3 text-ink font-bold">{card.title}</h3>
            </div>
            <p className="text-body-sm text-muted mt-2.5">{card.description}</p>
            {/* TODO(content): the live site's ScreenX/Cortex/Escalation
                suite illustrations (cdn.sign3.in/.../suite_*.png) exist but
                are blue and off-token — see the matching TODO in
                Decisions.jsx for why they're not wired here either. */}
            {card.image?.src && (
              <div className="mt-auto flex items-end justify-center pt-4.5">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  width={900}
                  height={700}
                  sizes="300px"
                  className="suite-illus block h-auto w-full max-w-75"
                />
              </div>
            )}
          </li>
        ))}
      </ul>

      {note && (
        <p className="text-body-md text-muted mx-auto mt-6.5 max-w-190 text-center">
          <AccentText
            text={note}
            phrase={noteAccent}
            className="text-ink font-bold"
          />
        </p>
      )}
    </section>
  );
}
