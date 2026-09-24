import Link from "next/link";

/**
 * A link when there is somewhere to go, and the content itself when there is not.
 *
 * `next/link` throws if `href` is not a string or object, which turns a missing
 * destination into a failed render rather than a dead link. That matters
 * because these destinations come from the content layer: `href` is not in
 * Strapi for most lists — it comes from config/routes.js on the repo side and
 * is joined on by key — so an item that fails to join arrives without one. The
 * merge recovers the common case (see mergeKeyedLists), but it cannot recover
 * every case, and the failure it cannot recover should be a card you cannot
 * click, not a page nobody can load.
 *
 * The element rendered instead is a `<span>`: an anchor with no href is not a
 * link to a screen reader either, and a span says the same thing without
 * pretending to be interactive.
 *
 * Everything else — className, children, the rest — passes straight through, so
 * the card keeps its layout whichever it renders as.
 */
export default function MaybeLink({ href, children, ...rest }) {
  const usable = typeof href === "string" ? href.trim() : href;
  if (!usable) {
    // `rel`, `target` and `prefetch` describe navigation; there is none.
    const { rel: _rel, target: _target, prefetch: _prefetch, ...safe } = rest;
    return <span {...safe}>{children}</span>;
  }
  return (
    <Link href={usable} {...rest}>
      {children}
    </Link>
  );
}
