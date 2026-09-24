import { FaqHero, FaqSection } from "@/components/sections/faq";
import { getContent } from "@/lib/content";

export function generateMetadata() {
  const { seo } = getContent("faq");
  return { title: seo.metaTitle, description: seo.metaDescription };
}

/**
 * FAQ — a short hero and one accordion.
 *
 * The accordion is the page's only client component; the hero and the aside
 * around it render on the server.
 */
export default function FaqPage() {
  const content = getContent("faq");
  // The content names this field `heading`; the component reads `h1`.
  const hero = { h1: content.hero.heading, sub: content.hero.sub };

  return (
    <>
      <FaqHero hero={hero} />
      <FaqSection list={content.list} />
    </>
  );
}
