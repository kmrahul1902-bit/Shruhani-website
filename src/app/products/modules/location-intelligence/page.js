import ModulePage from "@/components/sections/module/ModulePage";
import PageSchema from "@/components/shared/PageSchema";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const PAGE_KEY = "moduleLocation";
const PATH = "/products/modules/location-intelligence";

export function generateMetadata() {
  const { seo } = getContent(PAGE_KEY);
  return buildMetadata({
    title: seo.metaTitle,
    description: seo.metaDescription,
    path: PATH,
  });
}

/** Location Intelligence. The template is ModulePage; this supplies its content. */
export default function LocationIntelligencePage() {
  const content = getContent(PAGE_KEY);
  return (
    <>
      <PageSchema path={PATH} seo={content.seo} />
      <ModulePage
        content={content}
        animationSlug="location-intelligence"
        demoHref="/book-a-demo"
      />
    </>
  );
}
