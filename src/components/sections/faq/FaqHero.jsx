/**
 * FAQ hero — a headline, a line of context, and the wash behind them.
 *
 * The wash is two pieces: a vertical gradient on the section that fades the
 * tinted top into white, and two radial blooms on a `::before`. The section
 * clips them, which is what keeps the right-hand bloom from widening the page.
 */
export default function FaqHero({ hero }) {
  return (
    <section className="faq-hero-wash container-fluid max-nav:px-6 max-faq-row:pt-24 relative overflow-hidden pt-30 pb-18">
      <div className="relative text-center">
        <h1 className="text-display-1 font-display text-ink max-faq-cols:whitespace-normal max-faq-cols:text-balance whitespace-nowrap">
          {hero.h1}
        </h1>
        <p className="text-body-lg text-body max-faq-cols:mx-auto max-faq-cols:max-w-au-faq-sub max-faq-cols:whitespace-normal max-faq-cols:text-pretty max-cards:text-base mt-5.5 whitespace-nowrap">
          {hero.sub}
        </p>
      </div>
    </section>
  );
}
