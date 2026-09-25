import Image from "next/image";
import LogoGrid from "@/components/sections/LogoGrid";
import ContactForm from "@/components/sections/contact/Form";
import PageSchema from "@/components/shared/PageSchema";
import { getContent } from "@/lib/content";
import { contactHref } from "@/lib/contact-href";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata() {
  const { seo } = getContent("contact");
  return buildMetadata({
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    path: "/book-a-demo",
  });
}

/**
 * The meta rows' icons, keyed by row. Inline SVG because they are three
 * small glyphs used once. Rendered white on the glass card, matching the
 * reference's own inline stroke override.
 *
 * Adapted from the reference: `office.meta[]` in the baked content has no
 * `.key` (no CMS — see plan/CLAUDE.md → Decisions), so the page assigns one
 * by position — hours, phone, general — matching this icon set's own order,
 * which is the order `office.meta` is authored in.
 */
const META_ROW_KEYS = ["hours", "phone", "general"];

const META_ICONS = {
  hours: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6.1 6.1l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  general: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
      <path d="m3.8 7 8.2 5.6L20.2 7" />
    </>
  ),
};

const MetaIcon = ({ row }) => (
  <span className="hqmap-mico" aria-hidden="true">
    <svg
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="none"
      stroke="#fff"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {META_ICONS[row]}
    </svg>
  </span>
);

/**
 * Quote mark and tick, inline because they are punctuation, not iconography.
 * Adapted: the reference's quote mark was a raw blue hex (`#1D4ED8`) — this
 * project's brand is pink (Phase 1), so it reads `var(--color-blue)` instead
 * (the same AA-safe fill token every other "blue" role in this codebase now
 * resolves to).
 */
const QuoteMark = () => (
  <svg
    width="18"
    height="16"
    viewBox="0 0 20 16"
    fill="var(--color-blue)"
    aria-hidden="true"
    className="mt-1"
  >
    <path d="M0 16V9.2C0 4.3 2.6 1 7.2 0l.9 2.2C5.6 3.1 4.3 4.7 4.2 7H7.6V16H0Zm11.4 0V9.2c0-4.9 2.6-8.2 7.2-9.2l.9 2.2c-2.5.9-3.8 2.5-3.9 4.8h3.4V16h-7.6Z" />
  </svg>
);

const Tick = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="bg-green-bright mt-px box-border h-5 w-5 rounded-full p-1"
    fill="none"
    stroke="#fff"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 13l4 4L19 7" />
  </svg>
);

/**
 * Contact / book a demo.
 *
 * Section order is the reference's: a hero that is only a photograph and a
 * headline (no photo asset exists in this project, so the hero renders as a
 * plain wash — see the `Image` guard below), a panel holding the form beside
 * the proof column, the client roster, three addresses, and the head office
 * on a map.
 *
 * A Server Component but for the form, which owns its own submit state.
 */
export default function ContactPage() {
  const content = getContent("contact");
  const { hero, proof, routes, form, office } = content;
  const labels = { formRegion: form.heading };
  const meta = office.meta.map((row, i) => ({ ...row, key: META_ROW_KEYS[i] }));
  // Adapted: the baked content's `form.checks` is one newline-delimited
  // string (the export's shape for what should be a list — see the same
  // pattern in ModulePage.jsx/useCase.adapter.js), not an array.
  // TODO(verify): one of these three lines is a certification claim
  // ("ISO 27001:2022, DPDP and GDPR compliant") — guardrail #2 item 2,
  // confirm it's reissued under the Shruhani entity before this ships.
  const checks = (form.checks ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <>
      <PageSchema path="/book-a-demo" seo={content.seo} />
      <section className="hero-under-nav relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {hero.visual?.src && (
            <Image
              src={hero.visual.src}
              alt=""
              fill
              sizes="100vw"
              loading="eager"
              fetchPriority="high"
              className="ct-hero-photo"
            />
          )}
          <span className="ct-veil-across" />
          <span className="ct-veil-down" />
        </div>
        <div className="ct-hero-in">
          <h1 className="text-display-2 tracking-display text-ink text-balance">
            {hero.heading}
          </h1>
          <p className="text-body-md text-body mt-3">{hero.deck}</p>
        </div>
      </section>

      <div className="ct-wrap">
        <div className="ct-panel">
          <ContactForm form={form} labels={labels} />

          <div className="ct-proof-col">
            <h2 className="text-title-3 tracking-heading text-ink mb-7.5 font-bold">
              {proof.heading}
            </h2>

            <ul className="ct-stats">
              {proof.stats.map((stat, i) => (
                <li key={stat.label ?? i} className="ct-stat">
                  <span className="ct-stat-ic">
                    {stat.image?.src && (
                      <Image
                        src={stat.image.src}
                        alt=""
                        width={30}
                        height={30}
                        sizes="30px"
                        className="block h-7.5 w-7.5 object-contain"
                      />
                    )}
                  </span>
                  <b className="text-title-1 tracking-display text-ink font-bold">
                    {stat.value}
                  </b>
                  <span className="text-body-sm text-muted">{stat.label}</span>
                </li>
              ))}
            </ul>

            <figure className="ct-quote">
              <QuoteMark />
              <div>
                <blockquote className="text-body-md tracking-snug text-ink mb-3 font-semibold text-pretty">
                  {proof.quote}
                </blockquote>
              </div>
            </figure>

            <ul className="ct-checks">
              {checks.map((check) => (
                <li key={check} className="ct-check">
                  <Tick />
                  <span className="text-body-md text-body">{check}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <LogoGrid />

      <div className="ct-wrap">
        <ul className="ct-cards">
          {routes.map((route, i) => (
            <li key={route.title ?? i}>
              <a href="/book-a-demo" className="ct-card focus-ring">
                {route.image?.src && (
                  <Image
                    src={route.image.src}
                    alt=""
                    width={64}
                    height={64}
                    sizes="64px"
                    className="mx-auto block h-16 w-16 object-contain"
                  />
                )}
                <h2 className="text-body-lg tracking-snug text-ink mt-5 mb-2 font-bold">
                  {route.title}
                </h2>
                <p className="text-body-md text-muted mb-4.5">{route.body}</p>
                <span className="text-body-md text-blue font-semibold">
                  {route.link}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <section className="ct-map-band">
        <div className="hqmap">
          {/* Google's embed. Lazy, and with a trimmed referrer — a
              third-party frame, so it's worth being explicit that loading
              this page contacts Google. */}
          <div className="hqmap-frame">
            <iframe
              title={office.mapTitle}
              src={office.mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-full w-full border-0"
            />
          </div>

          <div className="hqmap-card">
            <p className="text-eyebrow tracking-caps text-hq-eyebrow-ink uppercase">
              {office.eyebrow}
            </p>
            <p
              className="text-body-lg tracking-snug mt-3 font-bold text-white"
              data-hq-name
            >
              {office.name}
            </p>
            <address className="text-body-sm text-hq-addr-ink mt-2.5 text-pretty not-italic">
              {office.address}
            </address>
            <a
              href={office.directionsHref}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="focus-ring text-body-sm text-hq-link-ink mt-4.5 inline-block font-semibold"
            >
              {office.directionsLabel}
            </a>

            <dl className="hqmap-meta">
              {meta.map((row) => (
                <div key={row.key} className="hqmap-mrow">
                  <MetaIcon row={row.key} />
                  <dt className="text-eyebrow text-hq-eyebrow-ink font-medium">
                    {row.label}
                  </dt>
                  <dd className="text-eyebrow text-hq-mv-ink font-semibold">
                    {/* The phone and the address are things to act on, not
                        just read. `contactHref` derives the destination
                        from the value, so the link cannot point somewhere
                        the label does not say. The hours row has no
                        destination and stays plain text. */}
                    {contactHref(row.value) ? (
                      <a
                        href={contactHref(row.value)}
                        className="focus-ring text-hq-link-ink hover:underline"
                      >
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
