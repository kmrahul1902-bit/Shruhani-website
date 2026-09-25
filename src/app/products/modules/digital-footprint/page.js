import ModulePage from "@/components/sections/module/ModulePage";
import PageSchema from "@/components/shared/PageSchema";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const PAGE_KEY = "moduleFootprint";
const PATH = "/products/modules/digital-footprint";

export function generateMetadata() {
  const { seo } = getContent(PAGE_KEY);
  return buildMetadata({
    title: seo.metaTitle,
    description: seo.metaDescription,
    path: PATH,
  });
}

/** Digital Footprint. The template is ModulePage; this supplies its content. */
export default function DigitalFootprintPage() {
  const content = getContent(PAGE_KEY);
  return (
    <>
      <PageSchema path={PATH} seo={content.seo} />
      <ModulePage
        content={content}
        animationSlug="digital-footprint"
        demoHref="/book-a-demo"
      />
    </>
  );
}
