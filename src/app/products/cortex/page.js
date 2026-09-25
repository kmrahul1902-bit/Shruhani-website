import Hero from "@/components/sections/cortex/Hero";
import ProductMobile from "@/components/sections/product/mobile/ProductMobile";
import LogoGrid from "@/components/sections/LogoGrid";
import Gap from "@/components/sections/product/Gap";
import HowItWorks from "@/components/sections/product/HowItWorks";
import SignalLayers from "@/components/sections/product/SignalLayers";
import Toolkit from "@/components/sections/product/Toolkit";
import Threats from "@/components/sections/product/Threats";
import Metrics from "@/components/sections/Metrics";
import PageSchema from "@/components/shared/PageSchema";
import {
  SECTION_VARIANT,
  enrichProductContent,
} from "@/components/sections/product/product.constants";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata() {
  const { seo } = getContent("cortex");
  return buildMetadata({
    title: seo.metaTitle,
    description: seo.metaDescription,
    path: "/products/cortex",
  });
}

/**
 * Cortex — section order matches the reference's own page.
 *
 * `data-accent="cortex"` re-themes the page from one attribute (Phase 1):
 * the hero wash, the toolkit glyphs and the bento's emphasis all read the
 * accent tokens, so nothing below sets a product colour itself.
 *
 * Adapted from the reference: plain `metadata`/sync `getContent` (no CMS/
 * routes registry — see plan/CLAUDE.md → Decisions). `enrichProductContent`
 * patches in the `key`s our baked JSON doesn't carry — see
 * product.constants.js.
 */
export default function CortexPage() {
  const content = enrichProductContent(getContent("cortex"), "cortex");

  return (
    <div data-accent="cortex">
      <PageSchema path="/products/cortex" seo={content.seo} />
      <Hero hero={content.hero} demoHref="/book-a-demo" />
      {/* Below 620px the page is its own composition rather than the
          desktop sections reflowed — see product/mobile. Inside the accent
          wrapper, so the mobile sections read the same Cortex tokens. */}
      <ProductMobile content={content} demoHref="/book-a-demo" threatsFirst />

      <div data-desktop-sections className="max-mob:hidden">
        <LogoGrid />
        <Gap {...content.gap} />
        <HowItWorks {...content.howItWorks} demoHref="/book-a-demo" />
        <SignalLayers {...content.personaLayers} />
        <Toolkit {...content.toolkit} />
        <Threats {...content.threats} />
        <Metrics {...content.metricsBand} variant={SECTION_VARIANT.INLINE} />
      </div>
    </div>
  );
}
