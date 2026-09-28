import fs from "node:fs";
import path from "node:path";

/**
 * The flat list of every static route's path, for `sitemap.js`, `robots.js`
 * and any page that needs "every route" without a routes registry (this
 * project has none — see plan/CLAUDE.md → Decisions).
 *
 * Article paths are appended below, read straight from the same baked JSON
 * `lib/articles.js` serves — this module can't import that one back (it
 * exports async functions for a list `robots.js`/`sitemap.js` need
 * synchronously at build time), so it reads the file itself.
 */
const posts = JSON.parse(
  fs.readFileSync(
    path.join(process.cwd(), "src/content/blog-posts.json"),
    "utf8"
  )
);
const ARTICLE_PATHS = posts.map((post) => post.href);

export const ALL_PATHS = [
  "/",
  "/about",
  "/faq",
  "/investors-partners",
  "/privacy-policy",
  "/book-a-demo",
  "/resources",
  "/design-system",
  "/health-status",
  "/products/screenx",
  "/products/cortex",
  "/products/escalation",
  "/products/modules/behavioural-biometrics",
  "/products/modules/device-intelligence",
  "/products/modules/digital-footprint",
  "/products/modules/image-intelligence",
  "/products/modules/location-intelligence",
  "/products/modules/sms-intelligence",
  "/solutions",
  "/solutions/use-cases/fraud",
  "/solutions/use-cases/credit-risk",
  "/solutions/use-cases/onboarding",
  "/solutions/use-cases/compliance",
  "/solutions/industries/banks-sfbs",
  "/solutions/industries/nbfcs-lending",
  "/solutions/industries/fintechs-neobanks",
  "/solutions/industries/ecommerce-marketplaces",
  ...ARTICLE_PATHS,
];

/** Internal/QA pages — not indexed, not in the sitemap. */
export const NOINDEX_PATHS = ["/design-system", "/health-status"];

/** Every real content route, for the XML sitemap. */
export const SITEMAP_PATHS = ALL_PATHS.filter(
  (path) => !NOINDEX_PATHS.includes(path)
);
