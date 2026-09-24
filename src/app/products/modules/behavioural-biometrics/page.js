import ModulePage from "@/components/sections/module/ModulePage";
import { getContent } from "@/lib/content";

const PAGE_KEY = "moduleBehavioural";

export function generateMetadata() {
  const { seo } = getContent(PAGE_KEY);
  return { title: seo.metaTitle, description: seo.metaDescription };
}

/** Behavioural Biometrics. The template is ModulePage; this supplies its content. */
export default function BehaviouralBiometricsPage() {
  const content = getContent(PAGE_KEY);
  return (
    <ModulePage
      content={content}
      animationSlug="behavioural-biometrics"
      demoHref="/book-a-demo"
    />
  );
}
