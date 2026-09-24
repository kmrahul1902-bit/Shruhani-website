/**
 * Which nav entry corresponds to the page being read.
 *
 * Kept out of the components because two of them need the same answer — the
 * desktop mega menu and the mobile drawer — and because the prefix rule has a
 * trap in it worth testing directly rather than through a rendered header.
 */

/**
 * Is `href` the page at `pathname`, or an ancestor section of it?
 *
 * The boundary matters. `"/products/screenx-pro".startsWith("/products/screenx")`
 * is true, so a plain prefix test lights ScreenX while the reader is somewhere
 * else entirely; the next character has to be a separator. Home is a prefix of
 * every path, so it only ever matches exactly.
 */
export function isCurrentPath(pathname, href) {
  if (!pathname || !href || href === "#") return false;
  // usePathname keeps a trailing slash on some routes; "/about/" and "/about"
  // are the same page to a reader.
  const here = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  if (here === href) return true;
  if (href === "/") return false;
  return here.startsWith(`${href}/`);
}

/**
 * Is this nav entry the one the reader is inside?
 *
 * A plain link answers for itself. A mega panel answers for its children: the
 * panel is not a destination, so it is "current" when any link it contains is.
 */
export function isItemCurrent(pathname, item) {
  if (item.type === "mega") {
    return item.groups.some((group) =>
      group.items.some((child) => isCurrentPath(pathname, child.href))
    );
  }
  return isCurrentPath(pathname, item.href);
}
