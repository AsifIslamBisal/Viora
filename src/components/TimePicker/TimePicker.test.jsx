import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TimePicker } from "./TimePicker";

describe("TimePicker", () => {
  it("renders a time input with its label", () => {
    render(<TimePicker label="Start time" />);
    expect(screen.getByLabelText("Start time")).toHaveAttribute("type", "time");
  });

  it("forwards the current value", () => {
    render(<TimePicker label="Start time" value="14:30" />);
    expect(screen.getByLabelText("Start time")).toHaveValue("14:30");
  });

  it("reports changes through onChange", () => {
    const onChange = vi.fn();
    render(<TimePicker label="Start time" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText("Start time"), {
      target: { value: "09:15" },
    });
    expect(onChange).toHaveBeenCalledWith("09:15");
  });

  it("defaults to minute-level steps", () => {
    render(<TimePicker label="Start time" />);
    expect(screen.getByLabelText("Start time")).toHaveAttribute("step", "60");
  });

  it("honors a custom step", () => {
    render(<TimePicker label="Start time" step={900} />);
    expect(screen.getByLabelText("Start time")).toHaveAttribute("step", "900");
  });

  it("disables the input when disabled", () => {
    render(<TimePicker label="Start time" disabled />);
    expect(screen.getByLabelText("Start time")).toBeDisabled();
  });

  it("wires hint and error messages", () => {
    const { rerender } = render(
      <TimePicker label="Start time" hint="24-hour format." />
    );
    expect(screen.getByLabelText("Start time")).toHaveAttribute(
      "aria-describedby",
      screen.getByText("24-hour format.").id
    );
    rerender(<TimePicker label="Start time" error="Required." />);
    expect(screen.getByLabelText("Start time")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("merges custom className with component classes", () => {
    const { container } = render(
      <TimePicker label="Start time" className="custom-class" />
    );
    expect(container.querySelector(".viora-time-picker")).toHaveClass(
      "viora-time-picker",
      "custom-class"
    );
  });

  it("forwards native attributes to the input", () => {
    render(<TimePicker label="Start time" data-testid="start" />);
    expect(screen.getByTestId("start")).toHaveAttribute("type", "time");
  });
});