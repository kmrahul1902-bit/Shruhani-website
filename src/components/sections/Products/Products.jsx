import HeroAnimation from "@/components/shared/HeroAnimation";
import Button from "@/components/ui/Button";
import ProductStack from "./ProductStack";
import { SUITE_CARD_MIN_H, PRODUCT_META } from "./products.constants";

/**
 * What each suite's card looks like and where it comes to rest.
 */
const SUITE = {
  screenx: {
    top: "nav:top-25",
    surface: "bg-panel-screenx border-prod-screenx/42",
    aspect: "aspect-flow-screenx",
  },
  cortex: {
    top: "nav:top-31",
    surface: "bg-panel-cortex border-prod-cortex/40",
    aspect: "aspect-flow-cortex",
  },
  escalation: {
    top: "nav:top-37",
    surface: "bg-panel-escalation border-prod-escalation/42",
    aspect: "aspect-flow-escalation",
  },
};

/**
 * The three suites — every one of them on the page, stacked.
 *
 * Adapted from the reference: `panels` is the baked copy (`home.json`'s
 * `productShowcase.panels`), which carries no route/key/animation — merged
 * here with `PRODUCT_META` by array position (both are ScreenX → Cortex →
 * Escalation order).
 *
 * Server Component. With the selection gone there is nothing here for the
 * browser to decide.
 */
export default function Products({ heading, sub, panels: content }) {
  const panels = content.map((panel, i) => ({ ...panel, ...PRODUCT_META[i] }));

  return (
    <section className="container-fluid max-mob:px-5 relative overflow-x-clip bg-white pt-10 pb-25">
      <div className="max-mob:mb-0 mb-12 text-center">
        <h2 className="text-display-2 max-mob:text-title-3 text-ink mx-auto mb-4 w-194.25 max-w-full font-semibold whitespace-pre-line">
          {heading}
        </h2>
        <p className="text-body-md max-mob:text-body-md text-body mx-auto max-w-190">
          {sub}
        </p>
      </div>

      <ProductStack panels={panels} />

      <div className="max-mob:hidden mt-13 flex flex-col gap-9 pb-15">
        {panels.map((item) => {
          const suite = SUITE[item.key];
          return (
            <div
              key={item.key}
              className={`rounded-visual ${suite.top} ${suite.surface} ${SUITE_CARD_MIN_H} sticky grid grid-cols-[minmax(0,360px)_minmax(0,1fr)] items-center gap-10 border p-10`}
            >
              <div className="text-left">
                <h3 className="text-title-1 text-ink font-bold whitespace-pre-line">
                  {item.heading}
                </h3>
                <p className="text-body-md text-body mt-4">{item.body}</p>
                <Button
                  href={item.href}
                  variant="outline"
                  size="action"
                  className="mt-7"
                >
                  {item.linkLabel}
                </Button>
              </div>

              {item.animation && (
                <div className="aspect-flow-stack flex w-full min-w-0 items-center">
                  <div className={`${suite.aspect} w-full`}>
                    <HeroAnimation
                      slug={item.animation}
                      title={item.media?.alt}
                      className="h-full w-full"
                      frame={{ height: "100%" }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
