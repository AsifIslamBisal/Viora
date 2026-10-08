import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Combobox } from "./Combobox";

const COUNTRIES = [
  "Albania",
  "Antarctica",
  "Bangladesh",
  "Brazil",
  "Canada",
  "Georgia",
];

describe("Combobox", () => {
  it("renders a combobox that starts closed", () => {
    render(<Combobox options={COUNTRIES} label="Country" />);
    const box = screen.getByRole("combobox", { name: "Country" });
    expect(box).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("links the input to its listbox", () => {
    render(<Combobox options={COUNTRIES} label="Country" />);
    const box = screen.getByRole("combobox");
    fireEvent.focus(box);
    expect(screen.getByRole("listbox")).toHaveAttribute(
      "id",
      box.getAttribute("aria-controls")
    );
  });

  it("opens and lists all options when focused", () => {
    render(<Combobox options={COUNTRIES} label="Country" />);
    fireEvent.focus(screen.getByRole("combobox"));
    expect(screen.getAllByRole("option")).toHaveLength(COUNTRIES.length);
  });

  it("filters options while typing", async () => {
    const user = userEvent.setup();
    render(<Combobox options={COUNTRIES} label="Country" />);
    await user.type(screen.getByRole("combobox"), "bang");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    expect(screen.getByRole("option", { name: "Bangladesh" })).toBeInTheDocument();
  });

  it("filters case-insensitively", async () => {
    const user = userEvent.setup();
    render(<Combobox options={COUNTRIES} label="Country" />);
    await user.type(screen.getByRole("combobox"), "GEO");
    expect(screen.getByRole("option", { name: "Georgia" })).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(1);
  });

  it("hides the listbox when nothing matches", async () => {
    const user = userEvent.setup();
    render(<Combobox options={COUNTRIES} label="Country" />);
    await user.type(screen.getByRole("combobox"), "zzz");
    expect(screen.queryByRole("option")).toBeNull();
  });

  it("moves the active option with the down arrow", () => {
    render(<Combobox options={COUNTRIES} label="Country" />);
    const box = screen.getByRole("combobox");
    fireEvent.focus(box);
    fireEvent.keyDown(box, { key: "ArrowDown" });
    const second = screen.getAllByRole("option")[1];
    expect(box).toHaveAttribute("aria-activedescendant", second.id);
    expect(second).toHaveClass("viora-combobox__option--active");
  });

  it("wraps the active option with arrow navigation", () => {
    render(<Combobox options={COUNTRIES} label="Country" />);
    const box = screen.getByRole("combobox");
    fireEvent.focus(box);
    const last = COUNTRIES.length - 1;
    for (let i = 0; i < last + 1; i += 1) {
      fireEvent.keyDown(box, { key: "ArrowDown" });
    }
    const options = screen.getAllByRole("option");
    expect(box).toHaveAttribute("aria-activedescendant", options[0].id);
    expect(options[0]).toHaveClass("viora-combobox__option--active");
  });

  it("selects the active option on Enter", () => {
    const onChange = vi.fn();
    render(<Combobox options={COUNTRIES} label="Country" onChange={onChange} />);
    const box = screen.getByRole("combobox");
    fireEvent.focus(box);
    fireEvent.keyDown(box, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith("Albania");
    expect(screen.getByRole("combobox")).toHaveValue("Albania");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("selects an option on click", () => {
    const onChange = vi.fn();
    render(<Combobox options={COUNTRIES} label="Country" onChange={onChange} />);
    fireEvent.focus(screen.getByRole("combobox"));
    fireEvent.mouseDown(screen.getByRole("option", { name: "Canada" }));
    expect(onChange).toHaveBeenCalledWith("Canada");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("supports object options with separate values and labels", () => {
    const onChange = vi.fn();
    const options = [
      { value: "us", label: "United States" },
      { value: "ca", label: "Canada" },
    ];
    render(<Combobox options={options} label="Country" onChange={onChange} />);
    fireEvent.focus(screen.getByRole("combobox"));
    fireEvent.mouseDown(screen.getByRole("option", { name: "Canada" }));
    expect(onChange).toHaveBeenCalledWith("ca");
  });

  it("marks the selected option", () => {
    render(
      <Combobox options={COUNTRIES} label="Country" value="Bangladesh" />
    );
    fireEvent.focus(screen.getByRole("combobox"));
    const selected = screen.getByRole("option", { name: "Bangladesh" });
    expect(selected).toHaveAttribute("aria-selected", "true");
  });

  it("closes and reverts the query on Escape", async () => {
    const user = userEvent.setup();
    render(
      <Combobox options={COUNTRIES} label="Country" value="Brazil" />
    );
    const box = screen.getByRole("combobox");
    expect(box).toHaveValue("Brazil");
    await user.clear(box);
    await user.type(box, "ge");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.keyDown(box, { key: "Escape" });
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(screen.getByRole("combobox")).toHaveValue("Brazil");
  });

  it("closes when clicking outside", () => {
    render(<Combobox options={COUNTRIES} label="Country" />);
    fireEvent.focus(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("links hint and error messages", () => {
    const { rerender } = render(
      <Combobox options={COUNTRIES} label="Country" hint="Pick one." />
    );
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-describedby",
      screen.getByText("Pick one.").id
    );
    rerender(
      <Combobox options={COUNTRIES} label="Country" error="Required." />
    );
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-describedby",
      screen.getByText("Required.").id
    );
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
  });

  it("disables the input when disabled", () => {
    render(<Combobox options={COUNTRIES} label="Country" disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("merges custom className with component classes", () => {
    const { container } = render(
      <Combobox options={COUNTRIES} label="Country" className="custom-class" />
    );
    expect(container.querySelector(".viora-combobox")).toHaveClass(
      "viora-combobox",
      "custom-class"
    );
  });

  it("forwards native attributes to the input", () => {
    render(
      <Combobox options={COUNTRIES} label="Country" data-testid="country" />
    );
    expect(screen.getByTestId("country")).toHaveRole("combobox");
  });
});