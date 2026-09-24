import Image from "next/image";
import { SECTION } from "./investors.constants";

/**
 * The three core-banking marks are drawn at three different heights: BaNCS is a
 * wide short wordmark and Flexcube is stacked, so one height across all three
 * leaves two of them wrong. The mockup selects on the file name; keying on a
 * named size in content means renaming a file cannot silently restyle it.
 */
const CORE_MARK = {
  default: "h-5 max-w-24",
  short: "h-3.75 max-w-24",
  stacked: "h-6 max-w-17.5",
};

/**
 * Partners — four integration partners, then the core-banking systems
 * Shruhani has patterns for.
 *
 * The section is the page's one tinted band, ruled top and bottom.
 *
 * TODO(verify): partner names (guardrail #2 item 4) — carried over as
 * written.
 */
export default function Partners({ partners }) {
  return (
    <section className="bg-au-band border-ip-band border-y">
      <div className={SECTION}>
        <div className="mb-11 text-center">
          <h2 className="text-title-1 tracking-heading font-display text-ink text-balance">
            {partners.h2Before}
            <strong className="font-extrabold">{partners.h2Accent}</strong>
            {partners.h2After}
          </h2>
          <p className="text-body-md text-body mx-auto mt-4 max-w-160">
            {partners.lede}
          </p>
        </div>

        <ul className="max-bento:grid-cols-1 grid grid-cols-2 gap-5">
          {partners.items.map((partner) => (
            <li
              key={partner.name}
              className="border-ip-card rounded-ip-partner max-flow:flex-col max-flow:items-start max-flow:gap-4 flex items-center gap-5.5 border bg-white px-7 py-6.5"
            >
              {/* Height-driven, width auto: the design sets `height: 62px;
                  width: auto; max-width: 170px`, so each mark keeps its own
                  aspect instead of every logo being letterboxed into one box.
                  That needs a real intrinsic size, so no `fill` here. */}
              {partner.image?.src && (
                <Image
                  src={partner.image.src}
                  alt={partner.image.alt}
                  width={partner.image.width ?? 340}
                  height={partner.image.height ?? 124}
                  sizes="170px"
                  className="h-15.5 w-auto max-w-42.5 flex-none object-contain"
                />
              )}
              <div>
                <b className="text-body-lg tracking-snug text-ink block font-bold">
                  {partner.name}
                </b>
                <span className="text-body-md text-muted mt-1.5 block text-pretty">
                  {partner.description}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="border-ip-card rounded-ip-partner mt-7 flex flex-wrap items-center gap-7 border bg-white px-7.5 py-6.5">
          <h3 className="text-eyebrow tracking-label text-muted uppercase">
            {partners.coreHeading}
          </h3>
          <ul className="flex flex-wrap gap-2.5">
            {partners.core.map((system) => (
              /* Logo, a hairline divider, then the name — the divider is what
                 stops the mark and the wordmark reading as one lockup. */
              <li
                key={system.name}
                className="bg-au-band border-ip-card rounded-pill text-body-md text-ink inline-flex min-h-10 items-center gap-3 border pr-4.5 pl-3 font-semibold"
              >
                {/* Height-driven with `w-auto`, like the partner logos above:
                    a fixed box would letterbox a wide wordmark into the same
                    width as a stacked one. */}
                {system.image?.src && (
                  <Image
                    src={system.image.src}
                    alt={system.image.alt}
                    width={system.image.width ?? 200}
                    height={system.image.height ?? 40}
                    /* 192, not the ~96 these are drawn at: a mark served at
                       its display width is undersampled on a 2x screen, and the
                       optimizer's rounding of a 96px-wide bitmap shifts the
                       aspect enough to move a wide wordmark 2px. */
                    sizes="192px"
                    className={`w-auto flex-none object-contain ${
                      CORE_MARK[system.mark] ?? CORE_MARK.default
                    }`}
                  />
                )}
                <span
                  aria-hidden="true"
                  className="bg-ip-divider h-5 w-px flex-none"
                />
                {system.name}{" "}
                <em className="text-muted font-medium not-italic">
                  ({system.vendor})
                </em>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
