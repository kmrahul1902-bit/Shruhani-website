/**
 * The width below which the phone crop is used.
 *
 * One less than `--breakpoint-mob` (621px) in globals.css, because a media
 * query is inclusive and the token is the first width of the DESKTOP layout.
 * Keep the two in step: if the token moves, this moves.
 */
export const MOBILE_MEDIA = "(max-width: 620px)";
