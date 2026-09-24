import { SHARE_ICONS } from "./shareRail.icons";

/**
 * Share links under the contents rail.
 *
 * Plain anchors to each network's share endpoint — no SDKs, no client JS, and
 * nothing that loads a third-party script onto a page a reader came to read.
 */
const TARGETS = [
  { key: "x", href: (u, t) => `https://x.com/intent/tweet?url=${u}&text=${t}` },
  {
    key: "linkedin",
    href: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
  },
  {
    key: "facebook",
    href: (u) => `https://www.facebook.com/sharer/sharer.php?u=${u}`,
  },
];

export default function ShareRail({ url, title, copy }) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  return (
    <div className="border-border-cool max-bento:border-t-0 max-bento:pt-0 max-mob:mt-7.5 max-mob:border-t max-mob:pt-5.5 mt-7 border-t pt-6">
      <h2 className="text-faint text-caption tracking-caps mb-3 font-bold uppercase">
        {copy.heading}
      </h2>
      <ul className="flex flex-wrap gap-2">
        {TARGETS.map((target) => (
          <li key={target.key}>
            <a
              href={target.href(u, t)}
              target="_blank"
              rel="nofollow noopener noreferrer"
              aria-label={copy.networks[target.key]}
              className="border-border-cool rounded-tile-sm text-muted hover:border-blog-tint-border hover:bg-blog-tint hover:text-blue focus-ring max-mob:size-11 flex size-8.5 items-center justify-center border transition-colors"
            >
              {SHARE_ICONS[target.key]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
