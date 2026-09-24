/**
 * The two read-time buckets on the filter rail.
 *
 * The boundary lives here rather than in the copy module so renaming a label
 * cannot silently move the cut-off — the design's "Under 15 min" and "15 min
 * and over" are the names of THESE, not a second definition of them.
 *
 * Unused today (the filter rail itself is out of scope — see blog.labels.js —
 * with zero articles there's nothing to filter) but kept: it's pure content
 * logic, not UI, and costs nothing to carry forward for when filtering returns.
 */
export const LENGTH_BUCKETS = [
  { key: "short", max: 14 },
  { key: "long", min: 15 },
];

/** Whether an article's read time falls in a bucket. Null read times match nothing. */
export const inBucket = (minutes, key) => {
  const bucket = LENGTH_BUCKETS.find((b) => b.key === key);
  if (!bucket || minutes == null) return false;
  return (
    (bucket.min === undefined || minutes >= bucket.min) &&
    (bucket.max === undefined || minutes <= bucket.max)
  );
};

/**
 * The category chip's colour, by slug (handoff: Fraud, Growth, Risk — tokens
 * carry the pink rebrand from Phase 1). Anything else falls through to the
 * scrim the design uses for an unrecognised category.
 */
export const CATEGORY_TONE = {
  "cat-fraud": "bg-blog-fraud shadow-blog-chip",
  "cat-growth": "bg-blog-growth",
  "cat-risk": "bg-blog-risk",
};

export const DEFAULT_TONE = "bg-blog-chip-scrim backdrop-blur-chip";

/** The featured article is the first of the list; the grid shows the rest. */
export const FIRST_BATCH = 6;
