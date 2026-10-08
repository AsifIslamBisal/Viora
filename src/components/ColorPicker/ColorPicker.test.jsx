import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { ColorPicker } from "./ColorPicker";

describe("ColorPicker", () => {
  it("renders the trigger with the current value", () => {
    render(<ColorPicker label="Accent" value="#ff0000" />);
    expect(screen.getByText("#ff0000")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /#ff0000/ })).not.toBeNull();
  });

  it("opens the picker on request", () => {
    render(<ColorPicker label="Accent" />);
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /#3b82f6/ }));
    expect(screen.getByRole("dialog", { name: "Accent picker" })).toBeInTheDocument();
  });

  it("renders the preset swatches", () => {
    render(<ColorPicker label="Accent" colors={["#111111", "#222222"]} />);
    fireEvent.click(screen.getByRole("button", { name: /#3b82f6/ }));
    expect(screen.getByRole("button", { name: "#111111" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "#222222" })).toBeInTheDocument();
  });

  it("selects a preset and closes the popover", () => {
    const onChange = vi.fn();
    render(<ColorPicker label="Accent" onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: /#3b82f6/ }));
    fireEvent.click(screen.getByRole("button", { name: "#22c55e" }));
    expect(onChange).toHaveBeenCalledWith("#22c55e");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("marks the current color as pressed", () => {
    render(<ColorPicker label="Accent" value="#a855f7" />);
    fireEvent.click(screen.getByRole("button", { name: /#a855f7/ }));
    expect(
      within(screen.getByRole("dialog")).getByRole("button", { name: "#a855f7" })
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("forwards native color input changes", () => {
    const onChange = vi.fn();
    render(<ColorPicker label="Accent" value="#0000ff" onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: /#0000ff/ }));
    fireEvent.change(screen.getByLabelText("Pick a custom color"), {
      target: { value: "#00ff00" },
    });
    expect(onChange).toHaveBeenCalledWith("#00ff00");
  });

  it("commits a valid hex value on Enter", () => {
    const onChange = vi.fn();
    render(<ColorPicker label="Accent" value="#000000" onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: /#000000/ }));
    fireEvent.change(screen.getByLabelText("Hex color"), {
      target: { value: "#ABCDEF" },
    });
    fireEvent.keyDown(screen.getByLabelText("Hex color"), { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith("#abcdef");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("rejects an invalid hex value", () => {
    const onChange = vi.fn();
    render(<ColorPicker label="Accent" value="#000000" onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: /#000000/ }));
    fireEvent.change(screen.getByLabelText("Hex color"), {
      target: { value: "#zzzzzz" },
    });
    fireEvent.blur(screen.getByLabelText("Hex color"));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByText("#zzzzzz isn't a valid hex color")).toBeInTheDocument();
    expect(screen.getByLabelText("Hex color")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("closes on Escape via outside-click handling", () => {
    render(<ColorPicker label="Accent" />);
    fireEvent.click(screen.getByRole("button", { name: /#3b82f6/ }));
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("ignores outside clicks while closed", () => {
    render(<ColorPicker label="Accent" />);
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("disables the trigger", () => {
    render(<ColorPicker label="Accent" disabled />);
    expect(screen.getByRole("button", { name: /#3b82f6/ })).toBeDisabled();
  });

  it("wires hint and error messages", () => {
    const { rerender } = render(
      <ColorPicker label="Accent" hint="Pick a color." />
    );
    const hint = screen.getByText("Pick a color.");
    expect(hint).toHaveClass("viora-field__message");
    rerender(<ColorPicker label="Accent" error="Required." />);
    expect(screen.getByText("Required.")).toHaveClass(
      "viora-field__message--error"
    );
  });

  it("merges custom className with component classes", () => {
    const { container } = render(
      <ColorPicker label="Accent" className="custom-class" />
    );
    expect(container.querySelector(".viora-color-picker")).toHaveClass(
      "viora-color-picker",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<ColorPicker label="Accent" data-testid="color" />);
    expect(screen.getByTestId("color")).toHaveClass("viora-color-picker");
  });
});