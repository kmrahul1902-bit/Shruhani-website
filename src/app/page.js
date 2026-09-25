import Hero from "@/components/sections/Hero";
import LogoGrid from "@/components/sections/LogoGrid";
import Products from "@/components/sections/Products";
import Modules from "@/components/sections/Modules";
import Metrics from "@/components/sections/Metrics";
import Industries from "@/components/sections/Industries";
import PageSchema from "@/components/shared/PageSchema";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata() {
  const { seo } = getContent("home");
  return buildMetadata({
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    path: "/",
  });
}

/** Home page — section order matches the reference's own page.js. */
export default function HomePage() {
  const content = getContent("home");

  return (
    <>
      <PageSchema path="/" seo={content.seo} />
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
