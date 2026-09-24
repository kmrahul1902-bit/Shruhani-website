import {
  Hero,
  Investors,
  Partners,
  PartnerCta,
} from "@/components/sections/investors";
import LogoGrid from "@/components/sections/LogoGrid";
import { getContent } from "@/lib/content";

export function generateMetadata() {
  const { seo } = getContent("investorsPartners");
  return { title: seo.metaTitle, description: seo.metaDescription };
}

/**
 * Investors & Partners — funding, the integration set, and a partnership CTA.
 *
 * The customer logo grid between the partners and the CTA is the SHARED
 * section, drawn from the same roster the home page shows (Phase 3).
 */
export default function InvestorsPartnersPage() {
  const content = getContent("investorsPartners");

  return (
    <>
      <Hero hero={content.hero} />
      <Investors investors={content.investors} />
      <Partners partners={content.partners} />
      <LogoGrid />
      <PartnerCta cta={content.cta} />
    </>
  );
}
