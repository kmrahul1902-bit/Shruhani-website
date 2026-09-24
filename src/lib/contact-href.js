/**
 * The destination for a contact value that a reader can act on.
 *
 * Derived from the value rather than stored beside it. The value IS the
 * address — an editor changing the number changes where it dials, and a
 * displayed address cannot drift away from the one it opens.
 *
 * `tel:` gets the separators stripped: a reader wants "+91 98765 43211", and
 * a dialler wants "+919876543211".
 *
 * @returns a `mailto:`/`tel:` URL, or null for a value that is not a
 *   destination — opening hours, an office name, a postal address.
 */
export function contactHref(value) {
  const text = String(value ?? "").trim();
  if (!text) return null;

  // An address is the only contact value with an @ in it.
  if (text.includes("@")) return `mailto:${text}`;

  // A phone number: an optional +, then digits and the separators people
  // write them with. Anchored and length-bounded so "Mon-Fri, 9:30-18:30
  // IST" and "600-650 CIBIL band" cannot be mistaken for one.
  if (/^\+?\d[\d\s().-]{5,20}$/.test(text)) {
    return `tel:${text.replace(/[^+\d]/g, "")}`;
  }

  return null;
}
