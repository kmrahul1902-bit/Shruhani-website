import { SITE } from "@/lib/seo";
import { SITEMAP_PATHS } from "@/lib/routeInventory";

/**
 * Adapted from the reference `app/sitemap.js`: the reference derives its URL
 * list from `config/routes.js` and adds CMS-sourced blog posts with their own
 * `updatedAt`. Neither exists here (no CMS/routes registry — see
 * plan/CLAUDE.md → Decisions; `/resources/article/[slug]` currently has zero
 * articles), so the list is the flat static-route inventory instead, and
 * every entry shares one build-time `lastModified` rather than a per-page
 * CMS timestamp.
 *
 * `dynamic = "force-static"` is required under `output: "export"` — see
 * robots.js's identical note.
 */
export const dynamic = "force-static";

export default function sitemap() {
  const lastModified = new Date();
  return SITEMAP_PATHS.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified,
  }));
}
