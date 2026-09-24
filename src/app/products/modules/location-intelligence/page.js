import ModulePage from "@/components/sections/module/ModulePage";
import { getContent } from "@/lib/content";

const PAGE_KEY = "moduleLocation";

export function generateMetadata() {
  const { seo } = getContent(PAGE_KEY);
  return { title: seo.metaTitle, description: seo.metaDescription };
}

/** Location Intelligence. The template is ModulePage; this supplies its content. */
export default function LocationIntelligencePage() {
  const content = getContent(PAGE_KEY);
  return (
    <ModulePage
      content={content}
      animationSlug="location-intelligence"
      demoHref="/book-a-demo"
    />
  );
}
