import { describe, expect, it, vi } from "vitest";
import { useState } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MultiSelect } from "./MultiSelect";

const Harness = ({ options, onChange }) => {
  const [value, setValue] = useState([]);
  return (
    <MultiSelect
      options={options}
      value={value}
      onChange={(next) => {
        setValue(next);
        onChange?.(next);
      }}
    />
  );
};

const OPTIONS = [
  { value: "js", label: "JavaScript" },
  { value: "ts", label: "TypeScript" },
  { value: "rust", label: "Rust" },
];

describe("MultiSelect", () => {
  it("renders the placeholder on the trigger", () => {
    render(<MultiSelect options={OPTIONS} placeholder="Choose…" />);
    expect(screen.getByRole("button", { name: "Choose…" })).toBeInTheDocument();
  });

  it("shows the selected count on the trigger", () => {
    render(<MultiSelect options={OPTIONS} value={["js", "ts"]} />);
    expect(screen.getByRole("button", { name: "2 selected" })).toBeInTheDocument();
  });

  it("opens a multiselectable listbox on click", () => {
    render(<MultiSelect options={OPTIONS} />);
    fireEvent.click(screen.getByRole("button", { name: "Select items…" }));
    const listbox = screen.getByRole("listbox");
    expect(listbox).toHaveAttribute("aria-multiselectable", "true");
    expect(within(listbox).getByRole("option", { name: /JavaScript/ })).toBeInTheDocument();
  });

  it("toggles an option without closing and stays open", () => {
    const onChange = vi.fn();
    render(<MultiSelect options={OPTIONS} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Select items…" }));
    fireEvent.click(
      within(screen.getByRole("option", { name: /JavaScript/ })).getByRole("button")
    );
    expect(onChange).toHaveBeenCalledWith(["js"]);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("marks selected options with aria-selected", () => {
    render(<MultiSelect options={OPTIONS} value={["ts"]} />);
    fireEvent.click(screen.getByRole("button", { name: "1 selected" }));
    expect(screen.getByRole("option", { name: /TypeScript/ })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByRole("option", { name: /JavaScript/ })).toHaveAttribute(
      "aria-selected",
      "false"
    );
  });

  it("renders a removable chip per selected value", () => {
    render(<MultiSelect options={OPTIONS} value={["js", "ts"]} />);
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Remove JavaScript" })).toBeInTheDocument();
  });

  it("removes a value through its chip", () => {
    const onChange = vi.fn();
    render(<MultiSelect options={OPTIONS} value={["js", "ts"]} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Remove JavaScript" }));
    expect(onChange).toHaveBeenCalledWith(["ts"]);
  });

  it("accumulates multiple selections", () => {
    const onChange = vi.fn();
    render(<Harness options={OPTIONS} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Select items…" }));
    fireEvent.click(
      within(screen.getByRole("option", { name: /JavaScript/ })).getByRole("button")
    );
    fireEvent.click(
      within(screen.getByRole("option", { name: /Rust/ })).getByRole("button")
    );
    expect(onChange).toHaveBeenLastCalledWith(["js", "rust"]);
  });

  it("moves the active option with arrow keys and exposes it", () => {
    render(<MultiSelect options={OPTIONS} />);
    const trigger = screen.getByRole("button", { name: "Select items…" });
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.keyDown(trigger, { key: "ArrowDown", bubbles: true });
    expect(trigger).toHaveAttribute("aria-activedescendant", "viora-multi-ts");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("closes on Escape and returns focus", () => {
    render(<MultiSelect options={OPTIONS} />);
    const trigger = screen.getByRole("button", { name: "Select items…" });
    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByRole("listbox"), { key: "Escape" });
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("closes when clicking outside", () => {
    render(<MultiSelect options={OPTIONS} />);
    fireEvent.click(screen.getByRole("button", { name: "Select items…" }));
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("shows an empty option message when there are no options", () => {
    render(<MultiSelect options={[]} />);
    fireEvent.click(screen.getByRole("button", { name: "Select items…" }));
    expect(screen.getByText("No options")).toBeInTheDocument();
  });

  it("disables the trigger and chips", () => {
    render(<MultiSelect options={OPTIONS} value={["js"]} disabled />);
    expect(screen.getByRole("button", { name: "1 selected" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Remove JavaScript" })).toBeDisabled();
  });

  it("wires hint and error messages", () => {
    const { rerender } = render(
      <MultiSelect options={OPTIONS} hint="Pick at least one." />
    );
    expect(screen.getByText("Pick at least one.")).toBeInTheDocument();
    rerender(<MultiSelect options={OPTIONS} error="Required." />);
    expect(screen.getByText("Required.")).toHaveClass(
      "viora-field__message--error"
    );
    expect(screen.getByRole("button", { name: "Select items…" })).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("accepts string options", () => {
    render(<MultiSelect options={["alpha", "beta"]} />);
    fireEvent.click(screen.getByRole("button", { name: "Select items…" }));
    expect(screen.getByRole("option", { name: /alpha/ })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /beta/ })).toBeInTheDocument();
  });

  it("merges custom className with component classes", () => {
    const { container } = render(
      <MultiSelect options={OPTIONS} className="custom-class" />
    );
    expect(container.querySelector(".viora-multi")).toHaveClass(
      "viora-multi",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<MultiSelect options={OPTIONS} data-testid="multi" />);
    expect(screen.getByTestId("multi")).toHaveClass("viora-multi");
  });
});