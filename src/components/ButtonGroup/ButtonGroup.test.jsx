import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ButtonGroup } from "./ButtonGroup";

describe("ButtonGroup", () => {
  it("renders children inside a labelled group", () => {
    render(
      <ButtonGroup ariaLabel="Text actions">
        <button type="button">Bold</button>
        <button type="button">Italic</button>
      </ButtonGroup>
    );
    expect(screen.getByRole("group", { name: "Text actions" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Italic" })).toBeInTheDocument();
  });

  it("uses horizontal orientation by default", () => {
    const { container } = render(<ButtonGroup ariaLabel="Group" />);
    expect(container.querySelector(".viora-button-group")).toHaveClass(
      "viora-button-group--horizontal"
    );
  });

  it("supports the vertical orientation", () => {
    const { container } = render(<ButtonGroup ariaLabel="Group" orientation="vertical" />);
    expect(container.querySelector(".viora-button-group")).toHaveClass(
      "viora-button-group--vertical"
    );
  });

  it("applies the joined modifier by default", () => {
    const { container } = render(<ButtonGroup ariaLabel="Group" />);
    expect(container.querySelector(".viora-button-group")).toHaveClass(
      "viora-button-group--joined"
    );
  });

  it("drops the joined modifier when disabled", () => {
    const { container } = render(<ButtonGroup ariaLabel="Group" joined={false} />);
    expect(container.querySelector(".viora-button-group")).not.toHaveClass(
      "viora-button-group--joined"
    );
  });

  it("merges custom className with component classes", () => {
    const { container } = render(<ButtonGroup ariaLabel="Group" className="custom-class" />);
    expect(container.querySelector(".viora-button-group")).toHaveClass(
      "viora-button-group",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<ButtonGroup ariaLabel="Group" data-testid="group" />);
    expect(screen.getByTestId("group")).toHaveClass("viora-button-group");
  });
});