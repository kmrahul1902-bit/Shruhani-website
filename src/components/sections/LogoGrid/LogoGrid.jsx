import Image from "next/image";
import Marquee from "@/components/shared/Marquee";
import { clientLogos, logoStripEyebrow } from "./logoGrid.constants";

/**
 * Partner logo band — static 7-column grid (mockup .logo-grid-sec). Two marks
 * render taller (52px vs 40px) because their wordmarks carry more whitespace;
 * that is `tall` in the roster.
 *
 * Adapted from the reference: the roster + caption come from a local
 * constants file instead of `getShellContent()` (no CMS in this project —
 * see plan/CLAUDE.md → Decisions). Server Component: no interactivity.
 */
export default function LogoGrid({ eyebrow }) {
  return <LogoBand eyebrow={eyebrow ?? logoStripEyebrow} logos={clientLogos} />;
}

const MOBILE_ROWS = 2;
const LOGO_SIZES = "(max-width: 520px) 96px, (max-width: 900px) 120px, 160px";
const splitRows = (logos) => {
  const perRow = Math.ceil(logos.length / MOBILE_ROWS);
  return [logos.slice(0, perRow), logos.slice(perRow)];
};

export function LogoBand({ eyebrow, logos }) {
  const visible = logos.filter((logo) => logo.src);

  // No logo has a `src` yet (see logoGrid.constants.js) — render the caption
  // alone rather than an empty grid/marquee shell.
  if (visible.length === 0) {
    return (
      <section className="max-mob:px-4.5 max-mob:pt-6.5 max-mob:pb-10 bg-white px-10 pt-16 pb-20">
        <div className="mx-auto max-w-330">
          <p className="text-footer-faint text-body-sm tracking-label text-center font-semibold uppercase">
            {eyebrow}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-mob:px-4.5 max-mob:pt-6.5 max-mob:pb-10 bg-white px-10 pt-16 pb-20">
      <div className="mx-auto max-w-330">
        <p className="text-footer-faint text-body-sm tracking-label mb-10 text-center font-semibold uppercase">
          {eyebrow}
        </p>

        <div className="mob:hidden flex flex-col gap-6">
          {splitRows(visible).map((row, index) => (
            <Marquee key={row[0]?.src ?? index} label={eyebrow}>
              {row.map((logo) => (
                <Image
                  key={logo.src}
                  src={logo.src}
                  alt={logo.alt}
                  width={600}
                  height={200}
                  sizes={LOGO_SIZES}
                  className="h-6.75 w-auto max-w-40 object-contain"
                />
              ))}
            </Marquee>
          ))}
        </div>

        <ul className="max-mob:hidden max-monitor:grid-cols-5 max-monitor:gap-x-7 max-monitor:gap-y-10 max-logos:grid-cols-4 max-xs:grid-cols-3 max-logos:gap-x-6 max-logos:gap-y-9 grid grid-cols-7 items-center justify-items-center gap-x-8 gap-y-12">
          {visible.map((logo) => (
            <li key={logo.src}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={600}
                height={200}
                sizes={LOGO_SIZES}
                className={`max-logos:h-8 drop-shadow-logo w-auto max-w-40 object-contain ${
                  logo.tall ? "h-15.5" : "h-12"
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
