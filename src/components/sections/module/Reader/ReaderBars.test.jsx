import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReaderBars from "./ReaderBars";

const slides = [
  { key: "identity", title: "Device identity" },
  { key: "integrity", title: "App integrity" },
  { key: "network", title: "Network" },
];

const setup = (index = 0) => {
  const onSelect = vi.fn();
  render(
    <ReaderBars
      slides={slides}
      index={index}
      onSelect={onSelect}
      labelPrefix="Cluster"
    />
  );
  return { onSelect, bars: () => screen.getAllByRole("button") };
};

describe("ReaderBars", () => {
  it("names each bar by the cluster it lands on", () => {
    const { bars } = setup();
    expect(bars()[1]).toHaveAccessibleName("Cluster: App integrity");
  });

  it("marks the current cluster", () => {
    const { bars } = setup(1);
    expect(bars()[1]).toHaveAttribute("aria-current", "true");
    expect(bars()[0]).not.toHaveAttribute("aria-current");
  });

  /**
   * Five bars were five tab stops, so a keyboard reader paid five presses to
   * cross a decorative-looking row on six module pages. One stop in, arrow
   * keys within — the same shape as the scenario tabs, so the two rows behave
   * alike.
   */
  it("is a single stop in the page's tab order", () => {
    const { bars } = setup(1);
    expect(bars().filter((b) => b.tabIndex === 0)).toHaveLength(1);
    expect(bars()[1].tabIndex).toBe(0);
  });

  it("moves between clusters with the arrow keys", async () => {
    const user = userEvent.setup();
    const { onSelect, bars } = setup(0);
    bars()[0].focus();
    await user.keyboard("{ArrowRight}");
    expect(onSelect).toHaveBeenCalledWith(1);
    await user.keyboard("{ArrowLeft}");
    expect(onSelect).toHaveBeenLastCalledWith(slides.length - 1);
  });

  it("jumps to the ends with Home and End", async () => {
    const user = userEvent.setup();
    const { onSelect, bars } = setup(1);
    bars()[1].focus();
    await user.keyboard("{End}");
    expect(onSelect).toHaveBeenLastCalledWith(slides.length - 1);
    await user.keyboard("{Home}");
    expect(onSelect).toHaveBeenLastCalledWith(0);
  });

  it("leaves other keys to the page", async () => {
    const user = userEvent.setup();
    const { onSelect, bars } = setup(0);
    bars()[0].focus();
    await user.keyboard("{ArrowDown}");
    expect(onSelect).not.toHaveBeenCalled();
  });
});
