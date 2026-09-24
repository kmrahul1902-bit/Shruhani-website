/**
 * Access layer for the blog's articles — REWRITTEN, not ported.
 *
 * The reference reads this from a live Strapi CMS. This project has no CMS
 * (see plan/CLAUDE.md → Decisions) and no baked article content either:
 * `cms-sync-baseline` only ever held the blog INDEX page's chrome copy
 * (`src/content/blog.json` — hero, labels), never individual posts. Those
 * lived in Strapi and were never exported anywhere this repo can reach.
 *
 * So every function here always returns empty — the same branch the
 * reference itself takes when its CMS is unreachable. That's the honest
 * state of this page today (see plan/docs/03-content-and-pages.md: "start
 * with no posts"), not a bug. Adding real posts is a future phase's job,
 * and needs only this file to change — every component downstream already
 * expects the article shape the reference defines.
 */
export async function getArticles() {
  return [];
}

export async function getArticle() {
  return null;
}

export async function getReadNext() {
  return [];
}

export async function getTopics() {
  return [];
}
