import Image from "next/image";
import MaybeLink from "@/components/ui/MaybeLink";
import { INDUSTRY_META } from "./industries.constants";

/**
 * Industry cards — dark section, four 3:4 photo tiles with a legibility scrim
 * and copy anchored to the bottom.
 *
 * Adapted from the reference: `industries` is the baked copy (`home.json`'s
 * `industryGrid.industries`), merged here with `INDUSTRY_META` by array
 * position.
 *
 * Server Component: the hover lift, photo zoom and arrow nudge are all CSS.
 */
export default function Industries({
  heading,
  sub,
  industries: content,
  navLabel,
}) {
  const industries = content.map((item, i) => ({
    ...item,
    ...INDUSTRY_META[i],
  }));

  return (
    <section className="bg-dark container-fluid max-mob:px-5 max-nav:pt-10 max-nav:pb-20 relative pt-25 pb-30">
      <div className="mb-12 text-center">
        <h2 className="text-display-2 tracking-snug max-nav:text-title-3 max-mob:text-title-3 mb-3 font-bold font-semibold text-white">
          {heading}
        </h2>
        <p className="text-body-md max-mob:text-body-md mx-auto max-w-155 text-white/65">
          {sub}
        </p>
      </div>

      <ul
        aria-label={navLabel}
        className="max-mob:grid-cols-1 max-nav:grid-cols-2 max-nav:gap-3.5 max-mob:gap-4 grid grid-cols-4 gap-5"
      >
        {industries.map((item) => (
          <li key={item.key}>
            <MaybeLink
              href={item.href}
              className="focus-ring rounded-card shadow-tile hover:shadow-tile-hover group relative block aspect-3/4 overflow-hidden text-white transition duration-250 hover:-translate-y-1.5"
            >
              {item.image?.src && (
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 320px"
                  className="object-cover transition-transform duration-600 group-hover:scale-104"
                />
              )}
              <span className="photo-scrim absolute inset-0" />
              <span className="absolute inset-x-0 bottom-0 block p-5.5">
                <span className="text-body-lg tracking-snug mb-2.5 flex items-center gap-2 font-bold">
                  {item.title}
                  <span
                    aria-hidden="true"
                    className="text-body-lg tracking-snug font-bold font-extrabold opacity-95 transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
                <span className="text-body-sm block max-w-65 text-white/85">
                  {item.description}
                </span>
                <span className="text-eyebrow font-display mt-3 block max-w-65 border-t border-white/18 pt-3 font-semibold text-white/90">
                  <b className="text-cyan-soft font-extrabold">
                    {item.statValue}
                  </b>{" "}
                  {item.statLabel}
                </span>
              </span>
            </MaybeLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
