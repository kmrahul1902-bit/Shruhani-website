/**
 * Centralized page-metadata builder (CLAUDE.md § SEO), adapted from the
 * reference `lib/seo.js`. No `config/site.js` import — this project has no
 * CMS/routes registry (see plan/CLAUDE.md → Decisions), so the handful of
 * site-wide values it needs are inlined below instead.
 */

export const SITE = {
  name: "Shruhani",
  legalName: "Shruhani Technologies Pvt. Ltd.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://shruhani.com",
  /**
   * The site-wide social card, used by every page (none has a more specific
   * one — no per-page share images exist). 1200x630, the size every scraper
   * crops to. Downloaded from the live site's own CDN (post-build fix) —
   * see plan/CLAUDE.md → Decisions for why this project has no CMS to
   * source it from at request time instead.
   */
  shareImage: {
    src: "/images/og-preview.png",
    alt: "Shruhani — AI-powered fraud and risk decisions, one platform from onboarding to every transaction",
  },
};

const ROBOTS_INDEX =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

const ROBOTS_NOINDEX = "noindex, nofollow";

/**
 * Adapted from the reference `buildMetadata()`: dropped `titleAbsolute`,
 * `article`, and the `site.indexable` environment gate (no CMS/dev-preview
 * split here; `noIndex` alone drives robots). Every page still self-
 * canonicalises to `SITE.url + path`. `shareImage`/`ogImage` let a page
 * override the site-wide card; `SITE.shareImage` is the floor every page
 * gets otherwise (post-build fix — see `SITE` above).
 */
export function buildMetadata({
  title,
  description,
  keywords,
  path = "/",
  noIndex,
  shareImage,
  ogImage,
}) {
  const url = `${SITE.url}${path}`;
  const card = shareImage?.src
    ? shareImage
    : ogImage
      ? { src: ogImage }
      : SITE.shareImage;
  return {
    title,
    description,
    ...(keywords?.length && { keywords }),
    alternates: { canonical: url },
    robots: noIndex ? ROBOTS_NOINDEX : ROBOTS_INDEX,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      images: [{ url: card.src, ...(card.alt && { alt: card.alt }) }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [card.src],
    },
  };
}
