import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Scenarios from "./Scenarios";

const tab = (key, label) => ({
  key,
  label,
  cards: [{ title: `${label} card`, body: "body" }],
  proof: { label: "Result", stat: "73%", body: "b", source: "s" },
});

const props = {
  heading: "Five patterns",
  sub: "sub",
  tabs: [
    tab("mules", "Mule rings"),
    tab("ato", "Account takeover"),
    tab("synthetic", "Synthetic identity"),
  ],
};

const tabs = () => screen.getAllByRole("tab");

describe("Scenarios", () => {
  it("exposes a tablist with one tab per scenario", () => {
    render(<Scenarios {...props} />);
    expect(screen.getByRole("tablist")).toHaveAccessibleName(props.heading);
    expect(tabs()).toHaveLength(3);
    expect(tabs()[0]).toHaveAttribute("aria-selected", "true");
  });

  it("shows only the selected panel", () => {
    render(<Scenarios {...props} />);
    const panels = screen.getAllByRole("tabpanel", { hidden: true });
    expect(panels[0]).toBeVisible();
    expect(panels[1]).not.toBeVisible();
  });

  /**
   * Roving tabindex: the strip is ONE tab stop, so reaching it and leaving it
   * costs one Tab each rather than one per scenario.
   */
  it("keeps exactly one tab in the page's tab order", () => {
    render(<Scenarios {...props} />);
    expect(tabs().filter((t) => t.tabIndex === 0)).toHaveLength(1);
  });

  /**
   * The bug this was written for. setActive moved the selection but nothing
   * moved DOM focus, so after ArrowRight focus sat on a tab that had just
   * become tabIndex=-1: the next Tab press jumped from a stale position and a
   * screen reader went on describing the tab the reader had left.
   */
  it("moves focus with the selection on arrow keys", async () => {
    const user = userEvent.setup();
    render(<Scenarios {...props} />);
    await user.click(tabs()[0]);

    await user.keyboard("{ArrowRight}");
    expect(tabs()[1]).toHaveAttribute("aria-selected", "true");
    expect(tabs()[1]).toHaveFocus();

    await user.keyboard("{ArrowLeft}");
    expect(tabs()[0]).toHaveFocus();
  });

  it("wraps at both ends", async () => {
    const user = userEvent.setup();
    render(<Scenarios {...props} />);
    await user.click(tabs()[0]);
    await user.keyboard("{ArrowLeft}");
    expect(tabs()[2]).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(tabs()[0]).toHaveFocus();
  });

  it("jumps to the ends with Home and End", async () => {
    const user = userEvent.setup();
    render(<Scenarios {...props} />);
    await user.click(tabs()[0]);
    await user.keyboard("{End}");
    expect(tabs()[2]).toHaveAttribute("aria-selected", "true");
    expect(tabs()[2]).toHaveFocus();
    await user.keyboard("{Home}");
    expect(tabs()[0]).toHaveFocus();
  });

  it("switches the visible panel with the keyboard", async () => {
    const user = userEvent.setup();
    render(<Scenarios {...props} />);
    await user.click(tabs()[0]);
    await user.keyboard("{ArrowRight}");
    const panel = screen.getByRole("tabpanel");
    expect(within(panel).getByText("Account takeover card")).toBeVisible();
  });
});
