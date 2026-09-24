import Image from "next/image";
import { SECTION } from "./investors.constants";

/** One angel's card — portrait, name, role. */
function AngelCard({ angel }) {
  return (
    <li className="border-ip-card rounded-card hover:shadow-ip-lift border bg-white px-6 py-7 text-center transition duration-180 hover:-translate-y-0.75">
      <span className="bg-au-avatar rounded-ip-pic relative mx-auto mb-4 block size-21 overflow-hidden">
        {angel.image?.src && (
          <Image
            src={angel.image.src}
            alt={angel.image.alt}
            fill
            sizes="84px"
            /* `object-top` is the handoff's `object-position: top center` —
               these are cropped headshots, and centring takes the head off. */
            className="object-cover object-top"
          />
        )}
      </span>
      <b className="text-body-md tracking-snug text-ink block font-bold">
        {angel.name}
      </b>
      <span className="text-body-sm text-muted mt-1.5 block">{angel.role}</span>
    </li>
  );
}

/**
 * Investors — the lead investor's card beside a stack of two, then the angels.
 *
 * The lead card is wider (1.55fr against 1fr) because it carries the quotation;
 * the side column holds the institutional investor and the round's facts.
 *
 * TODO(verify): investor/partner names throughout this page (guardrail #2
 * item 4) — Cedar Hill Capital, Smile Group, and the angel roster. Carried
 * over as written. `investors.lead.quote` is preserved verbatim as the
 * investor's own published words, not rewritten to say "Shruhani."
 */
export default function Investors({ investors }) {
  return (
    <section className={SECTION}>
      <div className="max-flow:flex-col max-flow:items-start max-flow:gap-4.5 mb-11 flex items-end justify-between gap-10">
        <h2 className="text-title-1 tracking-heading font-display text-ink text-balance">
          {investors.h2Before}
          <strong className="font-extrabold">{investors.h2Accent}</strong>
          {investors.h2After}
        </h2>
        <p className="text-body-md text-body max-w-105">{investors.lede}</p>
      </div>

      <div className="grid-cols-ip-inv max-bento:grid-cols-1 grid gap-6">
        <article className="border-ip-card rounded-ip-card shadow-ip-card flex flex-col gap-6.5 border bg-white px-10 pt-9 pb-10">
          <p className="bg-ip-chip text-eyebrow tracking-label text-blue rounded-pill self-start px-3.5 py-1.5 uppercase">
            {investors.lead.tag}
          </p>
          <span className="relative block h-18 w-65 max-w-full">
            {investors.lead.image?.src && (
              <Image
                src={investors.lead.image.src}
                alt={investors.lead.image.alt}
                fill
                sizes="260px"
                className="object-contain object-left"
              />
            )}
          </span>
          <div>
            <p className="text-title-3 tracking-heading font-display text-ink font-bold">
              {investors.lead.name}
            </p>
            <p className="text-body-md text-body mt-3 max-w-150 text-pretty">
              {investors.lead.description}
            </p>
          </div>
          {/* The quotation marks are drawn here, in blue, rather than stored
              with the quote: they are the design's punctuation, not the
              speaker's. A <q> would let the browser choose them instead. */}
          <blockquote className="border-ip-card border-t pt-6.5">
            <p className="text-body-lg tracking-snug font-display text-ink ip-quoted font-semibold text-pretty">
              {investors.lead.quote}
            </p>
            <footer className="text-body-sm text-muted mt-4 font-semibold">
              {investors.lead.attribution}
            </footer>
          </blockquote>
        </article>

        <div className="grid content-start gap-6">
          <article className="border-ip-card rounded-ip-card shadow-ip-card flex flex-col gap-4.5 border bg-white px-8 py-7.5">
            <p className="bg-ip-chip-alt text-eyebrow tracking-label text-body rounded-pill self-start px-3.5 py-1.5 uppercase">
              {investors.institutional.tag}
            </p>
            <span className="relative block h-18 w-65 max-w-full">
              {investors.institutional.image?.src && (
                <Image
                  src={investors.institutional.image.src}
                  alt={investors.institutional.image.alt}
                  fill
                  sizes="260px"
                  className="object-contain object-left"
                />
              )}
            </span>
            <div>
              <p className="text-title-3 tracking-heading font-display text-ink font-bold">
                {investors.institutional.name}
              </p>
              <p className="text-body-md text-body mt-2.5 text-pretty">
                {investors.institutional.description}
              </p>
            </div>
          </article>

          <dl className="border-ip-card rounded-ip-card shadow-ip-card border bg-white px-8 py-7.5">
            {investors.facts.map((fact) => (
              /* Dashed rules, and the last row drops its own — the design's
                 way of saying these are a spec sheet rather than a list.
                 The baked content names this field `heading`, not `label`. */
              <div
                key={fact.heading}
                className="border-ip-dash text-body-md flex justify-between gap-5 border-b border-dashed py-3.5 last:border-b-0 last:pb-0"
              >
                <dt className="text-muted">{fact.heading}</dt>
                <dd className="text-ink font-bold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* A label with a rule running off to the right, not a heading with a
          border: the line is the rest of the row's width. */}
      <div className="mt-16 mb-5.5 flex items-center gap-4">
        <h3 className="text-body-sm tracking-label text-muted font-bold uppercase">
          {investors.angelsHeading}
        </h3>
        <span aria-hidden="true" className="bg-ip-rule h-px flex-1" />
      </div>
      <ul className="max-bento:grid-cols-2 max-flow:grid-cols-1 grid grid-cols-4 gap-4">
        {investors.angels.map((angel) => (
          <AngelCard key={angel.name} angel={angel} />
        ))}
      </ul>
    </section>
  );
}
