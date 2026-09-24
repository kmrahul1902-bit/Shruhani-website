/**
 * The tinted takeaways box. `items` is one takeaway per line, split here.
 */
export default function Callout({ block }) {
  const items = (block.items ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (!items.length) return null;

  return (
    <div className="bg-blog-callout border-blog-callout-border rounded-surface max-mob:rounded-panel max-mob:my-6.5 max-mob:px-4.5 max-mob:py-5 my-8 border px-7.5 py-7">
      <p className="text-blue text-caption tracking-caps mb-3.5 font-bold uppercase">
        {block.label}
      </p>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="blog-bullet text-body text-body-md max-mob:text-body-sm leading-relaxed"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
