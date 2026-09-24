import SectionHead from "@/components/sections/module/SectionHead";
import OutputCard from "./OutputCard";

/**
 * "What <Module> Returns" — the consumption tiers. The row's shape follows
 * the card count: three fill the measure in thirds; two become a centred
 * pair with a taller plate.
 */
const THREE_UP = 3;

export default function Outputs({ heading, sub, cards }) {
  const pair = cards.length < THREE_UP;

  return (
    <section className="outputs-section">
      <SectionHead heading={heading} sub={sub} flush />
      <div className={pair ? "outputs-grid-2" : "outputs-grid"}>
        {cards.map(({ key, ...card }, i) => (
          <OutputCard key={key ?? i} {...card} tallIllustration={pair} />
        ))}
      </div>
    </section>
  );
}
