import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { footerContent } from "./footer.content";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders a contentinfo landmark", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders every sitemap column heading and spot-checks its links", () => {
    render(<Footer />);
    for (const col of footerContent.columns) {
      expect(
        screen.getByRole("heading", { name: col.heading })
      ).toBeInTheDocument();
    }
    expect(
      screen.getByRole("link", { name: "SMS Intelligence" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "E-Commerce & Marketplaces" })
    ).toBeInTheDocument();
  });

  /**
   * The design pairs the six groups into three columns. A regression here
   * would either drop a group or spread them across six columns, and both
   * still render every link — so the count is what has to be asserted.
   */
  it("pairs the six groups into three columns", () => {
    const { container } = render(<Footer />);
    const sitemap = container.querySelector("nav[aria-label]");
    // brand column + three link columns
    expect(sitemap.children).toHaveLength(4);
    for (const column of [...sitemap.children].slice(1)) {
      expect(column.querySelectorAll("h3")).toHaveLength(2);
    }
  });

  /** The socials live in the brand column, and nowhere else. */
  it("renders exactly one row of social links", () => {
    const { container } = render(<Footer />);
    const socials = footerContent.socials.map((s) =>
      container.querySelectorAll(`a[aria-label="${s.label}"]`)
    );
    for (const found of socials) expect(found).toHaveLength(1);
  });

  it("renders the contact rows in the brand column", () => {
    render(<Footer />);
    expect(screen.getByText(footerContent.contact.email)).toBeInTheDocument();
    expect(screen.getByText(footerContent.contact.phone)).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: footerContent.contact.heading })
    ).toBeNull();
  });

  it("renders the legal and social links", () => {
    render(<Footer />);
    for (const l of footerContent.legal)
      expect(screen.getByRole("link", { name: l.label })).toBeInTheDocument();
    for (const s of footerContent.socials)
      expect(screen.getByRole("link", { name: s.label })).toBeInTheDocument();
  });

  it("renders copyright and disclaimer from content", () => {
    render(<Footer />);
    expect(screen.getByText(footerContent.copyright)).toBeInTheDocument();
    expect(screen.getByText(footerContent.disclaimer)).toBeInTheDocument();
  });
});
