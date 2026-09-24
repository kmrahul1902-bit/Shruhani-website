import Image from "next/image";
import Button from "@/components/ui/Button";

function ArrowRightIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

/**
 * "How Cortex works" — an illustrated intro beside the copy, then the three
 * layers it runs in (mockup .howx).
 *
 * The heading is 40px, not the page's usual 42: the mockup overrides it inline
 * here because the intro shares its row with a 700px illustration, and the extra
 * 2px pushed the third line into the artwork.
 *
 * The step cards are an ordered list — observe, detect, act is a sequence, so
 * the markup says so rather than leaving it to visual order.
 *
 * Server Component.
 */
/**
 * Cortex overrides the heading to 40px inline because its intro shares a row
 * with a 700px-tall illustration; ScreenX leaves the section on the page's
 * standard 42px and runs a wider, shorter visual instead. The step cards
 * follow: ScreenX sets shorter plates and smaller, non-wrapping titles because
 * its three titles are longer.
 */
const VARIANTS = {
  cortex: {
    frame: "min-h-140 p-5",
    visual: "max-h-175 w-auto",
    heading: "text-display-2 font-semibold tracking-display",
    steps: "gap-10",
    plate: "h-55",
    title: "text-body-lg font-bold tracking-snug",
  },
  screenx: {
    frame: "min-h-140 px-8.5 py-10",
    visual: "w-full max-w-145",
    heading: "text-display-2 font-semibold tracking-display",
    steps: "gap-x-12 gap-y-14",
    plate: "h-50",
    title: "text-body-md font-bold tracking-snug whitespace-nowrap",
  },
};

export default function HowItWorks({
  heading,
  sub,
  ctaLabel,
  visual,
  steps,
  demoHref,
  variant = "cortex",
}) {
  const styles = VARIANTS[variant];
  return (
    <section className="max-bento:px-9 max-bento:py-20 max-flow:px-5.5 max-flow:py-16 mx-auto max-w-330 px-20 pt-27.5 pb-25">
      <div className="max-bento:grid-cols-1 max-bento:gap-10 grid grid-cols-2 items-center gap-18">
        <div
          className={`rounded-frame max-bento:min-h-90 flex items-center justify-center ${styles.frame}`}
        >
          {visual?.src && (
            <Image
              src={visual.src}
              alt={visual.alt}
              width={1254}
              height={1254}
              sizes="(max-width: 1080px) 90vw, 45vw"
              className={`rounded-lg bg-white object-contain ${styles.visual}`}
            />
          )}
        </div>

        <div className="flex flex-col">
          <h2 className={`text-ink text-balance ${styles.heading}`}>
            {heading}
          </h2>
          <p className="text-body-md text-body mt-5.5 max-w-130">{sub}</p>
          <Button
            href={demoHref}
            variant="dark"
            size="block"
            className="mt-12 self-start"
          >
            {ctaLabel}
            <ArrowRightIcon />
          </Button>
        </div>
      </div>

      <ol
        className={`max-bento:grid-cols-2 max-bento:mt-14 max-bento:gap-x-7 max-bento:gap-y-8 max-flow:grid-cols-1 mt-22 grid grid-cols-3 ${styles.steps}`}
      >
        {steps.map((step) => (
          <li
            key={step.key}
            className="rounded-card shadow-feature group flex flex-col items-stretch overflow-hidden bg-white"
          >
            <div
              className={`bg-surface-plate flex items-center justify-center transition-transform duration-250 group-hover:-translate-y-1 ${styles.plate}`}
            >
              {step.image?.src && (
                <Image
                  src={step.image.src}
                  alt={step.image.alt}
                  width={1000}
                  height={1000}
                  sizes="180px"
                  className="w-45 object-contain"
                />
              )}
            </div>
            <div className="px-7 pt-6 pb-7">
              <h3 className={`text-ink ${styles.title}`}>{step.title}</h3>
              <p className="text-body-sm text-muted mt-2.5">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
