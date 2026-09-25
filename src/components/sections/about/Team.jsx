import Image from "next/image";
import Reveal from "@/components/shared/Reveal";
import { SECTION_TIGHT } from "./about.constants";

/**
 * Our team — four function cards and the group photograph below them.
 *
 * The group photograph is wired (post-build) to a real office photo.
 *
 * TODO(content): the four function cards' `.image` are not wired — the live
 * site's CDN icons for Product Engineering/Data Science/Banking &
 * Compliance/Platform Security are 3D podium-render illustrations (glossy
 * highlights, drop shadows, blue), banned outright by CLAUDE.md § Art
 * Direction regardless of color — same conflict as the product/module pages
 * (see `product/SignalLayers/SignalLayers.jsx`'s note).
 */
export default function Team({ team }) {
  return (
    <section className={SECTION_TIGHT}>
      <Reveal
        as="h2"
        className="text-display-2 tracking-display font-display text-ink mt-4.5"
      >
        {team.h2}
      </Reveal>

      <ul className="max-bento:grid-cols-2 max-flow:grid-cols-1 mt-13 grid grid-cols-4 gap-4">
        {team.functions.map((fn, index) => (
          <Reveal
            as="li"
            key={fn.title}
            delayIndex={index}
            className="bg-au-band border-border-faint rounded-au-badge border px-6.5 py-7"
          >
            <span className="relative mb-4 block size-14">
              {fn.image?.src && (
                <Image
                  src={fn.image.src}
                  alt={fn.image.alt}
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              )}
            </span>
            <b className="text-body-md tracking-snug font-display text-ink block font-bold">
              {fn.title}
            </b>
            <p className="text-body-sm text-body mt-2.5">{fn.description}</p>
          </Reveal>
        ))}
      </ul>

      {/* The handoff gives this a flat 400px height, and at desktop that IS the
          photograph's own 3:1 — 1240px wide over 400px tall. It stops being so
          the moment the page narrows: the box keeps its 400px while the width
          falls away, so object-cover crops the sides ever harder and a group
          photo loses the people standing at its ends. Measured before this:
          97% of the frame visible at 1440, 57% at 768, 23% at 320.

          The ratio is the real rule and the height is its consequence, so state
          it that way and cap it at what the handoff drew. Height becomes
          min(width / 3, 400px): identical at 1200 and above, and below that the
          photo gets shorter instead of losing its edges.

          w-full is not redundant. With an auto width, a capped height feeds
          back through the ratio and narrows the box — the band came out 1200px
          inside a 1240px column. Pinning the width leaves the cap to act on
          height alone. */}
      <Reveal className="rounded-au-card bg-surface-3 relative mt-6.5 aspect-3/1 max-h-100 w-full min-w-0 overflow-hidden">
        {team.photo?.src && (
          <Image
            src={team.photo.src}
            alt={team.photo.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}
      </Reveal>
    </section>
  );
}
