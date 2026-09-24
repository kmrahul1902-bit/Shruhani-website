/**
 * A row of figures. Four fit the design's grid; more wrap rather than
 * shrink. `tabular-nums` so a column of figures lines up on the decimal.
 */
export default function Stats({ block }) {
  const items = block.items ?? [];
  if (!items.length) return null;

  return (
    <div className="max-nav:grid-cols-2 max-mob:grid-cols-2 max-mob:my-5.5 max-mob:gap-2.5 my-8 grid grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.id ?? item.label}
          className="border-border-cool rounded-card max-mob:rounded-panel max-mob:px-4 max-mob:pt-4 max-mob:pb-3.5 px-4.5 py-4.5"
        >
          <b className="text-blue text-title-2 max-mob:text-title-3 font-display block leading-none font-extrabold tabular-nums">
            {item.value}
          </b>
          <span className="text-muted text-caption max-mob:text-caption mt-2 block leading-snug">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
