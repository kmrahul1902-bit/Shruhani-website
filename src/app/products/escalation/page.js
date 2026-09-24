import Hero from "@/components/sections/escalation/Hero";
import ProductMobile from "@/components/sections/product/mobile/ProductMobile";
import LogoGrid from "@/components/sections/LogoGrid";
import Gap from "@/components/sections/product/Gap";
import HowItWorks from "@/components/sections/product/HowItWorks";
import SignalLayers from "@/components/sections/product/SignalLayers";
import Toolkit from "@/components/sections/product/Toolkit";
import Threats from "@/components/sections/product/Threats";
import Metrics from "@/components/sections/Metrics";
import {
  SECTION_VARIANT,
  enrichProductContent,
} from "@/components/sections/product/product.constants";
import { getContent } from "@/lib/content";

export function generateMetadata() {
  const { seo } = getContent("escalation");
  return { title: seo.metaTitle, description: seo.metaDescription };
}

/**
 * Escalation (content displays it as "EscalationX" — kept as-is per the
 * Phase 0 naming decision) — section order matches the reference's own page.
 *
 * Structurally this is the Cortex page: same bento, step flow, capability
 * grid, dark toolkit, metrics band. Only the hero is its own.
 *
 * Adapted from the reference: plain `metadata`/sync `getContent` (no CMS/
 * routes registry — see plan/CLAUDE.md → Decisions); no `PageSchema` (Phase 8
 * scope). `enrichProductContent` patches in the `key`s our baked JSON doesn't
 * carry — see product.constants.js.
 */
export default function EscalationPage() {
  const content = enrichProductContent(getContent("escalation"), "escalation");

  return (
    <div data-accent="escalation">
      <Hero hero={content.hero} demoHref="/book-a-demo" />
      {/* Below 620px the page is its own composition rather than the
          desktop sections reflowed — see product/mobile. Inside the accent
          wrapper, so the mobile sections read the same Escalation tokens. */}
      <ProductMobile
        content={content}
        demoHref="/book-a-demo"
        personaVariant={SECTION_VARIANT.ESCALATION}
      />

      <div data-desktop-sections className="max-mob:hidden">
        <LogoGrid />
        <Gap {...content.gap} />
        <HowItWorks {...content.howItWorks} demoHref="/book-a-demo" />
        <SignalLayers
          {...content.personaLayers}
          variant={SECTION_VARIANT.ESCALATION}
        />
        <Toolkit {...content.toolkit} />
        <Metrics {...content.metricsBand} variant={SECTION_VARIANT.INLINE} />
        <Threats {...content.threats} />
      </div>
    </div>
  );
}
