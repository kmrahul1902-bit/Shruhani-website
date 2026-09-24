/**
 * Fallback copy for blog chrome the baked content doesn't carry.
 *
 * `src/content/blog.json` only ever held the index page's own hero/labels —
 * never the article-template strings (contents rail, author card, share
 * rail, read-next, topic links) the reference sources from its CMS shell,
 * which this project has none of (see plan/CLAUDE.md → Decisions). Same
 * pattern as Phase 4's `module.labels.js`: plain English defaults, merged
 * so real content wins if it's ever populated.
 */
export const BLOG_LABELS = {
  // The index's real empty state: zero articles published, not a filtered
  // search returning nothing (that's `results.empty` in blog.json, and
  // doesn't apply — the filter UI it belongs to is out of scope here).
  indexEmpty: "New articles are on the way — check back soon.",
  article: {
    contentsLabel: "Contents",
    authorHeading: "Written by",
    readNextHeading: "Read next",
    readNextLinkLabel: "View all articles",
    breadcrumbLabel: "Breadcrumb",
    crumbSection: "Resources",
    crumbBlog: "Articles",
    publishedLabel: "",
    updatedLabel: "Updated",
    topicsHeading: "Explore more topics",
    tableSwipeHint: "Swipe to see more",
  },
  share: {
    heading: "Share this article",
    networks: {
      x: "Share on X",
      linkedin: "Share on LinkedIn",
      facebook: "Share on Facebook",
    },
  },
};
