import Callout from "./blocks/Callout";
import Figure from "./blocks/Figure";
import Markdown from "./blocks/Markdown";
import Quote from "./blocks/Quote";
import Stats from "./blocks/Stats";
import { createHeadingWalker } from "./articleHeadings";

/**
 * Renders an article's dynamic zone, block by block.
 *
 * Adapted from the reference: `shared.media`/`shared.slider` were already
 * absent there. `blog.bars`, `blog.chart`, and `blog.video` are absent HERE
 * too — those block types weren't ported (out of scope for Phase 6, no
 * article exists to need them yet); an article using one would show up as a
 * console warning rather than a silent gap, same as an unrecognised
 * component does in the reference.
 */
const BLOCKS = {
  "shared.rich-text": Markdown,
  "shared.quote": Quote,
  "blog.callout": Callout,
  "blog.stats": Stats,
  "blog.figure": Figure,
};

export default function ArticleBody({ blocks, copy }) {
  const ids = createHeadingWalker();

  return (
    <div className="text-body-md text-article-body max-mob:text-body-md">
      {blocks.map((block, index) => {
        const Block = BLOCKS[block.__component];
        if (!Block) {
          console.warn("[blog] no renderer for block:", block.__component);
          return null;
        }
        return (
          <Block key={block.id ?? index} block={block} ids={ids} copy={copy} />
        );
      })}
    </div>
  );
}
