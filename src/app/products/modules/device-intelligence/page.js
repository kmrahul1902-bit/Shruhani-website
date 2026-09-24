import ModulePage from "@/components/sections/module/ModulePage";
import { getContent } from "@/lib/content";

const PAGE_KEY = "moduleDevice";

export function generateMetadata() {
  const { seo } = getContent(PAGE_KEY);
  return { title: seo.metaTitle, description: seo.metaDescription };
}

/** Device Intelligence. The template is ModulePage; this supplies its content. */
export default function DeviceIntelligencePage() {
  const content = getContent(PAGE_KEY);
  return (
    <ModulePage
      content={content}
      animationSlug="device-intelligence"
      demoHref="/book-a-demo"
    />
  );
}
