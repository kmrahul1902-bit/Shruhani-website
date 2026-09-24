import Image from "next/image";
import Button from "@/components/ui/Button";
import { ArrowRightIcon } from "./useCases.icons";
import {
  AccentHeading,
  USE_CASE_ILLUSTRATION_SIZES,
  USE_CASE_ILLUSTRATION_RATIO,
} from "./useCases.helpers";
import { USE_CASE_META } from "./useCases.constants";

/**
 * Each panel fades into its own case colour. The utilities are named per case
 * rather than composed from the key so a new case fails visibly here instead of
 * rendering a panel with no wash at all.
 */
const CASE_WASH = {
  fraud: "case-wash-fraud",
  onboarding: "case-wash-onboarding",
  creditrisk: "case-wash-creditrisk",
  compliance: "case-wash-compliance",
};

/**
 * The hero's four use cases, every one of them laid out at once.
 *
 * Adapted from the reference: `items` is the baked copy (`home.json`'s
 * `useCases` array), which carries no route/tone/tags — merged here with
 * `USE_CASE_META` by array position (both are in the same fraud → onboarding
 * → credit-risk → compliance order). No `tags`/`illustration` are rendered
 * since the baked content has neither (nothing fabricated).
 */
export default function UseCases({ items }) {
  return (
    <div>
      <div className="max-card:grid-cols-1 max-mob:mt-6.5 max-mob:gap-3.5 mx-auto mt-14 grid max-w-332.5 grid-cols-2 gap-12">
        {items.map((content, i) => {
          const item = { ...content, ...USE_CASE_META[i] };
          return (
            <div
              key={item.key}
              className={`border-border-firm rounded-panel max-mob:px-4 max-mob:pt-5 flex flex-col overflow-hidden border px-6.5 pt-6 text-left ${CASE_WASH[item.key]}`}
            >
              <p className="text-eyebrow text-ink mb-3 uppercase">
                {item.tabLabel}
              </p>

              <ul className="max-mob:mb-4.5 mb-5.5 flex flex-wrap gap-2">
                {item.tags?.map((tag) => (
                  <li
                    key={tag}
                    className="text-eyebrow border-border-tag text-strong rounded-tag border px-2.5 py-1 font-semibold whitespace-nowrap"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="flex flex-1 flex-col gap-5.5">
                <div className="flex flex-1 flex-col">
                  <p className="text-title-3 max-mob:text-title-3 text-ink font-bold">
                    <AccentHeading
                      heading={item.heading}
                      accentPhrase={item.accentPhrase}
                      tone={item.tone}
                    />
                  </p>
                  <p className="border-border-hair text-body-md max-mob:text-body-md text-strong mt-4 border-t pt-4.5 text-pretty">
                    {item.body}
                  </p>
                  <Button
                    href={item.href}
                    variant="outline"
                    size="action-sm"
                    className="mt-5 self-start"
                  >
                    {item.linkLabel}
                    <ArrowRightIcon />
                  </Button>
                </div>

                <div className="max-mob:mx-0 max-mob:min-h-0 -mx-6.5 flex min-h-55 items-center justify-center">
                  {item.illustration?.src && (
                    <Image
                      src={item.illustration.src}
                      alt={item.illustration.alt}
                      width={
                        item.illustration.width ??
                        USE_CASE_ILLUSTRATION_RATIO.width
                      }
                      height={
                        item.illustration.height ??
                        USE_CASE_ILLUSTRATION_RATIO.height
                      }
                      sizes={USE_CASE_ILLUSTRATION_SIZES}
                      priority={i === 0}
                      className="drop-shadow-case-photo max-mob:drop-shadow-none max-mob:w-full max-mob:max-w-full mx-auto block h-auto w-22/25 max-w-22/25"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
