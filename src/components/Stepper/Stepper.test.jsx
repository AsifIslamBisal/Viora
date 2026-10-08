import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Stepper } from "./Stepper";

const STEPS = [
  { id: "info", label: "Account" },
  { id: "plan", label: "Billing" },
  { id: "done", label: "Complete" },
];

describe("Stepper", () => {
  it("renders the steps as a navigation landmark", () => {
    render(<Stepper steps={STEPS} />);
    expect(screen.getByRole("navigation", { name: "Progress steps" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Account/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Billing/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Complete/ })).toBeInTheDocument();
  });

  it("labels the current step with aria-current", () => {
    render(<Stepper steps={STEPS} current={1} />);
    expect(screen.getByRole("button", { name: /Billing/ })).toHaveAttribute(
      "aria-current",
      "step"
    );
    expect(screen.getByRole("button", { name: /Account/ })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("marks completed and upcoming steps", () => {
    const { container } = render(<Stepper steps={STEPS} current={1} />);
    const items = container.querySelectorAll(".viora-stepper__item");
    expect(items[0]).toHaveClass("viora-stepper__item--completed");
    expect(items[1]).toHaveClass("viora-stepper__item--current");
    expect(items[2]).toHaveClass("viora-stepper__item--upcoming");
  });

  it("shows a check icon for completed steps", () => {
    const { container } = render(<Stepper steps={STEPS} current={1} />);
    expect(container.querySelector(".viora-stepper__item--completed svg")).toBeInTheDocument();
  });

  it("renders step descriptions", () => {
    render(
      <Stepper steps={[{ label: "Account", description: "Your details" }]} />
    );
    expect(screen.getByText("Your details")).toBeInTheDocument();
  });

  it("navigates on click", () => {
    const onChange = vi.fn();
    render(<Stepper steps={STEPS} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: /Complete/ }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("uses an uncontrolled current index", () => {
    const { container } = render(<Stepper steps={STEPS} defaultCurrent={2} />);
    expect(container.querySelector(".viora-stepper__item--current button")).toHaveAttribute(
      "aria-current",
      "step"
    );
    expect(screen.getByRole("button", { name: /Complete/ })).toHaveAttribute(
      "aria-current",
      "step"
    );
  });

  it("supports the vertical orientation", () => {
    const { container } = render(
      <Stepper steps={STEPS} orientation="vertical" />
    );
    expect(container.querySelector(".viora-stepper")).toHaveClass(
      "viora-stepper--vertical"
    );
  });

  it("supports a custom aria-label", () => {
    render(<Stepper steps={STEPS} ariaLabel="Checkout" />);
    expect(screen.getByRole("navigation", { name: "Checkout" })).toBeInTheDocument();
  });

  it("renders nothing without steps", () => {
    const { container } = render(<Stepper steps={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("merges custom className with component classes", () => {
    render(<Stepper steps={STEPS} className="custom-class" />);
    expect(screen.getByRole("navigation", { name: "Progress steps" })).toHaveClass(
      "viora-stepper",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Stepper steps={STEPS} data-testid="stepper" />);
    expect(screen.getByTestId("stepper")).toHaveClass("viora-stepper");
  });
});