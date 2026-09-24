/**
 * A numbered block — a badge, a title, a paragraph. Its own component
 * rather than a markdown ordered list, because each item needs a real H3
 * alongside the numeral. `blog-steps` draws the badge from a CSS counter.
 *
 * The headings are h3 and deliberately carry no id: the contents rail
 * lists the document's h2 sections only.
 */
export default function LegalSteps({ block }) {
  const items = block.items ?? [];
  if (!items.length) return null;

  return (
    <ol className="blog-steps max-mob:my-6 my-7 flex flex-col gap-4.5">
      {items.map((item) => (
        <li key={item.title}>
          <h3 className="text-ink text-body-lg max-mob:text-body-md mb-2 font-bold tracking-tight">
            {item.title}
          </h3>
          <p className="text-pretty">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}
