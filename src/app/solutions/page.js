import Button from "@/components/ui/Button";
import SectionHeading from "@/components/shared/SectionHeading";
import PageSchema from "@/components/shared/PageSchema";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata() {
  const { seo } = getContent("solutions");
  return buildMetadata({
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    path: "/solutions",
  });
}

export default function SolutionsPage() {
  const { hero, seo } = getContent("solutions");
  return (
    <section className="bg-surface section-pad">
      <PageSchema path="/solutions" seo={seo} />
      <div className="container-default flex flex-col items-start gap-8">
        <SectionHeading as="h1" eyebrow={hero.eyebrow} deck={hero.deck}>
          {hero.heading}
        </SectionHeading>
        <Button href="/book-a-demo">{hero.ctaLabel}</Button>
      </div>
    </section>
  );
}
