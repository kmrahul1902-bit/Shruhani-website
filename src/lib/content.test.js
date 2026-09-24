import { describe, it, expect } from "vitest";
import { unflatten } from "./content";

describe("unflatten", () => {
  it("nests dot-separated keys", () => {
    expect(unflatten({ "a.b": 1 })).toEqual({ a: { b: 1 } });
  });

  it("builds arrays from bracket indices", () => {
    expect(unflatten({ "a[0].b": 1, "a[1].b": 2 })).toEqual({
      a: [{ b: 1 }, { b: 2 }],
    });
  });

  it("handles a mix of nesting and arrays, matching real content shape", () => {
    const flat = {
      "hero.heading": "Title",
      "industryGrid.industries[0].title": "Banks",
      "industryGrid.industries[0].statValue": "73%",
      "industryGrid.industries[1].title": "NBFCs",
    };
    expect(unflatten(flat)).toEqual({
      hero: { heading: "Title" },
      industryGrid: {
        industries: [{ title: "Banks", statValue: "73%" }, { title: "NBFCs" }],
      },
    });
  });

  it("keeps a plain top-level key untouched", () => {
    expect(unflatten({ heading: "Hi" })).toEqual({ heading: "Hi" });
  });
});
