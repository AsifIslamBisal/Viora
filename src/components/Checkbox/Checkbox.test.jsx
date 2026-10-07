import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders a checkbox with an accessible label", () => {
    render(<Checkbox label="Subscribe to updates" />);
    expect(
      screen.getByRole("checkbox", { name: "Subscribe to updates" })
    ).toBeInTheDocument();
  });

  it("does not render a label text when omitted", () => {
    const { container } = render(<Checkbox />);
    expect(container.querySelector(".viora-checkbox__label")).toBeNull();
  });

  it("reflects a checked prop", () => {
    render(<Checkbox label="Enabled" checked />);
    expect(screen.getByRole("checkbox", { name: "Enabled" })).toBeChecked();
  });

  it("fires onChange when the label is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Notify me" onChange={onChange} />);
    await user.click(screen.getByText("Notify me"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.checked).toBe(true);
  });

  it("does not fire onChange when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Locked" disabled onChange={onChange} />);
    await user.click(screen.getByText("Locked"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("sets the indeterminate property", () => {
    render(<Checkbox label="Some selected" indeterminate />);
    const checkbox = screen.getByRole("checkbox", {
      name: "Some selected",
    });
    expect(checkbox.indeterminate).toBe(true);
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
  });

  it("clears aria-checked when indeterminate is off", () => {
    render(<Checkbox label="None selected" />);
    expect(screen.getByRole("checkbox")).not.toHaveAttribute("aria-checked");
  });

  it("renders a hint wired via aria-describedby", () => {
    render(<Checkbox label="Terms" hint="Read the terms first." />);
    const checkbox = screen.getByRole("checkbox", { name: "Terms" });
    expect(screen.getByText("Read the terms first.")).toHaveAttribute(
      "id",
      `${checkbox.id}-hint`
    );
    expect(checkbox).toHaveAttribute(
      "aria-describedby",
      `${checkbox.id}-hint`
    );
  });

  it("renders an error with aria-invalid and describedby", () => {
    render(<Checkbox label="Terms" error="You must accept the terms." />);
    const checkbox = screen.getByRole("checkbox", { name: "Terms" });
    const message = screen.getByText("You must accept the terms.");
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(message).toHaveAttribute("id", `${checkbox.id}-error`);
    expect(checkbox).toHaveAttribute(
      "aria-describedby",
      `${checkbox.id}-error`
    );
  });

  it("applies the error style and shows the error over the hint", () => {
    render(<Checkbox label="Terms" hint="Optional" error="Required." />);
    const checkbox = screen.getByRole("checkbox", { name: "Terms" });
    expect(checkbox.closest(".viora-checkbox")).toHaveClass(
      "viora-checkbox--error"
    );
    expect(screen.getByText("Required.")).toBeInTheDocument();
    expect(screen.queryByText("Optional")).toBeNull();
  });

  it("uses the provided id", () => {
    render(<Checkbox id="terms" label="Terms" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("id", "terms");
  });

  it("merges custom className with component classes", () => {
    render(<Checkbox label="Custom" className="custom-class" />);
    expect(screen.getByRole("checkbox")).toHaveClass(
      "viora-checkbox__input",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Checkbox label="Value" value="newsletter" data-testid="cb" />);
    const checkbox = screen.getByTestId("cb");
    expect(checkbox).toHaveAttribute("value", "newsletter");
  });
});