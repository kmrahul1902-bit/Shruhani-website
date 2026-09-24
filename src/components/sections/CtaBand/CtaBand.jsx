import Button from "@/components/ui/Button";
import { ctaContent } from "./cta.content";

/**
 * The closing CTA — every page's last ask. Server Component.
 *
 * Simplified from the reference: the rotating globe animation (HeroAnimation
 * iframe) is dropped for Phase 2 — that's Phase 7 animation-system scope and
 * no animation assets are wired yet. Copy + buttons only.
 */
export default function CtaBand() {
  const cta = ctaContent;
  const buttons = cta.buttons ?? [
    { label: cta.buttonLabel, href: cta.buttonHref },
  ];

  return (
    <section
      id="demo"
      className="bg-cta-band container-fluid max-mob:px-5 max-mob:pt-11 max-mob:pb-12 relative overflow-hidden pt-24 pb-25"
    >
      <div className="mx-auto flex max-w-320 items-center justify-between gap-14">
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
      </div>
    </section>
  );
}
