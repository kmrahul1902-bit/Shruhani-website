import { describe, it, expect } from "vitest";
import { SOCIAL_ICONS, socialIconFor } from "./footer.icons";

const link = (href, label) => ({ href, label });

/**
 * The label used to be the icon's key, which made it an identifier wearing a
 * label's clothes: rewording it took the logo away. The href identifies the
 * network now, so the label is free text — which is what an editor expects a
 * label to be.
 */
describe("socialIconFor", () => {
  it("identifies the network from the profile URL", () => {
    expect(
      socialIconFor(link("https://in.linkedin.com/company/sign3labs"))
    ).toBe(SOCIAL_ICONS.LinkedIn);
    expect(socialIconFor(link("https://x.com/sign3labs"))).toBe(SOCIAL_ICONS.X);
    expect(
      socialIconFor(
        link("https://www.facebook.com/profile.php?id=100090065815365")
      )
    ).toBe(SOCIAL_ICONS.Facebook);
  });

  /** The reword that used to break it. */
  it("keeps the mark however the label is written", () => {
    const href = "https://in.linkedin.com/company/sign3labs";
    for (const label of [
      "LinkedIn",
      "Linkedin",
      "  linkedin  ",
      "Follow us on LinkedIn",
      "हमें फॉलो करें",
      "",
      undefined,
    ]) {
      expect(socialIconFor(link(href, label))).toBe(SOCIAL_ICONS.LinkedIn);
    }
  });

  it("still reads twitter.com as X, and matches on subdomains", () => {
    expect(socialIconFor(link("https://twitter.com/sign3labs"))).toBe(
      SOCIAL_ICONS.X
    );
    expect(socialIconFor(link("https://www.instagram.com/sign3labs"))).toBe(
      SOCIAL_ICONS.Instagram
    );
  });

  /** A host we do not know, but a label that names a network we do. */
  it("falls back to the label when the host is unfamiliar", () => {
    expect(socialIconFor(link("https://social.example.com/s3", "GitHub"))).toBe(
      SOCIAL_ICONS.GitHub
    );
  });

  it("returns nothing when neither the host nor the label is a network", () => {
    expect(
      socialIconFor(link("https://example.com", "Newsletter"))
    ).toBeUndefined();
    expect(socialIconFor(link("not a url", "Threads"))).toBeUndefined();
    expect(socialIconFor(undefined)).toBeUndefined();
  });

  /** A domain that merely contains the name is not that network. */
  it("does not match a lookalike domain", () => {
    expect(socialIconFor(link("https://notlinkedin.com/x"))).toBeUndefined();
    expect(
      socialIconFor(link("https://linkedin.com.evil.test/x"))
    ).toBeUndefined();
  });
});
