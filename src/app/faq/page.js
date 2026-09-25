import { FaqHero, FaqSection } from "@/components/sections/faq";
import PageSchema from "@/components/shared/PageSchema";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { faqPageSchema } from "@/lib/schema";

export function generateMetadata() {
  const { seo } = getContent("faq");
  return buildMetadata({
    title: seo.metaTitle,
    description: seo.metaDescription,
    path: "/faq",
  });
}

/**
 * FAQ — a short hero and one accordion.
 *
 * The accordion is the page's only client component; the hero and the aside
 * around it render on the server.
 *
 * The only page that gets FAQPage JSON-LD alongside its WebPage schema — see
 * `lib/schema.js` on why this is a deliberate one-off rather than something
 * `PageSchema` derives generically.
 */
export default function FaqPage() {
  const content = getContent("faq");
  // The content names this field `heading`; the component reads `h1`.
  const hero = { h1: content.hero.heading, sub: content.hero.sub };
  const faqSchema = faqPageSchema(content.list.items);

  return (
    <>
      <PageSchema
        path="/faq"
        seo={content.seo}
        extraSchemas={faqSchema ? [faqSchema] : []}
      />
      <FaqHero hero={hero} />
      <FaqSection list={content.list} />
    </>
  );
}
