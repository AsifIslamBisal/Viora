import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Fieldset } from "./Fieldset";

describe("Fieldset", () => {
  it("renders a group named by its legend", () => {
    render(
      <Fieldset legend="Billing details">
        <input aria-label="Street" />
      </Fieldset>
    );
    expect(screen.getByRole("group", { name: "Billing details" })).toBeInTheDocument();
  });

  it("renders the legend element", () => {
    const { container } = render(<Fieldset legend="Shipping address" />);
    expect(container.querySelector("legend.viora-fieldset__legend")).toHaveTextContent(
      "Shipping address"
    );
  });

  it("renders no legend when omitted", () => {
    const { container } = render(<Fieldset />);
    expect(container.querySelector("legend")).not.toBeInTheDocument();
  });

  it.each(["sm", "md", "lg"])("applies the %s gap class", (gap) => {
    render(<Fieldset gap={gap} />);
    expect(document.querySelector(".viora-fieldset")).toHaveClass(
      `viora-fieldset--gap-${gap}`
    );
  });

  it("sets the disabled attribute and disables fields", () => {
    render(
      <Fieldset legend="Account" disabled>
        <input aria-label="Username" />
      </Fieldset>
    );
    const group = screen.getByRole("group", { name: "Account" });
    expect(group).toBeDisabled();
    expect(screen.getByRole("textbox", { name: "Username" })).toBeDisabled();
  });

  it("applies the disabled class", () => {
    render(<Fieldset disabled />);
    expect(document.querySelector(".viora-fieldset")).toHaveClass(
      "viora-fieldset--disabled"
    );
  });

  it("merges custom className with component classes", () => {
    render(<Fieldset className="custom-class" />);
    expect(document.querySelector(".viora-fieldset")).toHaveClass(
      "viora-fieldset",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Fieldset data-testid="fieldset" />);
    expect(screen.getByTestId("fieldset")).toHaveClass("viora-fieldset");
  });
});