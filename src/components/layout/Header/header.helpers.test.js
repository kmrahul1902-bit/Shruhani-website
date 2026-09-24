import { describe, it, expect } from "vitest";
import { isCurrentPath, isItemCurrent } from "./header.helpers";

describe("isCurrentPath", () => {
  it("matches the page itself", () => {
    expect(isCurrentPath("/about", "/about")).toBe(true);
  });

  /**
   * A blog article is still "Articles" as far as the nav is concerned, so a
   * section link stays lit on its own descendants.
   */
  it("matches a descendant of a section", () => {
    expect(
      isCurrentPath("/resources/article/what-is-carding", "/resources")
    ).toBe(true);
  });

  /**
   * The trap: "/products/screenx".startsWith("/products/screen") is true, and
   * a naive prefix test would light ScreenX while the reader is on a different
   * page. The boundary has to be a path separator.
   */
  it("does not match a sibling that merely shares a prefix", () => {
    expect(isCurrentPath("/products/screenx-pro", "/products/screenx")).toBe(
      false
    );
    expect(isCurrentPath("/products/screenxyz", "/products/screenx")).toBe(
      false
    );
  });

  /** Home is a prefix of every path, so it may only ever match exactly. */
  it("treats home as an exact match only", () => {
    expect(isCurrentPath("/", "/")).toBe(true);
    expect(isCurrentPath("/about", "/")).toBe(false);
  });

  /** navigation.js uses "#" for a destination that does not exist yet. */
  it("never lights a placeholder or a missing href", () => {
    expect(isCurrentPath("/about", "#")).toBe(false);
    expect(isCurrentPath("/about", undefined)).toBe(false);
  });

  /** usePathname returns null before hydration in some contexts. */
  it("survives a null pathname", () => {
    expect(isCurrentPath(null, "/about")).toBe(false);
  });

  it("ignores a trailing slash on the current path", () => {
    expect(isCurrentPath("/about/", "/about")).toBe(true);
  });
});

describe("isItemCurrent", () => {
  const productsPanel = {
    key: "products",
    type: "mega",
    groups: [
      {
        key: "products",
        items: [{ key: "screenx", href: "/products/screenx" }],
      },
      {
        key: "modules",
        items: [
          { key: "device", href: "/products/modules/device-intelligence" },
        ],
      },
    ],
  };
  const aboutLink = { key: "about", type: "link", href: "/about" };

  it("lights a panel when any descendant is the current page", () => {
    expect(
      isItemCurrent("/products/modules/device-intelligence", productsPanel)
    ).toBe(true);
    expect(isItemCurrent("/products/screenx", productsPanel)).toBe(true);
  });

  it("leaves a panel dark when nothing under it matches", () => {
    expect(isItemCurrent("/about", productsPanel)).toBe(false);
  });

  it("lights a plain link on its own href", () => {
    expect(isItemCurrent("/about", aboutLink)).toBe(true);
    expect(isItemCurrent("/products/screenx", aboutLink)).toBe(false);
  });
});
