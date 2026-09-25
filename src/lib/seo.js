/**
 * Centralized page-metadata builder (CLAUDE.md § SEO), adapted from the
 * reference `lib/seo.js`. No `config/site.js` import — this project has no
 * CMS/routes registry (see plan/CLAUDE.md → Decisions), so the handful of
 * site-wide values it needs are inlined below instead.
 */

/**
 * TODO(content): no 1200x630 share image exists anywhere in this project yet
 * (checked every prior phase — no `/og/*.png` or similar). Once one is
 * supplied, wire it in here as a site-wide `shareImage` floor and add
 * `openGraph.images`/`twitter.images` back to `buildMetadata` below.
 */
export const SITE = {
  name: "Shruhani",
  legalName: "Shruhani Technologies Pvt. Ltd.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://shruhani.com",
};

const ROBOTS_INDEX =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

const ROBOTS_NOINDEX = "noindex, nofollow";

/**
 * Adapted from the reference `buildMetadata()`: dropped `titleAbsolute`,
 * `ogImage`/`shareImage`/`article` (no share-image asset exists — see the
 * TODO above) and the `site.indexable` environment gate (no CMS/dev-preview
 * split here; `noIndex` alone drives robots). Every page still self-
 * canonicalises to `SITE.url + path`, and Open Graph/Twitter still come free.
 */
export function buildMetadata({
  title,
  description,
  keywords,
  path = "/",
  noIndex,
}) {
  const url = `${SITE.url}${path}`;
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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
