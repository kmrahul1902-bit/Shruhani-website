import { SITE } from "@/lib/seo";

/**
 * JSON-LD builders, adapted from the reference `lib/schema.js`.
 *
 * Deliberately simplified — the reference's `breadcrumbSchema`/`trailFor`
 * depend on `ROUTES` (a hierarchical path registry) and `getShellContent()`
 * (CMS breadcrumb labels), neither of which exists in this project (no
 * CMS/routes registry — see plan/CLAUDE.md → Decisions). Rather than port
 * that dependency, breadcrumb JSON-LD is dropped entirely: a page's `path` is
 * a literal string already, so there is no registry to derive a trail from
 * without reinventing one. This is a deliberate simplification, not a gap to
 * fill in later — the visible on-page breadcrumbs (where present) are
 * unaffected, only the structured-data BreadcrumbList is omitted.
 *
 * `articleSchema`, `itemListSchema`, `tableParts`, `videoSchema` and
 * `customSchemas` are also dropped: the reference wires them to CMS fields
 * (`seo.jsonLd`, article bodies) this project doesn't have. `faqPageSchema`
 * is added instead of ported — the FAQ page has real, verifiable Q&A content.
 */

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

const abs = (path) => `${SITE.url}${path}`;

/** The publisher. Site-wide, emitted once from the root layout. */
export function organizationSchema({ description, sameAs = [] } = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    // The brand is what people search for; legalName is who they would be
    // contracting with, and search engines treat the two as distinct.
    legalName: SITE.legalName,
    url: SITE.url,
    logo: abs("/logo.svg"),
    ...(description && { description }),
    ...(sameAs.length && { sameAs }),
  };
}

/** The site itself, so search can attribute pages to one property. */
export function webSiteSchema({ description } = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: SITE.name,
    url: SITE.url,
    ...(description && { description }),
    publisher: { "@id": ORG_ID },
  };
}

/**
 * A single page, tied back to the site. No `trail`/`breadcrumb` field — see
 * the module note above on why breadcrumb JSON-LD is dropped here.
 */
export function webPageSchema({ title, description, path }) {
  const url = abs(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
  };
}

/**
 * FAQPage schema for `/faq` — Google's Rich Results Test format. Returns
 * null for an empty list rather than an FAQPage with no questions, which is
 * invalid.
 */
export function faqPageSchema(items) {
  if (!items?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
