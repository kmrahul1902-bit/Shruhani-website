import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mainNav, mobileNav, navCopy, site } from "./header.nav";
import Header from "./Header";

let mockPathname = "/";
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

const renderHeader = () => render(<Header />);

const asPattern = (text) =>
  new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

const openPanel = () =>
  document.querySelector('[data-slot="navigation-menu-content"]');

describe("Header", () => {
  it("renders the main nav landmark with logo linking home", () => {
    renderHeader();
    expect(
      screen.getByRole("navigation", { name: navCopy.mainLabel })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Shruhani" })).toHaveAttribute(
      "href",
      "/"
    );
  });

  it("renders plain nav links with labels from content", () => {
    renderHeader();
    for (const item of mainNav.filter((i) => i.type === "link")) {
      expect(
        screen.getAllByRole("link", { name: item.label }).length
      ).toBeGreaterThan(0);
    }
  });

  for (const item of mainNav.filter((i) => i.type === "mega")) {
    it(`opens the ${item.key} panel with both columns`, async () => {
      renderHeader();
      await userEvent.click(screen.getByRole("button", { name: item.label }));
      const inPanel = within(openPanel());

      for (const group of item.groups) {
        expect(inPanel.getByText(group.eyebrow)).toBeInTheDocument();
        for (const entry of group.items) {
          const link = inPanel.getByRole("link", {
            name: asPattern(entry.label),
          });
          expect(link).toHaveAttribute("href", entry.href);
          expect(inPanel.getByText(entry.description)).toBeVisible();
        }
      }
    });
  }

  it("closes the open panel on Escape and returns focus to its trigger", async () => {
    renderHeader();
    const trigger = screen.getByRole("button", { name: "Products" });
    await userEvent.click(trigger);
    expect(await screen.findByText("Modules")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    expect(trigger).toHaveFocus();
  });

  it("Log in is an external link with safe rel", () => {
    renderHeader();
    const login = screen.getAllByRole("link", { name: navCopy.login })[0];
    expect(login).toHaveAttribute("href", site.loginUrl);
    expect(login).toHaveAttribute("target", "_blank");
    expect(login.getAttribute("rel")).toContain("noopener");
  });

  it("demo CTA is hidden from the a11y tree before scrolling", () => {
    renderHeader();
    expect(
      screen.queryByRole("link", { name: navCopy.demo })
    ).not.toBeInTheDocument();
  });

  it("hamburger opens the mobile drawer, and every destination is reachable", async () => {
    renderHeader();
    await userEvent.click(
      screen.getByRole("button", { name: navCopy.openMenu })
    );
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: asPattern("About") })
    ).toBeInTheDocument();

    let previous = null;
    for (const category of mobileNav.filter((c) => c.type === "category")) {
      const trigger = screen.getByRole("button", {
        name: asPattern(category.label),
      });
      if (trigger.getAttribute("aria-expanded") !== "true") {
        await userEvent.click(trigger);
      }

      for (const group of category.groups) {
        for (const entry of group.items) {
          expect(
            screen.getAllByRole("link", { name: asPattern(entry.label) })
              .length,
            `${entry.key} missing from the drawer`
          ).toBeGreaterThan(0);
        }
      }

      if (previous) {
        expect(
          screen.queryByRole("link", { name: asPattern(previous) }),
          "the previous category stayed open — the accordion is not exclusive"
        ).not.toBeInTheDocument();
      }
      const first = category.groups[0];
      previous = first.items[0].label;
    }
  });
});

describe("Header — current page", () => {
  const setPath = (p) => {
    mockPathname = p;
  };
  const productsTrigger = () =>
    screen.getByRole("button", { name: "Products" });

  it("marks nothing when the reader is on a page the nav does not list", () => {
    setPath("/");
    renderHeader();
    expect(productsTrigger().closest("li")).not.toHaveAttribute("data-current");
    expect(document.querySelector('[aria-current="page"]')).toBeNull();
  });

  it("lights the parent tab from a page nested inside its panel", () => {
    setPath("/products/modules/device-intelligence");
    renderHeader();
    expect(productsTrigger().closest("li")).toHaveAttribute(
      "data-current",
      "true"
    );
    expect(productsTrigger()).not.toHaveAttribute("aria-current");
  });

  it("marks the child row for the exact page inside the open panel", async () => {
    setPath("/products/modules/device-intelligence");
    renderHeader();
    await userEvent.click(productsTrigger());
    const marked = within(openPanel()).getAllByRole("link", {
      current: "page",
    });
    expect(marked).toHaveLength(1);
    expect(marked[0]).toHaveAttribute(
      "href",
      "/products/modules/device-intelligence"
    );
  });

  it("lights a plain link, and only that one, on its own page", () => {
    setPath("/about");
    renderHeader();
    const marked = screen.getAllByRole("link", { current: "page" });
    expect(marked.every((el) => el.getAttribute("href") === "/about")).toBe(
      true
    );
  });

  it("keeps a sibling route from lighting the wrong tab", () => {
    setPath("/products/screenx-not-a-real-page");
    renderHeader();
    expect(document.querySelector('[aria-current="page"]')).toBeNull();
  });
});
