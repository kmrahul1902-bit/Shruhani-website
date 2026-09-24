/**
 * The drawer trigger's three bars.
 *
 * Not a lucide glyph, because it animates: open, the outer bars rotate into an X
 * and the middle one fades. Swapping Menu for X instead would pop between two
 * shapes. Geometry and easing live in the `hamburger` utility (globals.css).
 */
export function HamburgerBars() {
  return (
    <>
      <span className="hamburger-bar" />
      <span className="hamburger-bar" />
      <span className="hamburger-bar" />
    </>
  );
}
