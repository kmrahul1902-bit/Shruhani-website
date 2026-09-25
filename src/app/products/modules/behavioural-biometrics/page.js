import ModulePage from "@/components/sections/module/ModulePage";
import PageSchema from "@/components/shared/PageSchema";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const PAGE_KEY = "moduleBehavioural";
const PATH = "/products/modules/behavioural-biometrics";

export function generateMetadata() {
  const { seo } = getContent(PAGE_KEY);
  return buildMetadata({
    title: seo.metaTitle,
    description: seo.metaDescription,
    path: PATH,
  });
}

/** Behavioural Biometrics. The template is ModulePage; this supplies its content. */
export default function BehaviouralBiometricsPage() {
  const content = getContent(PAGE_KEY);
  return (
    <>
      <PageSchema path={PATH} seo={content.seo} />
      <ModulePage
        content={content}
        animationSlug="behavioural-biometrics"
        demoHref="/book-a-demo"
      />
    </>
  );
}
