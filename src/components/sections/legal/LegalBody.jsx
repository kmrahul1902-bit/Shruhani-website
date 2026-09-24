import LegalCallout from "./LegalCallout";
import LegalMarkdown from "./LegalMarkdown";
import LegalSteps from "./LegalSteps";
import { createHeadingWalker } from "./legalHeadings";

/**
 * Renders a legal document's blocks, in order.
 *
 * A table rather than a chain of conditionals: a block type added to the
 * content and not added here should be one visible gap, not a silently
 * skipped branch.
 */
const BLOCKS = {
  "shared.rich-text": LegalMarkdown,
  "blog.callout": LegalCallout,
  "legal.steps": LegalSteps,
};

export default function LegalBody({ blocks }) {
  // One walker for the whole document, so the ids the headings emit are
  // the ones the contents rail generated from the same tree.
  const ids = createHeadingWalker();
  const firstProse = blocks.findIndex(
    (b) => b.__component === "shared.rich-text"
  );

  return (
    <div className="text-body-md text-article-body max-mob:text-body-md">
      {blocks.map((block, index) => {
        const Block = BLOCKS[block.__component];
        if (!Block) {
          console.warn("[legal] no renderer for block:", block.__component);
          return null;
        }
        return (
          <Block
            key={index}
            block={block}
            ids={ids}
            lede={index === firstProse}
          />
        );
      })}
    </div>
  );
}
