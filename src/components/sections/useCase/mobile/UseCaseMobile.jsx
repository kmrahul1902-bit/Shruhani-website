import LogoGrid from "@/components/sections/LogoGrid";
import Metrics from "@/components/sections/Metrics";
import CapabilitiesMobile from "./CapabilitiesMobile";
import ScenariosMobile from "./ScenariosMobile";
import SplitMobile from "./SplitMobile";

/**
 * The whole of a use-case page below the mobile breakpoint.
 *
 * The four use-case pages are ONE template that differs only in content — the
 * handoff is explicit that they share a single mobile layer and that a change
 * to one is a change to all four — so there is one composition here and four
 * pages passing their own content to it. No variant, no flags.
 *
 * The hero stays with the page component: it is the same shared component on
 * all four, so its mobile treatment lives there rather than being duplicated.
 *
 * LogoGrid and Metrics reflow rather than rearrange — one column, different
 * type — so they keep serving both widths instead of being copied here.
 */
export default function UseCaseMobile({ content }) {
  return (
    <div className="mob:hidden">
      <LogoGrid />
      <SplitMobile {...content.split} />
      <ScenariosMobile {...content.scenarios} />
      <CapabilitiesMobile {...content.capabilities} />
      <Metrics {...content.metricsBand} variant="useCase" />
    </div>
  );
}
