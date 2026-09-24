/**
 * Looks a glyph up by name, and says so in development when there isn't one.
 *
 * Several sections take their icon from content: `ICONS[card.icon]`,
 * `SCARD_ICONS[card.key]`. The name is editable in the CMS, so a typo or a
 * reword leaves an empty `<svg>` — the box keeps its size, so the layout holds
 * and nothing looks broken enough to investigate. It just quietly has no mark.
 *
 * Deliberately still returns undefined rather than a stand-in: a generic glyph
 * in place of the intended one is a wrong answer presented confidently, and
 * these sit beside real icons where the odd one out would read as a design
 * choice. Rendering nothing is honest; the point is that someone is told.
 *
 * The warning is development-only — a server render in production should not
 * write to the log for a cosmetic gap, and `npm run cms:validate` is where
 * this is meant to be caught before it ships.
 */
export function resolveGlyph(map, name, where) {
  const glyph = map[name];
  if (!glyph && process.env.NODE_ENV !== "production") {
    console.warn(
      `[glyph] ${where}: no mark named ${JSON.stringify(name)} — it renders empty. ` +
        `Known: ${Object.keys(map).join(", ")}`
    );
  }
  return glyph;
}
