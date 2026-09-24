/**
 * "2026-08-26" -> "Aug 26, 2026", the byline format in both designs.
 *
 * Built from a UTC-anchored date rather than `new Date(value)`: the stored
 * value is a plain calendar date, and parsing it in a timezone behind UTC
 * renders the previous day.
 */
export function formatArticleDate(value) {
  if (!value) return null;
  const [y, m, d] = String(value).split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** "16 min read" — the pill on every cover. */
export const readTimeLabel = (minutes) =>
  minutes == null ? null : `${minutes} min read`;

/**
 * Substitutes {count} in the result-count string, choosing the singular form
 * the copy module supplies for exactly one.
 */
export const resultCountLabel = ({ count, template, one }) =>
  count === 1 ? one : template.replace("{count}", String(count));

/** Case-insensitive match across everything a card shows. */
export const matchesQuery = (article, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [
    article.title,
    article.deck,
    article.author?.name,
    ...article.categories.map((c) => c.name),
  ]
    .filter(Boolean)
    .some((text) => text.toLowerCase().includes(q));
};

/**
 * Which category a card's chip should name.
 *
 * A card shows one chip. When a topic filter is active the chip names a
 * category the article actually MATCHED; with nothing selected the primary
 * category is the honest answer. `ArticleCover` takes a `chipCategory` prop
 * for this — nothing calls this helper today since the filter UI that would
 * is out of scope (see blog.labels.js), but it's kept for when one returns.
 */
export const chipCategoryFor = (article, selected) => {
  if (!selected?.size) return article.category;
  const matched = (article.categories ?? []).find((c) => selected.has(c.slug));
  return matched ?? article.category;
};
