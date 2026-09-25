import Hero from "@/components/sections/screenx/Hero";
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
  const { seo } = getContent("screenx");
  return buildMetadata({
    title: seo.metaTitle,
    description: seo.metaDescription,
    path: "/products/screenx",
  });
}

/**
 * ScreenX — section order matches the reference's own page.
 *
 * No `data-accent` wrapper: ScreenX IS the default pink the tokens define
 * (Phase 1), so the page themes itself by not overriding anything.
 *
 * Adapted from the reference: plain `metadata`/sync `getContent` (no CMS/
 * routes registry — see plan/CLAUDE.md → Decisions). `enrichProductContent`
 * patches in the `key`s our baked JSON doesn't carry — see
 * product.constants.js.
 */
export default function ScreenxPage() {
  const content = enrichProductContent(getContent("screenx"), "screenx");

  return (
    <>
      <PageSchema path="/products/screenx" seo={content.seo} />
      <Hero hero={content.hero} demoHref="/book-a-demo" />
      {/* Below 620px the page is its own composition rather than the desktop
          sections reflowed — see product/mobile. The desktop sections are
          untouched by mobile work, which is the point of the split. */}
      <ProductMobile content={content} demoHref="/book-a-demo" />

      <div data-desktop-sections className="max-mob:hidden">
        <LogoGrid />
        <Gap {...content.gap} variant={SECTION_VARIANT.SCREENX} />
        <HowItWorks
          {...content.howItWorks}
          demoHref="/book-a-demo"
          variant={SECTION_VARIANT.SCREENX}
        />
        <SignalLayers {...content.personaLayers} />
        <Toolkit {...content.toolkit} variant={SECTION_VARIANT.SCREENX} />
        <Metrics {...content.metricsBand} variant={SECTION_VARIANT.INLINE} />
        <Threats {...content.threats} variant={SECTION_VARIANT.SCREENX} />
      </div>
    </>
  );
}
