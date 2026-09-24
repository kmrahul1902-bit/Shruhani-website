import HeroAnimation from "@/components/shared/HeroAnimation";
import Button from "@/components/ui/Button";
import { SUITE_TITLE, FLOW_ASPECT } from "./products.constants";

/**
 * The three suites on a phone (mobile v2, "Three intelligence suites").
 *
 * `mobileSub` isn't in our baked content — reuses each panel's own
 * `tabSub` (a short caption already written for this exact purpose, e.g.
 * "Onboarding & verification"), rather than inventing new copy.
 */
export default function ProductStack({ panels }) {
  return (
    <div className="mob:hidden">
      {panels.map((panel) => (
        <article
          key={panel.key}
          className="border-hairline mb-10 flex flex-col items-center border-b pb-10 text-center last:mb-0 last:border-b-0 last:pb-0"
        >
          <p className="flex flex-col gap-1">
            <b className={`text-body-lg font-bold ${SUITE_TITLE[panel.key]}`}>
              {panel.tabLabel}
            </b>
            <i className="text-caption text-faint not-italic">{panel.tabSub}</i>
          </p>

          {panel.animation && (
            <div
              className={`-mx-5 mt-4 mb-3 w-screen overflow-hidden ${FLOW_ASPECT[panel.key]}`}
            >
              <HeroAnimation
                slug={panel.animation}
                title={panel.media?.alt}
                className="pointer-events-none h-full w-full"
                frame={{ height: "100%" }}
              />
            </div>
          )}

          <h3 className="text-title-3 text-ink mb-3 font-bold">
            {panel.heading.replace("\n", " ")}
          </h3>
          <p className="text-body-md text-body text-pretty">{panel.body}</p>

          <Button
            href={panel.href}
            variant="outline"
            size="action-sm"
            className="mt-4.5"
          >
            {panel.linkLabel}
          </Button>
        </article>
      ))}
    </div>
  );
}
