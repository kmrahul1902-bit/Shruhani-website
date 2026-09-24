/**
 * The carousel's position arithmetic, kept pure and apart from the hook.
 *
 * It lives here because none of it is testable through the hook: jsdom has no
 * layout engine, so a rendered track reports zero for every measurement, and
 * the case that matters most — the first frame after `requestAnimationFrame`
 * resumes from a backgrounded tab, carrying a gap of seconds — cannot be
 * staged in a real browser either. As plain functions over measured numbers,
 * both are ordinary unit tests.
 *
 * `metrics` throughout is `{ pad, pitch, perPass, period }` from the hook's
 * `measure()`:
 *   pad     the track's padding-left, which centres the first card. It is part
 *           of the scrollable extent, so the first card sits at
 *           `scrollLeft === pad`, not at 0.
 *   pitch   card width + gap: the distance from one card's start to the next.
 *   perPass how many cards are in one pass (the set is rendered twice).
 *   period  pitch * perPass: one full pass, the distance that wraps invisibly.
 */

/** Always in [0, span), unlike `%`, which keeps the sign of the dividend. */
export const wrapWithin = (value, span) => ((value % span) + span) % span;

/** The scroll offset that puts card `index` of the first pass at the edge. */
export const offsetFor = ({ pad, pitch }, index) => pad + index * pitch;

/** Which card is at the edge now. Rounded: a drift leaves it mid-card. */
export const indexAt = ({ pad, pitch }, scrollLeft) =>
  Math.round((scrollLeft - pad) / pitch);

/**
 * Where the drift should sit after advancing `deltaPx`.
 *
 * Wrapped by one pass with a modulo rather than a single subtraction. rAF stops
 * while a tab is backgrounded, so the frame after it resumes can advance by
 * seconds' worth of pixels — several periods at once. One subtraction would
 * leave that out of range and park the row past the end of its own content,
 * showing empty space where the cards should be.
 */
export const driftTo = (metrics, position, deltaPx) =>
  metrics.pad + wrapWithin(position + deltaPx - metrics.pad, metrics.period);

/**
 * What an arrow press should do: an optional instant hop, then the destination.
 *
 * The destination is an ABSOLUTE offset for a card index, never a relative
 * delta. A delta compounds whatever the drift left behind and whatever the last
 * press rounded away, and it can be asked to scroll before the first card or
 * past the last copy — where there is nothing to look at. An index cannot: it
 * always names a real card.
 *
 * Stepping off either end re-enters through the duplicate first, via `hopTo`,
 * which the caller applies without animation. The two passes are identical, so
 * the hop is invisible, and it means "next" from the last card moves one card
 * right instead of sweeping the whole row back to the start.
 */
export function stepPlan(metrics, scrollLeft, direction) {
  let index = indexAt(metrics, scrollLeft);
  let hopTo;

  if (direction < 0 && index <= 0) {
    index += metrics.perPass;
    hopTo = offsetFor(metrics, index);
  } else if (direction > 0 && index >= metrics.perPass) {
    index -= metrics.perPass;
    hopTo = offsetFor(metrics, index);
  }

  return { hopTo, scrollTo: offsetFor(metrics, index + direction) };
}
