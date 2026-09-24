/**
 * The hero image size the CMS team uploads at — a fixed contract, not a
 * guess: every hero is 1200x800 (3:2). ArticleHeader renders the image at
 * exactly these dimensions rather than computing a ratio from whatever the
 * CMS happens to report, and uses this as the fallback when a specific
 * entry's metadata is missing width/height.
 */
export const HERO_SIZE = {
  width: 1200,
  height: 800,
};
