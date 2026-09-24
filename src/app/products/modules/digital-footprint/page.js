import ModulePage from "@/components/sections/module/ModulePage";
import { getContent } from "@/lib/content";

const PAGE_KEY = "moduleFootprint";

export function generateMetadata() {
  const { seo } = getContent(PAGE_KEY);
  return { title: seo.metaTitle, description: seo.metaDescription };
}

/** Digital Footprint. The template is ModulePage; this supplies its content. */
export default function DigitalFootprintPage() {
  const content = getContent(PAGE_KEY);
  return (
    <ModulePage
      content={content}
      animationSlug="digital-footprint"
      demoHref="/book-a-demo"
    />
  );
}
