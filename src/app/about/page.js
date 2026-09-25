import {
  Hero,
  Investors,
  Story,
  Platform,
  Journey,
  Leaders,
  Team,
  Certifications,
  Press,
  Office,
} from "@/components/sections/about";
import { enrichAboutContent } from "@/components/sections/about/about.adapter";
import PageSchema from "@/components/shared/PageSchema";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata() {
  const { seo } = getContent("about");
  return buildMetadata({
    title: seo.metaTitle,
    description: seo.metaDescription,
    path: "/about",
  });
}

/**
 * About Shruhani — the company story.
 *
 * Section order is the handoff's: mission, investors, founding story,
 * platform, journey, leaders, team, certifications, press, office, then the
 * shared CTA and footer the layout supplies.
 */
export default function AboutPage() {
  const content = enrichAboutContent(getContent("about"));

  return (
    <>
      <PageSchema path="/about" seo={content.seo} />
      <Hero hero={content.hero} />
      <Investors investors={content.investors} />
      <Story story={content.story} />
      <Platform platform={content.platform} />
      <Journey journey={content.journey} />
      <Leaders leaders={content.leaders} />
      <Team team={content.team} />
      <Certifications certifications={content.certifications} />
      <Press press={content.press} />
      <Office office={content.office} />
    </>
  );
}
