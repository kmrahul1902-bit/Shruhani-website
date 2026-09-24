/**
 * Whether a body link leaves the site.
 *
 * The SEO checklist requires every external link to be `nofollow`.
 * "External" means a different host, not merely an absolute URL: an article
 * linking to our own domain is linking to us, not out.
 *
 * Adapted from the reference: no `@/config/site` in this project (see
 * plan/CLAUDE.md → Decisions) — the host list is a plain local constant,
 * global-renamed sign3.ai → shruhani.com.
 */
const OUR_HOSTS = new Set(["shruhani.com", "www.shruhani.com"]);

export function isExternalHref(href) {
  if (typeof href !== "string") return false;
  const trimmed = href.trim();
  if (!/^https?:\/\//i.test(trimmed)) return false;
  try {
    return !OUR_HOSTS.has(new URL(trimmed).hostname);
  } catch {
    return false;
  }
}
