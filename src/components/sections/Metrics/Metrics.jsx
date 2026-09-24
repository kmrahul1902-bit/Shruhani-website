import { cn } from "@/lib/cn";

/**
 * Platform-metrics band — dark, two columns: title block + 3x2 metric grid.
 * Ported from the reference verbatim (field names already match our baked
 * `home.json`'s `metricsBand`; `headingBreak` is simply absent there, which
 * this already treats as optional).
 */
const GRID = "grid-cols-[0.78fr_1.6fr]";

const CELL_BASE =
  "border-border-dark group relative flex min-h-37 flex-col justify-start border-r border-b py-8 transition duration-200 max-mob:py-5.5 hover:z-1";

const CELL_INSET = "px-7.5 max-mob:px-4";

const VARIANTS = {
  stacked: {
    cell: "hover:bg-white/4",
    value: "text-display-2",
    label: "text-on-dark-bright mt-3",
  },
  inline: {
    heading:
      "text-display-2 font-semibold max-mob:text-title-2 text-on-dark-bright",
    cell: "hover:bg-white/4",
    value: "text-display-2 max-mob:text-title-3 font-bold mb-2 block",
    label: "text-on-dark-bright",
  },
  useCase: {
    cell: "hover:bg-white/4 max-mob:px-3.5 gap-1.5 px-7",
    value:
      "text-display-2 tracking-display max-mob:text-title-2 font-bold mb-1 block text-white",
    label: "max-mob:text-eyebrow break-anywhere text-white/88",
    heading:
      "text-display-2 font-semibold tracking-display max-nav:text-display-2 font-semibold tracking-display text-white",
    deck: "max-mob:text-body-md mt-5.5 text-on-dark-52",
    section: "max-mob:px-4.5 max-mob:pt-11 max-mob:pb-12",
    frame: "rounded-card",
    grid: "grid-cols-3",
    wrap: "max-mob:px-6 grid-cols-[1fr_1.6fr]",
    attrib: "text-body-sm font-normal max-mob:text-caption mt-1 text-white/42",
  },
  industry: {
    section: "max-mob:pt-12 max-mob:pb-13",
    cell: "hover:bg-white/4 max-mob:px-3.5 gap-1.5 px-7",
    value:
      "text-display-2 tracking-display max-mob:text-title-2 font-bold mb-1 block text-white",
    label: "max-mob:text-eyebrow break-anywhere text-white/88",
    heading:
      "text-display-2 font-semibold tracking-display max-mob:text-title-2 text-white",
    deck: "max-mob:text-body-md mt-5.5 text-on-dark-52",
    frame: "rounded-card",
    attrib: "text-body-sm font-normal max-mob:text-caption mt-1 text-white/42",
    grid: "grid-cols-2",
    wrap: "grid-cols-[1fr_1.6fr]",
  },
};

export default function Metrics({
  headingPlain,
  headingAccent,
  headingBreak,
  sub,
  metrics,
  variant = "stacked",
}) {
  const styles = VARIANTS[variant];
  const inline = variant !== "stacked";
  return (
    <section
      className={`bg-dark relative py-27.5 ${styles.section || "max-mob:pt-14 max-mob:pb-15"}`}
    >
      <div
        className={cn(
          "container-fluid max-nav:grid-cols-1 max-nav:gap-11 max-mob:gap-7 max-mob:px-5 grid items-center gap-16",
          styles.wrap || GRID
        )}
      >
        <div className="max-nav:pl-0 pl-8 text-left">
          <h2
            className={cn(
              "max-nav:text-title-1 tracking-heading font-bold",
              styles.heading ||
                "text-display-2 max-mob:text-title-3 text-on-dark-bright font-semibold",
              headingBreak &&
                "text-display-2 nav:whitespace-nowrap font-semibold"
            )}
          >
            {headingPlain}
            {headingAccent ? (
              <>
                {headingBreak ? <br /> : " "}
                <span className="text-blue-on-dark">{headingAccent}</span>
              </>
            ) : null}
          </h2>
          <p
            className={cn(
              "text-body-md max-mob:text-body-sm max-w-125",
              styles.deck || "mt-6 text-white/55"
            )}
          >
            {sub}
          </p>
        </div>

        <div
          className={`border-border-dark max-nav:ml-0 -ml-10 overflow-hidden border bg-white/2 ${styles.frame || "rounded-band"}`}
        >
          <ul
            className={`max-wide:grid-cols-2 -mr-px -mb-px grid ${styles.grid || "grid-cols-3"}`}
          >
            {metrics.map((item) => (
              <li
                key={item.label}
                className={cn(
                  CELL_BASE,
                  styles.cell.includes("px-") ? "" : CELL_INSET,
                  styles.cell
                )}
              >
                {!inline && (
                  <p
                    className={`text-on-dark-bright group-hover:text-blue-on-dark max-mob:text-display-2 transition-colors duration-200 ${styles.value}`}
                  >
                    {item.value}
                  </p>
                )}
                <p
                  className={`text-body-md tracking-snug font-bold ${styles.label || "text-on-dark-bright"}`}
                >
                  {inline && (
                    <span
                      className={`group-hover:text-blue-on-dark transition-colors duration-200 ${styles.value}`}
                    >
                      {item.value}
                    </span>
                  )}
                  {item.label}
                </p>
                {item.sub && (
                  <p
                    className={
                      styles.attrib || "text-body-sm mt-1.5 text-white/45"
                    }
                  >
                    {item.sub}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
