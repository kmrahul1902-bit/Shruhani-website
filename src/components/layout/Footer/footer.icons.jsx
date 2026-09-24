// Social icon marks — transplanted verbatim from the mockup's df-socials
// block (claude-docs/handoffs/handoff/initial-handoff/Home Page.html).
// Keyed by the label used in shell.footer.socials.
function Instagram() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function X() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2H21l-6.52 7.45L22 22h-6.79l-4.36-5.74L5.6 22H3l7.04-8.05L2 2h6.89l4 5.4L18.24 2zm-1.18 18h1.84L7.06 4h-2L17.07 20z" />
    </svg>
  );
}

function GitHub() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.3-3.2-.1-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .3" />
    </svg>
  );
}

function LinkedIn() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
    </svg>
  );
}

function Facebook() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z" />
    </svg>
  );
}

/**
 * Keyed by the label in shell.footer.socials, so adding a network is a content
 * change plus a mark here — nothing in the Footer component knows the list.
 */
export const SOCIAL_ICONS = {
  Instagram,
  X,
  GitHub,
  Facebook,
  LinkedIn,
};

/**
 * The mark for a social link, identified by where it points.
 *
 * The label used to be the key, which made it an identifier wearing a label's
 * clothes: rewording "LinkedIn" to "Follow us on LinkedIn" — an ordinary thing
 * for an editor to do — took the logo away and left an empty link. Normalising
 * case and space helped with typos and did nothing for a reword.
 *
 * The href is the honest identity of a social profile. A network's URL does
 * not change when someone improves the wording next to it, and it cannot be
 * edited into something meaningless without the link itself being wrong, which
 * is visible. So the label is free text now, in the way an editor expects a
 * label to be.
 *
 * The label is still consulted as a fallback, for a profile whose host we do
 * not recognise but whose label names a network we have a mark for.
 */
const BY_HOST = [
  [/(^|\.)linkedin\.com$/, LinkedIn],
  [/(^|\.)(x|twitter)\.com$/, X],
  [/(^|\.)facebook\.com$/, Facebook],
  [/(^|\.)instagram\.com$/, Instagram],
  [/(^|\.)github\.com$/, GitHub],
];

const BY_LABEL = new Map(
  Object.entries(SOCIAL_ICONS).map(([name, Icon]) => [name.toLowerCase(), Icon])
);

/** @param social `{ href, label }` from shell.footer.socials */
export function socialIconFor(social) {
  const href = typeof social === "string" ? social : social?.href;
  const label = typeof social === "string" ? social : social?.label;

  let host = "";
  try {
    host = new URL(String(href)).hostname.toLowerCase();
  } catch {
    // Not a URL yet — a relative href, or an editor mid-edit. Fall through.
  }
  const byHost = BY_HOST.find(([pattern]) => pattern.test(host))?.[1];
  if (byHost) return byHost;

  return BY_LABEL.get(
    String(label ?? "")
      .trim()
      .toLowerCase()
  );
}
