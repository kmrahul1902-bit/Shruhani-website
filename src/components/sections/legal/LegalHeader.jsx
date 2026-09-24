import Link from "next/link";

/** The chevron between breadcrumb steps. */
function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-faint size-3.25"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

/**
 * The document band above a legal page: breadcrumb, category chip, title,
 * and a meta row. Adapted from the reference: `ROUTES.home` (no routes
 * registry here — see plan/CLAUDE.md → Decisions) is just `/`.
 *
 * `sectionCount` is passed in rather than stored, so the "N sections" claim
 * is counted from the document's own headings.
 */
export default function LegalHeader({ content, homeLabel, sectionCount }) {
  const meta = [
    `${content.updatedLabel} ${content.updated}`,
    content.appliesTo,
    `${sectionCount} ${content.sectionsLabel}`,
  ].filter(Boolean);

  return (
    <div className="legal-top">
      <div className="legal-gutter pt-8.5">
        <nav aria-label={content.seo.breadcrumbLabel}>
          <ol className="text-caption text-muted flex items-center gap-2.5">
            <li>
              <Link href="/" className="focus-ring hover:text-blue transition-colors">
                {homeLabel}
              </Link>
            </li>
            <li aria-hidden="true" className="flex items-center">
              <Chevron />
            </li>
            <li className="text-ink font-semibold" aria-current="page">
              {content.title}
            </li>
          </ol>
        </nav>

        <p className="bg-blue-tint text-blue text-caption tracking-caps rounded-tag mt-6.5 inline-block px-3 py-1.5 font-bold uppercase">
          {content.category}
        </p>

        <h1 className="text-legal-h1 text-ink mt-4.5 text-balance">
          {content.title}
        </h1>

        <div className="mt-6.5">
          <p className="text-ink text-body-md font-semibold">{content.entity}</p>
          <ul className="text-caption text-faint mt-1.5 flex flex-wrap items-center gap-2.5 tabular-nums">
            {meta.map((item, i) => (
              <li key={item} className="flex items-center gap-2.5">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="bg-border-strong size-1 rounded-full"
                  />
                )}
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
