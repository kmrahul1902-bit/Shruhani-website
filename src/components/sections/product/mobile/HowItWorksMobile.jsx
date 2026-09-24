import Image from "next/image";
import Button from "@/components/ui/Button";

/**
 * "How it works" on a phone (product mobile handoffs).
 *
 * Reads top to bottom in the order the design gives it: title, visual, body,
 * the three feature cards, then the action. The desktop section is a two-column
 * block with the action beside the copy — the handoff moves it with a script
 * because it cannot be reordered across parents in CSS. Here the order is just
 * the order, which is the point of building the mobile layout separately.
 */
export default function HowItWorksMobile({
  heading,
  sub,
  ctaLabel,
  visual,
  steps,
  demoHref,
}) {
  return (
    <section className="mx-auto px-4.5 pt-14 pb-15 text-center">
      <h2 className="text-title-2 text-ink text-balance">{heading}</h2>

      {visual?.src && (
        <Image
          src={visual.src}
          alt={visual.alt}
          width={1254}
          height={1254}
          sizes="300px"
          className="mx-auto mt-4.5 mb-1 block h-auto w-75 rounded-lg bg-white object-contain"
        />
      )}

      <p className="text-body-md text-body mt-3.5">{sub}</p>

      <ol className="mt-11 flex flex-col gap-5.5">
        {steps.map((step) => (
          <li
            key={step.key}
            className="rounded-card shadow-feature flex flex-col overflow-hidden bg-white"
          >
            {step.image?.src && (
              <div className="bg-surface-plate flex h-42 items-center justify-center">
                <Image
                  src={step.image.src}
                  alt={step.image.alt}
                  width={1000}
                  height={1000}
                  sizes="180px"
                  className="w-45 object-contain"
                />
              </div>
            )}
            <div className="px-5.5 pt-5 pb-6">
              <h3 className="text-body-md text-ink font-bold">{step.title}</h3>
              <p className="text-body-sm text-muted mt-2.5">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <Button
        href={demoHref}
        variant="dark"
        size="block"
        className="text-body-md mt-7.5 w-full justify-center font-bold"
      >
        {ctaLabel}
      </Button>
    </section>
  );
}
