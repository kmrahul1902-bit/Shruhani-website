import HeroAnimation from "@/components/shared/HeroAnimation";
import Button from "@/components/ui/Button";
import { ctaContent } from "./cta.content";

/**
 * The closing CTA — every page's last ask. Server Component.
 *
 * The rotating wireframe globe (post-build) restores the reference's layout
 * byte-for-byte — hung off the band's bottom-right corner, clipped, hidden
 * below the mobile breakpoint. It was dropped in Phase 2 pending Phase 7's
 * animation assets; `public/animations/cta-globe.html` has existed since
 * Phase 7 but this component was never updated to point at it. Adapted from
 * the reference: `cta` comes from this project's own `cta.content.js`
 * (no CMS/routes registry — see plan/CLAUDE.md → Decisions) rather than a
 * prop, so every caller stays `<CtaBand />` with no arguments.
 */
export default function CtaBand() {
  const cta = ctaContent;
  const buttons = cta.buttons ?? [
    { label: cta.buttonLabel, href: cta.buttonHref },
  ];

  return (
    <section
      id="demo"
      className="bg-cta-band container-fluid max-nav:min-h-110 max-mob:min-h-0 max-mob:px-5 max-mob:pt-11 max-mob:pb-12 relative min-h-130 overflow-hidden pt-24 pb-25"
    >
      <div className="max-nav:gap-10 max-mob:flex-col max-mob:items-start mx-auto flex max-w-320 items-center justify-between gap-14">
        <div className="relative z-1 max-w-160">
          <h2 className="text-display-2 tracking-display max-mob:text-title-3 text-cta-ink max-mob:whitespace-normal font-semibold whitespace-pre-line">
            {cta.headline}
          </h2>
          <p className="text-body-md text-cta-sub mt-5 max-w-135">{cta.sub}</p>
          <div className="max-mob:flex-col max-mob:items-stretch mt-9 flex flex-wrap gap-3.5">
            {buttons.map(({ label, href }, i) => (
              <Button
                key={label}
                href={href}
                variant={i === 0 ? "primary" : "outline"}
                className={
                  i === 0
                    ? "shadow-blue-glow hover:bg-blue-band-hover max-mob:w-full max-mob:justify-center px-6"
                    : "max-mob:w-full max-mob:justify-center px-6"
                }
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* The globe is decoration: hung off the corner, clipped by the band,
            and hidden entirely below the mobile breakpoint where there is no
            room for it beside the copy. */}
        <div
          aria-hidden="true"
          className="max-nav:-right-36 max-nav:-bottom-36 max-nav:size-135 max-mob:hidden pointer-events-none absolute -right-45 -bottom-45 z-0 size-165"
        >
          <HeroAnimation
            slug="cta-globe"
            title="Rotating global signal network"
            className="size-full"
            frame={{ height: "100%" }}
          />
        </div>
      </div>
    </section>
  );
}
