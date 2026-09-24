import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SectionHeading from "./SectionHeading";

describe("SectionHeading", () => {
  it("renders an h2 with headline styling by default", () => {
    render(<SectionHeading>All the signals</SectionHeading>);
    const h = screen.getByRole("heading", {
      level: 2,
      name: "All the signals",
    });
    expect(h.className).toContain("text-display-1");
  });

  it("renders the requested heading level", () => {
    render(<SectionHeading as="h1">Hero</SectionHeading>);
    expect(
      screen.getByRole("heading", { level: 1, name: "Hero" })
    ).toBeInTheDocument();
  });

  it("renders eyebrow and deck only when provided", () => {
    const { rerender } = render(<SectionHeading>Title</SectionHeading>);
    expect(screen.queryByText("REAL-TIME")).not.toBeInTheDocument();
    rerender(
      <SectionHeading
        eyebrow="REAL-TIME"
        deck="Score every session in under 200ms."
      >
        Title
      </SectionHeading>
    );
    expect(screen.getByText("REAL-TIME").className).toContain("eyebrow");
    expect(
      screen.getByText("Score every session in under 200ms.")
    ).toBeInTheDocument();
  });

  it("centers when align='center'", () => {
    render(<SectionHeading align="center">Title</SectionHeading>);
    expect(
      screen.getByRole("heading", { level: 2 }).parentElement.className
    ).toContain("text-center");
  });
});
