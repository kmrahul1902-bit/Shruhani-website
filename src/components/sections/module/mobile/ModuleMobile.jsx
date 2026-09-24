import LogoGrid from "@/components/sections/LogoGrid";
import { MODULE_LABELS } from "../module.labels";
import AppliesMobile from "./AppliesMobile";
import GapMobile from "./GapMobile";
import IntegrationMobile from "./IntegrationMobile";
import OutputsMobile from "./OutputsMobile";
import ReaderMobile from "./ReaderMobile";

/**
 * The whole of a module page below the mobile breakpoint. All six modules
 * share this one composition. `layout` is the small set of per-module
 * differences the mockups carry (see modulePage.constants.js).
 */
export default function ModuleMobile({ content, layout = {} }) {
  return (
    <div className="mob:hidden">
      <LogoGrid />
      <GapMobile {...content.gap} />
      <ReaderMobile {...content.reader} frameRatio={layout.readerMobileFrame} />
      <OutputsMobile {...content.outputs} />
      <AppliesMobile {...content.applies} />
      <IntegrationMobile
        {...content.integration}
        labels={{
          prev:
            content.labels?.integrationPrev ?? MODULE_LABELS.integrationPrev,
          next:
            content.labels?.integrationNext ?? MODULE_LABELS.integrationNext,
        }}
      />
    </div>
  );
}
