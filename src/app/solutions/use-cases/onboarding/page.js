import Hero from "@/components/sections/useCase/Hero";
import UseCaseMobile from "@/components/sections/useCase/mobile";
import LogoGrid from "@/components/sections/LogoGrid";
import Split from "@/components/sections/useCase/Split";
import Capabilities from "@/components/sections/useCase/Capabilities";
import Scenarios from "@/components/sections/useCase/Scenarios";
import Metrics from "@/components/sections/Metrics";
import { adaptUseCaseContent } from "@/components/sections/useCase/useCase.adapter";
import { getContent } from "@/lib/content";

const PAGE_KEY = "useCaseOnboarding";

export function generateMetadata() {
  const { seo } = getContent(PAGE_KEY);
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
  };
}

/**
 * Onboarding — section order matches the reference.
 *
 * The four use-case pages are one template and differ only in content. No
 * `data-accent`: every use-case mockup runs on the institutional default
 * (already pink from Phase 1).
 */
export default function UseCaseOnboardingPage() {
  const content = adaptUseCaseContent(getContent(PAGE_KEY));

  return (
    <>
      <Hero hero={content.hero} labels={content.labels} demoHref="/book-a-demo" />
      {/* Below 620px the page is its own composition rather than the
          desktop sections reflowed — see useCase/mobile. */}
      <UseCaseMobile content={content} />

      <div data-desktop-sections className="max-mob:hidden">
        <LogoGrid />
        <Split {...content.split} />
        <Scenarios {...content.scenarios} />
        <Capabilities {...content.capabilities} />
        <Metrics {...content.metricsBand} variant="useCase" />
      </div>
    </>
  );
}
