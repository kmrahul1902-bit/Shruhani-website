import Hero from "@/components/sections/Hero";
import LogoGrid from "@/components/sections/LogoGrid";
import Products from "@/components/sections/Products";
import Modules from "@/components/sections/Modules";
import Metrics from "@/components/sections/Metrics";
import Industries from "@/components/sections/Industries";
import { getContent } from "@/lib/content";

/**
 * Adapted from the reference: metadata is built directly from
 * `content.seo` rather than through `lib/seo.js`/`config/routes.js` (no
 * CMS/routes registry in this project — see plan/CLAUDE.md → Decisions).
 */
export function generateMetadata() {
  const { seo } = getContent("home");
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
  };
}

/** Home page — section order matches the reference's own page.js. */
export default function HomePage() {
  const content = getContent("home");

  return (
    <>
      <Hero
        content={content}
        demoHref="/book-a-demo"
        logoStrip={<LogoGrid />}
      />
      <Products {...content.productShowcase} />
      <Modules {...content.modulesGrid} />
      <Metrics {...content.metricsBand} />
      <Industries {...content.industryGrid} navLabel="Industries" />
    </>
  );
}
