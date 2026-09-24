import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

/**
 * One rich-text block, styled to the legal-document design. Adapted and
 * trimmed from the reference's `blog/article/blocks/Markdown.jsx` (that
 * version also handles blog-specific table/image checklist rules this
 * project's legal pages don't need) — see `legalHeadings.js` for why this
 * lives under `legal/` rather than importing the blog one.
 *
 * `remarkGfm` handles the policy's tables; `rehypeRaw` parses the odd `<u>`/
 * `<br />` an author typed by hand rather than escaping it into view.
 *
 * Heading levels and ids both come from the walker in `ids`, threaded
 * through every block so it sees the document's headings in order — that
 * is what keeps the outline correct and its ids identical to the ones the
 * contents rail generated.
 */
function OWN_HOST_TEST(href) {
  if (typeof href !== "string") return false;
  const trimmed = href.trim();
  if (!/^https?:\/\//i.test(trimmed)) return false;
  try {
    const { hostname } = new URL(trimmed);
    return !["shruhani.com", "www.shruhani.com"].includes(hostname);
  } catch {
    return false;
  }
}

function Heading({ depth, ids, children }) {
  const Tag = ids.levelFor(depth);
  const id = ids.next(flatten(children));
  const shared = "text-ink scroll-mt-27.5 max-mob:scroll-mt-18.5";

  if (Tag === "h2") {
    return (
      <h2
        id={id}
        className={`${shared} text-title-2 max-mob:text-title-3 max-mob:mt-9.5 max-mob:mb-3 mt-13 mb-4 font-extrabold tracking-tighter`}
      >
        {children}
      </h2>
    );
  }
  if (Tag === "h3") {
    return (
      <h3
        id={id}
        className={`${shared} text-body-lg max-mob:text-body-md max-mob:mt-6.5 max-mob:mb-2.5 mt-8.5 mb-3 font-bold tracking-tight`}
      >
        {children}
      </h3>
    );
  }
  return (
    <h4
      id={id}
      className={`${shared} max-mob:mt-5.5 mt-7 mb-2.5 text-base font-bold tracking-tight`}
    >
      {children}
    </h4>
  );
}

/** Heading children may be an array of strings and elements. */
function flatten(node) {
  if (node == null || node === false) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flatten).join("");
  return flatten(node.props?.children);
}

export default function LegalMarkdown({ block, ids, lede }) {
  if (!block.body) return null;

  const heading = (depth) =>
    function MarkdownHeading({ children }) {
      return (
        <Heading depth={depth} ids={ids}>
          {children}
        </Heading>
      );
    };

  const content = (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: heading(1),
        h2: heading(2),
        h3: heading(3),
        h4: heading(4),
        h5: heading(5),
        h6: heading(6),
        p: ({ children }) => (
          <p className="max-mob:mb-4.5 mb-5 text-pretty">{children}</p>
        ),
        a: ({ href, children }) => {
          const external = OWN_HOST_TEST(href);
          return (
            <a
              href={href}
              {...(external && {
                target: "_blank",
                rel: "nofollow noopener noreferrer",
              })}
              className="text-blue focus-ring border-blue/25 hover:border-blue rounded-xs border-b font-semibold transition-colors"
            >
              {children}
            </a>
          );
        },
        ul: ({ children }) => (
          <ul className="max-mob:mb-5 max-mob:gap-2.5 mb-5.5 grid gap-3">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="blog-steps mb-5 flex flex-col gap-3.5">{children}</ol>
        ),
        li: ({ children, ...props }) =>
          "data-ordered" in props ? (
            <li>{children}</li>
          ) : (
            <li className="blog-bullet">{children}</li>
          ),
        blockquote: ({ children }) => (
          <blockquote className="border-blue text-ink max-mob:text-body-md max-mob:my-6 max-mob:py-0.5 max-mob:pl-4 my-7 border-l-3 pl-5 text-xl font-semibold tracking-tight">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="border-border-cool rounded-card blog-table-scroll my-7 overflow-x-auto border">
            <table className="max-mob:text-body-sm w-full border-collapse text-left">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="bg-blog-th text-muted text-caption max-mob:text-caption tracking-label border-border-cool max-mob:px-3.5 max-mob:py-3 border-b px-4.5 py-3.5 font-bold uppercase">
            {children}
          </th>
        ),
        tbody: ({ children }) => (
          <tbody className="blog-table-body">{children}</tbody>
        ),
        td: ({ children }) => (
          <td className="border-border-cool text-caption max-mob:px-3.5 max-mob:py-3 border-b px-4.5 py-3.5">
            {children}
          </td>
        ),
        mark: ({ children }) => (
          <span className="text-blue font-semibold">{children}</span>
        ),
      }}
    >
      {block.body}
    </ReactMarkdown>
  );

  return lede ? <div className="blog-lede">{content}</div> : content;
}
