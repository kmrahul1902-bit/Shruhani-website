import Image from "next/image";

/**
 * "Three decisions from one call" on a phone (product mobile handoffs).
 *
 * Each card reads title, then visual, then body — the reverse of the desktop
 * card, which leads with the artwork. Centred, with the illustration capped at
 * the design's 280px.
 */
export default function DecisionsMobile({ heading, sub, cards }) {
  return (
    <section className="mx-auto px-4.5 pt-14 pb-16 text-center">
      <h2 className="text-title-2 text-ink text-balance">{heading}</h2>
      <p className="text-body-md text-body mt-5">{sub}</p>

      <ul className="mt-10 flex flex-col gap-7.5">
        {cards.map((card) => (
          <li key={card.key} className="flex flex-col">
            <h3 className="text-body-lg text-ink font-bold">{card.title}</h3>
            {card.image?.src && (
              <Image
                src={card.image.src}
                alt={card.image.alt}
                width={1000}
                height={700}
                sizes="280px"
                className="mx-auto mt-3.5 block h-auto w-full max-w-70 object-contain"
              />
            )}
            <p className="text-body-md text-muted mt-3.5">{card.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
