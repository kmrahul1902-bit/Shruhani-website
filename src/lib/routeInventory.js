/**
 * The flat list of every static route's path, for `sitemap.js`, `robots.js`
 * and any page that needs "every route" without a routes registry (this
 * project has none — see plan/CLAUDE.md → Decisions).
 *
 * `/resources/article/[slug]` is excluded: it is dynamic and currently has
 * zero articles. `/api/demo-request` is a route handler, not a page.
 */
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
];

/** Internal/QA pages — not indexed, not in the sitemap. */
export const NOINDEX_PATHS = ["/design-system", "/health-status"];

/** Every real content route, for the XML sitemap. */
export const SITEMAP_PATHS = ALL_PATHS.filter(
  (path) => !NOINDEX_PATHS.includes(path)
);
