/**
 * A pull quote. `title` is the attribution the CMS component carries; it
 * renders as a cite beneath only when an editor has filled it in.
 */
export default function Quote({ block }) {
  if (!block.body) return null;

  return (
    <blockquote className="border-blue text-ink my-7 border-l-3 pl-5">
      <p className="text-xl font-semibold tracking-tight">{block.body}</p>
      {block.title ? (
        <cite className="text-muted text-caption mt-2 block not-italic">
          {block.title}
        </cite>
      ) : null}
    </blockquote>
  );
}
