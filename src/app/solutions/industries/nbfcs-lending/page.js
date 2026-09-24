import Hero from "@/components/sections/industry/Hero";
import IndustryMobile from "@/components/sections/industry/mobile";
import LogoGrid from "@/components/sections/LogoGrid";
import Gap from "@/components/sections/product/Gap";
import Decisions from "@/components/sections/industry/Decisions";
import Mapping from "@/components/sections/industry/Mapping";
import Metrics from "@/components/sections/Metrics";
import { SECTION_VARIANT } from "@/components/sections/product/product.constants";
import { enrichIndustryContent } from "@/components/sections/industry/industry.constants";
import { getContent } from "@/lib/content";

const PAGE_KEY = "industryLending";

/**
 * Adapted from the reference: metadata built directly from `content.seo`,
 * no `lib/seo.js`/routes registry/`PageSchema` (Phase 8 scope, no CMS in
 * this project — see plan/CLAUDE.md → Decisions).
 */
export function generateMetadata() {
  const { seo } = getContent(PAGE_KEY);
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
  };
}

/**
 * NBFCs & Lending — section order matches the reference's own page.js.
 *
 * No `data-accent` wrapper: every industry mockup runs on the default
 * (already pink from Phase 1).
 */
export default function IndustryLendingPage() {
  const content = enrichIndustryContent(getContent(PAGE_KEY));

  return (
    <>
      <Hero
        hero={content.hero}
        labels={content.labels}
        demoHref="/book-a-demo"
        animationSlug="nbfcs-lending"
      />
      <IndustryMobile content={content} />

      <div data-desktop-sections className="max-mob:hidden">
        <LogoGrid />
        <Gap
          {...content.gap}
          variant={SECTION_VARIANT.INDUSTRY}
          fill="bg-panel-dark"
          artHeight={190}
        />
        <Decisions {...content.decisions} />
        <Mapping {...content.mapping} />
        <Metrics {...content.metricsBand} variant={SECTION_VARIANT.INDUSTRY} />
      </div>
    </>
  );
}
