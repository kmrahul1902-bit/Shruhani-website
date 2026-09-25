/**
 * Renders one or more JSON-LD graphs into the document. Ported verbatim from
 * the reference — generic, no CMS/routes-registry dependency.
 *
 * Server Component — structured data is markup, and shipping a client bundle
 * to print a <script> tag would be absurd. Nulls are filtered so a caller can
 * pass a builder's result straight through (e.g. `faqPageSchema` returns null
 * with no items).
 *
 * The JSON is serialized with `<` escaped: schema values are content-authored,
 * and a stray "</script>" in a description would otherwise close the tag and
 * turn copy into markup.
 */
export default function JsonLd({ schemas }) {
  const graphs = (Array.isArray(schemas) ? schemas : [schemas]).filter(Boolean);
  if (!graphs.length) return null;

  // The index is part of the key because a page can legitimately carry two
  // graphs of the same type with no @id, which would otherwise collide.
  return graphs.map((graph, i) => (
    <script
      key={`${graph["@id"] ?? graph["@type"]}-${i}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  ));
}
