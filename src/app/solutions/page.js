import Button from "@/components/ui/Button";
import SectionHeading from "@/components/shared/SectionHeading";
import { getContent } from "@/lib/content";

export function generateMetadata() {
  const { seo } = getContent("solutions");
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
  };
}

export default function SolutionsPage() {
  const { hero } = getContent("solutions");
  return (
    <section className="bg-surface section-pad">
      <div className="container-default flex flex-col items-start gap-8">
        <SectionHeading as="h1" eyebrow={hero.eyebrow} deck={hero.deck}>
          {hero.heading}
        </SectionHeading>
        <Button href="/book-a-demo">{hero.ctaLabel}</Button>
      </div>
    </section>
  );
}
