import LegalPage from "@/components/sections/legal";
import PageSchema from "@/components/shared/PageSchema";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata() {
  const { seo } = getContent("privacyPolicy");
  return buildMetadata({
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    path: "/privacy-policy",
  });
}

/**
 * Privacy Policy. The template is LegalPage; this supplies its content.
 *
 * TODO(verify): the entire body below is carried over from the reference,
 * global-renamed Sign3→Shruhani (see src/content/privacyPolicy.json) —
 * NOT rewritten from scratch (a same-entity corporate rebrand keeps the
 * legal text, per CLAUDE.md guardrail #2 and plan/docs/03-content-and-pages.md).
 * This page needs a real lawyer's review before it ships: the registered
 * entity name/address, jurisdiction, and every data-handling clause are
 * all unverified for Shruhani Technologies Pvt. Ltd. specifically.
 */
export default function PrivacyPolicyPage() {
  const content = getContent("privacyPolicy");
  return (
    <>
      <PageSchema path="/privacy-policy" seo={content.seo} />
      <LegalPage content={content} homeLabel="Home" />
    </>
  );
}
