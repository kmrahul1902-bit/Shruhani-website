import Image from "next/image";

/**
 * "Where it applies" on a phone: title, then visual, then body (the reverse
 * of the desktop card, which leads with the artwork).
 */
export default function AppliesMobile({ heading, sub, cards }) {
  return (
    <section className="mx-auto px-4.5 pt-13 pb-15 text-center">
      <h2 className="text-title-2 text-ink text-balance">{heading}</h2>
      {sub && <p className="text-body-sm text-body mt-4">{sub}</p>}

      <ul className="mt-10 flex flex-col gap-7.5">
        {cards.map((card, i) => (
          <li key={card.key ?? i} className="flex flex-col">
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
            <p className="text-body-sm text-muted mt-3.5">{card.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
