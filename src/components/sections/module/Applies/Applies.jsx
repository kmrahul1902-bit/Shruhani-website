import AppliesCard from "./AppliesCard";

/** Below this the design switches to the narrower, centred three-up measure. */
const FOUR_UP = 4;

/**
 * "Where It Applies" — the deployments. The row's shape follows the card
 * count: four fill the section's measure; three narrow to a centred row.
 */
export default function Applies({ heading, sub, cards, visual }) {
  return (
    <section className="applies-section">
      <div className="applies-head">
        <h2 className="applies-h">{heading}</h2>
        {sub && <p className="applies-sub">{sub}</p>}
      </div>
      <div
        className={cards.length >= FOUR_UP ? "applies-grid" : "applies-grid-3"}
      >
        {cards.map(({ key, ...card }, i) => (
          <AppliesCard key={key ?? i} {...card} visual={visual} />
        ))}
      </div>
    </section>
  );
}
