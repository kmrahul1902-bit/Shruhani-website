import FaqList from "./FaqList";

/**
 * The FAQ body — a sticky aside on the left, the accordion on the right.
 *
 * The aside sticks at 104px and goes static below 1000px, which is the design's
 * rule: once the two columns stack, a sticky aside would pin the heading over
 * the answers it introduces.
 */
export default function FaqSection({ list }) {
  return (
    <section className="grid-cols-faq gap-faq container-fluid max-faq-cols:grid-cols-1 max-faq-cols:gap-11 max-nav:px-6 grid pt-6 pb-30">
      <aside className="max-faq-cols:static sticky top-26">
        <h2 className="text-title-2 tracking-heading font-display text-ink font-bold">
          {list.h2}
        </h2>
        <p className="text-body-md text-body mt-3.5">{list.sub}</p>
        <a
          href={`mailto:${list.mailTo}`}
          className="text-body-md text-blue hover:text-blue-hover focus-ring transition-gap-color mt-5 inline-flex items-center gap-2 font-semibold hover:gap-3"
        >
          {list.mailTo} <span aria-hidden="true">&rarr;</span>
        </a>
        <span className="border-faq-rule text-body-sm text-muted mt-6.5 block border-t pt-5 font-semibold">
          {`${list.items.length} ${list.countNoun}`}
        </span>
      </aside>
      <FaqList items={list.items} />
    </section>
  );
}
