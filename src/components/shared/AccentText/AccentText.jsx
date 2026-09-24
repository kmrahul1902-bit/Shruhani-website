/**
 * Renders `text` with `phrase` — one string or several — wrapped in styled spans.
 *
 * Content stores the COMPLETE sentence plus the phrases to find inside it, so an
 * editor sees something that reads correctly and cannot leave it grammatically
 * broken by filling in fragments.
 *
 * Phrases are wrapped where they appear, in the text's order rather than the
 * array's, so the copy stays the source of sequence. A phrase that is absent is
 * skipped: a CMS reword degrades to plain text instead of throwing.
 */
export default function AccentText({ text, phrase, className }) {
  const phrases = (Array.isArray(phrase) ? phrase : [phrase]).filter(Boolean);

  const hits = phrases
    .map((value) => ({ value, at: text.indexOf(value) }))
    .filter((hit) => hit.at !== -1)
    .sort((a, b) => a.at - b.at);

  if (!hits.length) return text;

  const parts = [];
  let cursor = 0;
  for (const { value, at } of hits) {
    // A phrase that starts inside one already wrapped (an editor listing both
    // "device" and "device intelligence") is dropped rather than nested.
    if (at < cursor) continue;
    if (at > cursor) parts.push(text.slice(cursor, at));
    parts.push(
      <span key={at} className={className}>
        {value}
      </span>
    );
    cursor = at + value.length;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));

  return <>{parts}</>;
}
