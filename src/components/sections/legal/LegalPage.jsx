import LegalBody from "./LegalBody";
import LegalContactCard from "./LegalContactCard";
import LegalHeader from "./LegalHeader";
import LegalQuestions from "./LegalQuestions";
import LegalToc from "./LegalToc";
import { outlineOf } from "./legalHeadings";

/**
 * THE legal document page — privacy policy, terms, anything of that shape.
 * One template for all of them: a document band, a sticky contents rail,
 * prose, and a card naming who to write to. Each route is a few lines that
 * fetch content and call this.
 *
 * Adapted from the reference: the baked content's blocks carry no
 * `__component` field (no CMS dynamic zone — see plan/CLAUDE.md →
 * Decisions), so `classifyBlock` infers each block's renderer from its own
 * shape — an array `items` is a numbered-steps block, a string `items` is
 * a callout, anything else with a `body` is prose. This is deterministic
 * for every block in `privacyPolicy.json` (verified by hand before writing
 * this) and holds for any legal doc built the same way.
 *
 * A Server Component. Only the contents rail is interactive.
 */
function classifyBlock(block) {
  if (Array.isArray(block.items)) return "legal.steps";
  if (typeof block.items === "string") return "blog.callout";
  return "shared.rich-text";
}

export default function LegalPage({ content, homeLabel }) {
  const blocks = content.blocks.map((block) => ({
    ...block,
    __component: classifyBlock(block),
  }));

  // The outline, from the document's own prose. The rail, the heading ids
  // and the section count in the band all come from this one derivation,
  // so they cannot disagree with each other or with the page.
  const markdown = blocks
    .filter((b) => b.__component === "shared.rich-text")
    .map((b) => b.body ?? "")
    .join("\n\n");
  const { sections } = outlineOf(markdown);

  return (
    <article>
      <LegalHeader
        content={content}
        homeLabel={homeLabel}
        sectionCount={sections.length}
      />

      <div className="legal-gutter legal-body-cols max-flow:gap-9 grid items-start gap-16 pt-14 pb-27.5">
        <div className="legal-rail max-flow:static max-flow:top-auto sticky top-26 self-start">
          <LegalToc sections={sections} label={content.contentsLabel} />
          <LegalQuestions content={content} />
        </div>

        <div>
          <LegalBody blocks={blocks} />
          <LegalContactCard contact={content.contact} />
        </div>
      </div>
    </article>
  );
}
