import LogoGrid from "@/components/sections/LogoGrid";
import Metrics from "@/components/sections/Metrics";
import { SECTION_VARIANT } from "../product.constants";
import DecisionsMobile from "./DecisionsMobile";
import GapMobile from "./GapMobile";
import HowItWorksMobile from "./HowItWorksMobile";
import PersonaMobile from "./PersonaMobile";
import ToolkitMobile from "./ToolkitMobile";

/**
 * The whole of a product page below the mobile breakpoint.
 *
 * ScreenX, Cortex and Escalation share 27 of their 30 mobile type rules, so
 * they share this composition and differ only in the content passed to it and
 * in one ordering flag — the same relationship their desktop pages already have
 * through `variant`.
 *
 * The hero stays with the page: each has its own artwork and its own headline
 * treatment, and it is the one section the three do not share.
 *
 * LogoGrid, Metrics and Testimonials are the shared sections whose mobile
 * design is a reflow rather than a rearrangement — one column, different type —
 * so they keep serving both widths rather than being duplicated here.
 */
export default function ProductMobile({
  content,
  demoHref,
  accent,
  threatsFirst = false,
  personaVariant,
}) {
  const metricsBand = (
    <Metrics {...content.metricsBand} variant={SECTION_VARIANT.INLINE} />
  );
  const threatGrid = <DecisionsMobile {...content.threats} />;

  // The handoff scopes its whole mobile layer to max-width: 620px, so that is
  // where this composition gives way to the desktop sections — the same
  // breakpoint the hero animation switches on, so a page never serves half of
  // each design.
  return (
    <div className="mob:hidden">
      <LogoGrid />
      <GapMobile {...content.gap} accent={accent} />
      <HowItWorksMobile {...content.howItWorks} demoHref={demoHref} />
      <PersonaMobile {...content.personaLayers} variant={personaVariant} />
      <ToolkitMobile {...content.toolkit} />
      {/* Cortex runs the threat grid BEFORE the metrics band; ScreenX and
          Escalation reverse it. Each page's mobile order is its own desktop
          order — the design reorders the page, not the phone — so this mirrors
          what the page component already lays out rather than inventing a
          second source of truth for it. */}
      {threatsFirst ? threatGrid : metricsBand}
      {threatsFirst ? metricsBand : threatGrid}
    </div>
  );
}
