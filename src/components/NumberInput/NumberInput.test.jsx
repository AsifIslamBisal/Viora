import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NumberInput } from "./NumberInput";

describe("NumberInput", () => {
  it("displays the value in the input", () => {
    render(<NumberInput value={5} onChange={() => {}} />);
    expect(screen.getByRole("textbox")).toHaveValue("5");
  });

  it("renders increment and decrement buttons", () => {
    render(<NumberInput value={5} onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Increment" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Decrement" })).toBeInTheDocument();
  });

  it("increments by the step value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberInput value={5} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Increment" }));
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it("decrements by the step value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberInput value={5} step={2} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Decrement" }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("disables increment at max", () => {
    render(<NumberInput value={10} max={10} onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Increment" })).toBeDisabled();
  });

  it("disables decrement at min", () => {
    render(<NumberInput value={0} min={0} onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Decrement" })).toBeDisabled();
  });

  it("reports typed numbers through onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberInput value={0} onChange={onChange} />);
    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "7");
    expect(onChange).toHaveBeenCalledWith(7);
  });

  it("clamps typed values to max", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberInput value={5} max={10} onChange={onChange} />);
    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "200");
    expect(onChange).toHaveBeenCalledWith(10);
  });

  it("ignores non-numeric input", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberInput value={5} onChange={onChange} />);
    await user.type(screen.getByRole("textbox"), "abc");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders label and wires it to the input", () => {
    render(<NumberInput value={1} onChange={() => {}} label="Quantity" />);
    expect(screen.getByLabelText("Quantity")).toBeInTheDocument();
  });

  it("renders an error message and marks the input as invalid", () => {
    render(<NumberInput value={1} onChange={() => {}} label="Quantity" error="Too big" />);
    const input = screen.getByLabelText("Quantity");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Too big");
  });

  it("links hints as the accessible description", () => {
    render(<NumberInput value={1} onChange={() => {}} label="Quantity" hint="1–10" />);
    expect(screen.getByLabelText("Quantity")).toHaveAccessibleDescription("1–10");
  });

  it("applies the size class", () => {
    render(<NumberInput value={1} onChange={() => {}} size="lg" />);
    expect(document.querySelector(".viora-input-number")).toHaveClass(
      "viora-input-number--lg"
    );
  });

  it("disables buttons and input when disabled", () => {
    render(<NumberInput value={1} onChange={() => {}} disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Increment" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Decrement" })).toBeDisabled();
  });

  it("merges custom className with component classes", () => {
    render(<NumberInput value={1} onChange={() => {}} className="custom-class" />);
    expect(document.querySelector(".viora-input-number")).toHaveClass(
      "viora-input-number",
      "custom-class"
    );
  });
});