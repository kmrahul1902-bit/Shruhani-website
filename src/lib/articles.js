import fs from "node:fs";
import path from "node:path";

/**
 * Access layer for the blog's articles.
 *
 * Real posts now exist (imported from the pre-rebrand site's own CMS — see
 * `src/content/blog-posts.json`), so this reads that baked array instead of
 * always returning empty. Same baked-content pattern as `lib/content.js`,
 * just not flat dot-path JSON: an array of 50+ posts, each with several body
 * blocks of long markdown, doesn't gain anything from that format and loses
 * readability, so this file parses the plain nested JSON directly.
 */
const POSTS = JSON.parse(
  fs.readFileSync(
    path.join(process.cwd(), "src/content/blog-posts.json"),
    "utf8"
  )
);

export async function getArticles() {
  return POSTS;
}

export async function getArticle(slug) {
  return POSTS.find((a) => a.slug === slug) ?? null;
}

/**
 * The three articles shown under one, for "Read next".
 *
 * Same category first, then whatever is newest, because a related article is
 * more use than a recent one — but a category with only one article should
 * not leave the slot empty, so the newest fill the rest. The article itself
 * is always excluded.
 */
export async function getReadNext(article, limit = 3) {
  const others = POSTS.filter((a) => a.slug !== article.slug);
  const slugs = new Set(article.categories.map((c) => c.slug));
  const related = others.filter((a) =>
    a.categories.some((c) => slugs.has(c.slug))
  );
  const seen = new Set(related.map((a) => a.slug));
  return [...related, ...others.filter((a) => !seen.has(a.slug))].slice(
    0,
    limit
  );
}

/**
 * Every editorial topic on the blog, with how many posts carry it.
 *
 * Derived from the posts themselves rather than a separate Category
 * collection — a category with no posts is not a topic anyone can browse.
 */
export async function getTopics() {
  const counts = new Map();
  for (const article of POSTS) {
    for (const category of article.categories) {
      const row = counts.get(category.slug) ?? { ...category, count: 0 };
      row.count += 1;
      counts.set(category.slug, row);
    }
  }
  return [...counts.values()].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name)
  );
}
