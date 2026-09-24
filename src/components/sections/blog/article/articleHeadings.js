/**
 * Heading ids, the table of contents, and the tag each heading renders as.
 *
 * The content is numbered honestly: consecutively from H2, stopping at the
 * H4 the design styles — so the depth an author types is the depth that
 * renders.
 */

const HEADING = /^(#{1,6})\s+(.+?)\s*#*$/gm;

/** Strips the markdown an author may have put inside a heading. */
const plain = (text) =>
  text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/<[^>]+>/g, "")
    .trim();

/**
 * Slug for a heading's anchor. Matches rehype-slug's `github-slugger` output
 * for the same text, so the ids the TOC links to are the ids the body renders.
 */
export function slugifyHeading(text) {
  const slug = plain(text)
    .replace(/^\d+[.)]\s*/, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N} -]/gu, "")
    .replace(/ /g, "-");

  return /^\d/.test(slug) ? `s-${slug}` : slug;
}

/**
 * A run of heading ids for one article.
 *
 * Stateful because two headings can share text and the ids must still be
 * unique — and because the TOC and the body have to arrive at the SAME ids or
 * every link in the TOC misses.
 */
export function createHeadingWalker() {
  const seen = new Map();
  let lastLevel = 1;

  return {
    next(text) {
      const base = slugifyHeading(text) || "section";
      const n = seen.get(base) ?? 0;
      seen.set(base, n + 1);
      return n === 0 ? base : `${base}-${n}`;
    },

    /**
     * The tag this heading renders as, clamped so the document can never skip
     * a level. A heading may go at most one level deeper than the previous
     * one; coming back UP is unrestricted.
     */
    levelFor(depth) {
      const wanted = Number(tagForDepth(depth).slice(1));
      const level = Math.min(wanted, lastLevel + 1);
      lastLevel = level;
      return `h${level}`;
    },
  };
}

/**
 * Reads the heading tree out of an article's markdown.
 *
 * Returns the sections in document order, each with its sub-headings, plus
 * the `depths` the article uses. The TOC groups sub-headings under the
 * shallowest level.
 */
export function outlineOf(markdown) {
  const found = [];
  for (const match of markdown.matchAll(HEADING)) {
    const text = plain(match[2]);
    if (text) found.push({ depth: match[1].length, text });
  }
  if (!found.length) return { sections: [], depths: {} };

  const levels = [...new Set(found.map((h) => h.depth))].sort((a, b) => a - b);
  const [sectionDepth, subDepth] = levels;

  const depths = { levels, section: sectionDepth, sub: subDepth ?? null };

  const sections = [];
  const ids = createHeadingWalker();

  for (const heading of found) {
    const entry = { id: ids.next(heading.text), text: heading.text };
    if (heading.depth === sectionDepth || !sections.length) {
      sections.push({ ...entry, children: [] });
    } else {
      sections[sections.length - 1].children.push(entry);
    }
  }

  return { sections, depths };
}

/**
 * Which rendered tag a source depth WANTS to be, before clamping. Never an
 * h1 (belongs to the page's title), never deeper than the h4 the design
 * styles.
 */
export function tagForDepth(depth) {
  return `h${Math.min(Math.max(depth, 2), 4)}`;
}
