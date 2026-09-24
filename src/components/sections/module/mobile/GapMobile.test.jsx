import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GapMobile from "./GapMobile";

/**
 * The phone's "Why it exists" band.
 *
 * The one behaviour worth pinning is the second crop. Five of the six
 * modules ship a single illustration and this section must keep showing it;
 * SMS ships a trimmed copy for the phone because the desktop artwork's
 * off-centre bleed reads as misalignment once centred in a narrow column.
 *
 * Adapted from the reference: no `@/services/__fixtures__/with-media` CMS
 * fixture in this project (no CMS — see plan/CLAUDE.md → Decisions), so
 * image objects carry `src` directly rather than being resolved by the
 * fixture.
 */
const base = {
  heading: "Why it exists",
  sub: "300M+ Indians have no bureau score.",
};

describe("GapMobile", () => {
  it("shows the page's only illustration when it ships one", () => {
    render(
      <GapMobile
        {...base}
        image={{ src: "/wide.png", alt: "the wide artwork" }}
      />
    );

    expect(screen.getByRole("img", { name: "the wide artwork" })).toBeVisible();
  });

  it("prefers the trimmed crop where the page ships one", () => {
    render(
      <GapMobile
        {...base}
        image={{ src: "/wide.png", alt: "the wide artwork" }}
        imageMobile={{ src: "/trim.png", alt: "the trimmed artwork" }}
      />
    );

    expect(
      screen.getByRole("img", { name: "the trimmed artwork" })
    ).toBeVisible();
    expect(screen.queryByRole("img", { name: "the wide artwork" })).toBeNull();
  });

  /**
   * A declared-but-unseeded mobile crop must fall through to the desktop
   * one rather than blank the section.
   */
  it("falls back to the wide artwork when the crop has no src yet", () => {
    render(
      <GapMobile
        {...base}
        image={{ src: "/wide.png", alt: "the wide artwork" }}
        imageMobile={{ alt: "the trimmed artwork" }}
      />
    );

    expect(screen.getByRole("img", { name: "the wide artwork" })).toBeVisible();
  });
});
