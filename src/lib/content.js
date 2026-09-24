import fs from "node:fs";
import path from "node:path";

/**
 * Baked-JSON content loader (Phase 0 decision — see CLAUDE.md → Decisions).
 * Reads `src/content/<key>.json`. Swapping to a live CMS later means
 * changing this function's body only — every page calls `getContent(key)`.
 *
 * The source files are Strapi's flat dot/bracket-path export format
 * (e.g. `"industryGrid.industries[0].title"` as a literal top-level key),
 * not nested JSON — every component that reads this content expects the
 * nested shape, so each read unflattens it first.
 */
export function getContent(key) {
  const filePath = path.join(process.cwd(), "src/content", `${key}.json`);
  const flat = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return unflatten(flat);
}

/**
 * Turns `{ "a.b[0].c": 1 }` into `{ a: { b: [{ c: 1 }] } }`.
 *
 * Splitting each key on runs of `.`/`[`/`]` gives the path segments
 * directly (`"b[0].c"` → `["b", "0", "c"]`); a purely-numeric segment is
 * treated as an array index, so the parent is created as an array rather
 * than an object.
 */
export function unflatten(flat) {
  const root = {};
  for (const [key, value] of Object.entries(flat)) {
    const segments = key.split(/[.[\]]+/).filter(Boolean);
    let node = root;
    segments.forEach((segment, i) => {
      const prop = /^\d+$/.test(segment) ? Number(segment) : segment;
      if (i === segments.length - 1) {
        node[prop] = value;
        return;
      }
      const nextIsIndex = /^\d+$/.test(segments[i + 1]);
      if (node[prop] === undefined) node[prop] = nextIsIndex ? [] : {};
      node = node[prop];
    });
  }
  return root;
}
