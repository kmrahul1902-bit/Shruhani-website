import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import FooterLink from "./FooterLink";

const mockPath = vi.hoisted(() => ({ value: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => mockPath.value }));

const at = (path) => {
  mockPath.value = path;
};
afterEach(() => at("/"));

describe("FooterLink", () => {
  it("marks the link that names the page you are on", () => {
    at("/products/screenx");
    render(<FooterLink href="/products/screenx">ScreenX</FooterLink>);
    expect(screen.getByRole("link", { name: "ScreenX" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("leaves the others alone", () => {
    at("/products/screenx");
    render(<FooterLink href="/products/cortex">Cortex</FooterLink>);
    expect(screen.getByRole("link", { name: "Cortex" })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("keeps the section marked from a page inside it", () => {
    at("/resources/article/what-is-carding");
    render(<FooterLink href="/resources">Articles</FooterLink>);
    expect(screen.getByRole("link", { name: "Articles" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("does not treat home as the parent of everything", () => {
    at("/products/screenx");
    render(<FooterLink href="/">Home</FooterLink>);
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("carries the emphasis visually as well, for people who are not using a reader", () => {
    at("/faq");
    const { rerender } = render(<FooterLink href="/faq">FAQs</FooterLink>);
    expect(screen.getByRole("link", { name: "FAQs" })).toHaveClass(
      "text-white"
    );

    at("/about");
    rerender(<FooterLink href="/faq">FAQs</FooterLink>);
    expect(screen.getByRole("link", { name: "FAQs" })).not.toHaveClass(
      "text-white"
    );
  });

  it("renders a span, not a thrown page, when the href never joined", () => {
    at("/about");
    render(<FooterLink href="">Orphaned</FooterLink>);

    expect(screen.queryByRole("link", { name: "Orphaned" })).toBeNull();
    expect(screen.getByText("Orphaned").tagName).toBe("SPAN");
  });

  it("never marks a destination-less row as the current page", () => {
    at("/about");
    render(<FooterLink href="">Orphaned</FooterLink>);

    const el = screen.getByText("Orphaned");
    expect(el).not.toHaveAttribute("aria-current");
    expect(el).not.toHaveClass("text-white");
  });
});
