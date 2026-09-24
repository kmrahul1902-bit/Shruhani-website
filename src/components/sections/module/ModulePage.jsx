import Hero from "@/components/sections/module/Hero";
import ModuleMobile from "@/components/sections/module/mobile";
import HeroAnimation from "@/components/shared/HeroAnimation";
import LogoGrid from "@/components/sections/LogoGrid";
import Gap from "@/components/sections/product/Gap";
import Reader from "@/components/sections/module/Reader";
import Outputs from "@/components/sections/module/Outputs";
import Applies from "@/components/sections/module/Applies";
import Integration from "@/components/sections/module/Integration";
import { MODULE_LABELS } from "./module.labels";
import { MOBILE_HERO_FRAME, MODULE_LAYOUT } from "./modulePage.constants";

/**
 * The baked JSON export stores every "bullet list" field — reader slides'
 * `points`, output cards' `points` — as one newline-delimited string
 * (`"a\nb\nc"`), not an array: a Strapi textarea field flattened on
 * export, where the live CMS would have returned a real array. Every
 * consumer (`ReaderBlock`/`ReaderMobile`, `OutputCard`) `.map()`s over
 * `points`, so this normalizes once here for all of them.
 */
function splitPoints(points) {
  return Array.isArray(points)
    ? points
    : (points ?? "").split("\n").filter(Boolean);
}

function normalizeReaderSlides(slides = []) {
  return slides.map((slide) => ({
    ...slide,
    points: splitPoints(slide.points),
  }));
}

function normalizeOutputCards(cards = []) {
  return cards.map((card) => ({ ...card, points: splitPoints(card.points) }));
}

/**
 * THE module page — all six modules render through this one component;
 * each route is a few lines that fetches its content and calls this.
 *
 * Adapted from the reference: no `PageSchema`/structured data (Phase 8
 * scope, see plan/CLAUDE.md → Decisions) and no `config/site.js`
 * (`demoHref` is passed in directly). `content.labels` is empty in the
 * baked JSON (no CMS shell) — `MODULE_LABELS` supplies the fallback
 * accessibility strings, content's own values (if ever populated) win.
 *
 * `animationSlug` is passed in rather than selected here, so adding a
 * module touches no shared file.
 */
export default function ModulePage({
  content: rawContent,
  animationSlug,
  demoHref,
}) {
  const layout = MODULE_LAYOUT[animationSlug] ?? {};
  const labels = { ...MODULE_LABELS, ...rawContent.labels };
  const content = {
    ...rawContent,
    reader: {
      ...rawContent.reader,
      slides: normalizeReaderSlides(rawContent.reader?.slides),
    },
    outputs: {
      ...rawContent.outputs,
      cards: normalizeOutputCards(rawContent.outputs?.cards),
    },
  };

  return (
    <>
      <Hero hero={content.hero} demoHref={demoHref}>
        <HeroAnimation
          slug={`${animationSlug}-mobile`}
          title={labels.heroAnimation}
          className="mob:hidden"
          frame={MOBILE_HERO_FRAME[animationSlug]}
        />
        <HeroAnimation
          slug={animationSlug}
          title={labels.heroAnimation}
          className="max-mob:hidden"
        />
      </Hero>

      <ModuleMobile content={{ ...content, labels }} layout={layout} />

      <div data-desktop-sections className="max-mob:hidden">
        <LogoGrid />

        <Gap
          {...content.gap}
          variant="module"
          artClassName={layout.gapArt === "bleed" && "gap-module-art-bleed"}
        />

        <Reader
          {...content.reader}
          labels={labels}
          plate={layout.readerPlate}
        />

        <Outputs {...content.outputs} />

        <Applies {...content.applies} visual={layout.appliesVisual} />

        <Integration
          {...content.integration}
          className={
            layout.integrationMeasure === "wide" && "integration-measure-wide"
          }
        />
      </div>
    </>
  );
}
