/**
 * Every number the module reader runs on, lifted from the reference's own
 * controller rather than eyeballed. They live here because three of them
 * appear in two places at once (a duration is both a CSS transition and the
 * setTimeout that waits for it to finish).
 */

/** Milliseconds a leaving card takes to fade and slide out. */
export const CARD_EXIT_MS = 200;
/** Milliseconds between each leaving card, so the group peels away in order. */
export const CARD_EXIT_STAGGER_MS = 50;
/** Milliseconds an arriving card takes to fade and slide in. */
export const CARD_ENTER_MS = 320;
/** Milliseconds between each arriving card. */
export const CARD_ENTER_STAGGER_MS = 60;

/** How far a card travels on the way out (left) and in (right). */
export const CARD_EXIT_SHIFT_PX = -16;
export const CARD_ENTER_SHIFT_PX = 20;

/**
 * The reduced-motion set. Not zero: a 0ms transition never fires
 * `transitionend` and never schedules the timeout that hands over to the
 * next group, so the reader would stop on its first change.
 */
export const REDUCED = {
  CARD_EXIT_MS: 0.01,
  CARD_EXIT_STAGGER_MS: 0,
  CARD_ENTER_MS: 0.01,
  CARD_ENTER_STAGGER_MS: 0,
};

/** The image cross-fade behind the cards. */
export const IMAGE_FADE_MS = 520;

/**
 * Where a bar-click lands the block it points at: far enough below the
 * sticky header that the heading is not tucked under it.
 */
export const BAR_SCROLL_OFFSET_PX = 160;

/**
 * Below this the sticky frame is hidden entirely and the blocks read as one
 * plain column, each with its own image — so there is nothing to drive and
 * the scroll listener stops.
 */
export const STACK_BREAKPOINT_PX = 900;

/** Card value tones. The key is the contract; content never names a colour. */
export const TONES = ["ok", "warn", "bad"];
