import { SITE } from "@/lib/seo";
import { NOINDEX_PATHS } from "@/lib/routeInventory";

/**
 * Adapted from the reference `app/robots.js`: no `site.indexable`
 * environment gate (no dev/preview deployment split here — see
 * plan/CLAUDE.md → Decisions) and `disallow` comes from the flat route
 * inventory rather than `config/routes.js` (no routes registry).
 */
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: NOINDEX_PATHS },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
