/**
 * Become a partner — the page's closing block, on the dark ground.
 *
 * This is the page's own CTA rather than the shared footer one: the footer CTA
 * asks for a demo, and a platform reading this page is not the demo audience.
 * The shared CTA still follows it, which the design shows too.
 */
export default function PartnerCta({ cta }) {
  return (
    <section className="bg-ground text-white">
      <div className="grid-cols-ip-cta max-bento:grid-cols-1 max-flow:px-5.5 max-flow:pt-16 max-flow:pb-18 mx-auto grid max-w-330 items-center gap-16 px-12 pt-24 pb-26">
        <div>
          <h2 className="text-display-2 tracking-display font-display text-balance">
            {cta.h2}
          </h2>
          <p className="text-body-lg mt-5 max-w-115 text-white/62">{cta.sub}</p>
        </div>

        <ul className="max-flow:grid-cols-1 grid grid-cols-2 gap-3.5">
          {cta.types.map((type) => (
            <li
              key={type.title}
              className="border-ip-tile rounded-ip-type border bg-white/3 px-5.5 py-5"
            >
              <b className="text-body-md tracking-snug block font-bold">
                {type.title}
              </b>
              <span className="text-body-sm mt-1.5 block text-white/52">
                {type.description}
              </span>
            </li>
          ))}
          {/* Spans both columns and sits below the four tiles: it is the action
              they lead to, not a fifth kind of partnership. */}
          <li className="max-flow:col-span-1 col-span-full mt-1.5">
            {/* Label and address sit on one row until 680px and stack below
                it. Held side by side on a phone, "WRITE TO US" breaks to two
                lines and the arrow drops under the address — the design has no
                rule for this row, and at 375 it needs one. */}
            <a
              href={`mailto:${cta.mailTo}`}
              className="rounded-ip-type text-body-md text-ink focus-ring max-flow:flex-col max-flow:items-start max-flow:gap-1.5 flex items-center justify-between gap-5 bg-white px-5.5 py-4.5 font-bold transition duration-180 hover:-translate-y-0.5"
            >
              <span className="text-eyebrow tracking-label text-muted font-semibold uppercase">
                {cta.mailLabel}
              </span>
              <span className="whitespace-nowrap">
                {cta.mailTo} <span aria-hidden="true">&rarr;</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
