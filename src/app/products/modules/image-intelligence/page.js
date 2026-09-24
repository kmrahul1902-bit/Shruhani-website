import ModulePage from "@/components/sections/module/ModulePage";
import { getContent } from "@/lib/content";

const PAGE_KEY = "moduleImage";

export function generateMetadata() {
  const { seo } = getContent(PAGE_KEY);
  return { title: seo.metaTitle, description: seo.metaDescription };
}

/** Image Intelligence. The template is ModulePage; this supplies its content. */
export default function ImageIntelligencePage() {
  const content = getContent(PAGE_KEY);
  return (
    <ModulePage
      content={content}
      animationSlug="image-intelligence"
      demoHref="/book-a-demo"
    />
  );
}
