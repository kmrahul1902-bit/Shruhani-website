import { SITE } from "@/lib/seo";
import { NOINDEX_PATHS } from "@/lib/routeInventory";

/**
 * Adapted from the reference `app/robots.js`: no `site.indexable`
 * environment gate (no dev/preview deployment split here — see
 * plan/CLAUDE.md → Decisions) and `disallow` comes from the flat route
 * inventory rather than `config/routes.js` (no routes registry).
 *
 * `dynamic = "force-static"` is required under `output: "export"` — this
 * metadata route compiles to a route handler internally, and static export
 * needs every route handler explicitly marked static (there's no server to
 * decide that at request time). See next.config.mjs's note.
 */
export const dynamic = "force-static";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: NOINDEX_PATHS },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
