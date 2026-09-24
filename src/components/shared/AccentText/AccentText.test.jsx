import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AccentText from "./AccentText";

describe("AccentText", () => {
  it("wraps the phrase and keeps the sentence whole", () => {
    const { container } = render(
      <p>
        <AccentText
          text="Fraud assembles over weeks. The signal is there first."
          phrase="The signal is there first."
          className="accent"
        />
      </p>
    );

    expect(container.firstChild).toHaveTextContent(
      "Fraud assembles over weeks. The signal is there first."
    );
    expect(container.querySelector("span.accent")).toHaveTextContent(
      "The signal is there first."
    );
  });

  it("renders plain text when the phrase is absent from it", () => {
    const { container } = render(
      <p>
        <AccentText text="One sentence." phrase="another" className="accent" />
      </p>
    );

    expect(screen.getByText("One sentence.")).toBeInTheDocument();
    expect(container.querySelector("span")).toBeNull();
  });

  it("renders plain text when no phrase is given", () => {
    const { container } = render(
      <p>
        <AccentText text="One sentence." />
      </p>
    );

    expect(screen.getByText("One sentence.")).toBeInTheDocument();
    expect(container.querySelector("span")).toBeNull();
  });

  /** The industry pages' module note bolds four phrases in one sentence. */
  it("wraps several phrases and keeps the sentence whole", () => {
    const { container } = render(
      <p>
        <AccentText
          text="Modules that matter: digital footprint and SMS for credit, device for fraud rings, location for address."
          phrase={["digital footprint and SMS", "device", "location"]}
          className="accent"
        />
      </p>
    );

    expect(container.firstChild).toHaveTextContent(
      "Modules that matter: digital footprint and SMS for credit, device for fraud rings, location for address."
    );
    expect(
      [...container.querySelectorAll("span.accent")].map((s) => s.textContent)
    ).toEqual(["digital footprint and SMS", "device", "location"]);
  });

  it("wraps phrases in the text's order, not the array's", () => {
    const { container } = render(
      <p>
        <AccentText
          text="First then second."
          phrase={["second", "First"]}
          className="accent"
        />
      </p>
    );

    expect(
      [...container.querySelectorAll("span.accent")].map((s) => s.textContent)
    ).toEqual(["First", "second"]);
  });

  it("skips a phrase that sits inside one already wrapped", () => {
    const { container } = render(
      <p>
        <AccentText
          text="We ship device intelligence."
          phrase={["device intelligence", "device"]}
          className="accent"
        />
      </p>
    );

    expect(container.firstChild).toHaveTextContent(
      "We ship device intelligence."
    );
    expect(
      [...container.querySelectorAll("span.accent")].map((s) => s.textContent)
    ).toEqual(["device intelligence"]);
  });

  it("ignores phrases that are absent, wrapping the ones that are not", () => {
    const { container } = render(
      <p>
        <AccentText
          text="Only one of these is here."
          phrase={["one", "reworded away"]}
          className="accent"
        />
      </p>
    );

    expect(
      [...container.querySelectorAll("span.accent")].map((s) => s.textContent)
    ).toEqual(["one"]);
  });
});
