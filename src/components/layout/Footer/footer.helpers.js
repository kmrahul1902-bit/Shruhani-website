/**
 * Turns the footer's contact details into the links that act on them.
 *
 * Derived from the displayed values rather than stored beside them: an
 * `href` duplicated next to its label is a second place to edit and a
 * silent way for the two to disagree — the CMS would happily let someone
 * change the phone number and leave the tel: pointing at the old one.
 */

/** A tel: URI keeps the leading + and nothing else — spaces are display. */
export const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const mailtoHref = (email) => `mailto:${email}`;

/**
 * A maps search rather than coordinates: the address is authored as prose in
 * the CMS, and a search resolves it without anyone maintaining a lat/long
 * pair that no one can eyeball for correctness.
 */
export const mapsHref = (addressLines) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    addressLines.join(", ")
  )}`;

/**
 * The six footer groups, paired into the three columns the design draws.
 *
 * The handoff stacks two groups inside each `.df-col` — Modules under
 * Products, Industries under Use cases, About us under Resources. That pairing
 * is layout, so the content stays a flat list of headed groups and the shape
 * is made here rather than in the CMS, where it would be a nesting level an
 * editor has to maintain for no editorial reason.
 *
 * An odd count leaves a short final column rather than dropping a group.
 */
export const footerColumnPairs = (columns = []) =>
  columns.reduce((pairs, column, i) => {
    if (i % 2 === 0) pairs.push([column]);
    else pairs.at(-1).push(column);
    return pairs;
  }, []);
