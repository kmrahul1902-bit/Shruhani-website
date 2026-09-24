import ModulePage from "@/components/sections/module/ModulePage";
import { getContent } from "@/lib/content";

const PAGE_KEY = "moduleSms";

export function generateMetadata() {
  const { seo } = getContent(PAGE_KEY);
  return { title: seo.metaTitle, description: seo.metaDescription };
}

/** SMS Intelligence. The template is ModulePage; this supplies its content. */
export default function SmsIntelligencePage() {
  const content = getContent(PAGE_KEY);
  return (
    <ModulePage
      content={content}
      animationSlug="sms-intelligence"
      demoHref="/book-a-demo"
    />
  );
}
