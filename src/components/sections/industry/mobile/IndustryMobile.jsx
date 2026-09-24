import LogoGrid from "@/components/sections/LogoGrid";
import Decisions from "@/components/sections/industry/Decisions";
import Metrics from "@/components/sections/Metrics";
import { SECTION_VARIANT } from "@/components/sections/product/product.constants";
import GapMobile from "./GapMobile";
import MappingMobile from "./MappingMobile";

/**
 * The whole of an industry page below the mobile breakpoint.
 *
 * The four industry pages are one template that differs only in content — the
 * handoff says so outright ("the same seven sections in the same order... build
 * the shared shell once") — so there is one composition and four pages passing
 * their own content. No variant, no flags.
 *
 * The hero stays with the page component: it is the same shared component on
 * all four, so its mobile treatment lives there rather than being duplicated.
 *
 * LogoGrid, Decisions and Metrics reflow rather than rearrange — Decisions
 * already measured within 13px of the mock — so they keep serving both
 * widths instead of being copied here.
 */
export default function IndustryMobile({ content }) {
  return (
    <div className="mob:hidden">
      <LogoGrid />
      <GapMobile {...content.gap} />
      <Decisions {...content.decisions} />
      <MappingMobile {...content.mapping} />
      <Metrics {...content.metricsBand} variant={SECTION_VARIANT.INDUSTRY} />
    </div>
  );
}
