/**
 * Heading ids, the table of contents, and the tag each heading renders as.
 *
 * Adapted from the reference's `blog/article/articleHeadings.js` — this
 * project has no blog content yet (a parallel Phase 6 slice is building
 * that separately), so the legal-document template gets its own copy
 * rather than a shared import across two things being built at once. Move
 * this to `components/shared/` if a third page family wants it.
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

/** Slug for a heading's anchor, matching `rehype-slug`'s output for the same text. */
export function slugifyHeading(text) {
  const slug = plain(text)
    .replace(/^\d+[.)]\s*/, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N} -]/gu, "")
    .replace(/ /g, "-");

  // An id starting with a digit is valid HTML5 but not a valid CSS
  // selector — the prefix costs nothing and removes the trap.
  return /^\d/.test(slug) ? `s-${slug}` : slug;
}

/**
 * A run of heading ids for one document. Stateful because two headings can
 * share text and the ids must still be unique, and because the TOC and the
 * body have to arrive at the SAME ids by walking the headings in the same
 * order through one of these each.
 */
export function createHeadingWalker() {
  const seen = new Map();
  let lastLevel = 1; // the page's own title is the h1 every heading sits under

  return {
    next(text) {
      const base = slugifyHeading(text) || "section";
      const n = seen.get(base) ?? 0;
      seen.set(base, n + 1);
      return n === 0 ? base : `${base}-${n}`;
    },

    /** The tag this heading renders as, clamped so the document never skips a level. */
    levelFor(depth) {
      const wanted = Number(tagForDepth(depth).slice(1));
      const level = Math.min(wanted, lastLevel + 1);
      lastLevel = level;
      return `h${level}`;
    },
  };
}

/** Reads the heading tree out of a document's markdown, in document order. */
export function outlineOf(markdown) {
  const found = [];
  for (const match of markdown.matchAll(HEADING)) {
    const text = plain(match[2]);
    if (text) found.push({ depth: match[1].length, text });
  }
  if (!found.length) return { sections: [] };

  const levels = [...new Set(found.map((h) => h.depth))].sort((a, b) => a - b);
  const [sectionDepth] = levels;

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

  return { sections };
}

/** Which rendered tag a source depth wants to be, before clamping — never h1, never past h4. */
export function tagForDepth(depth) {
  return `h${Math.min(Math.max(depth, 2), 4)}`;
}
