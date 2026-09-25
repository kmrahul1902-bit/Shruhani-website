import ModulePage from "@/components/sections/module/ModulePage";
import PageSchema from "@/components/shared/PageSchema";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const PAGE_KEY = "moduleDevice";
const PATH = "/products/modules/device-intelligence";

export function generateMetadata() {
  const { seo } = getContent(PAGE_KEY);
  return buildMetadata({
    title: seo.metaTitle,
    description: seo.metaDescription,
    path: PATH,
  });
}

/** Device Intelligence. The template is ModulePage; this supplies its content. */
export default function DeviceIntelligencePage() {
  const content = getContent(PAGE_KEY);
  return (
    <>
      <PageSchema path={PATH} seo={content.seo} />
      <ModulePage
        content={content}
        animationSlug="device-intelligence"
        demoHref="/book-a-demo"
      />
    </>
  );
}
