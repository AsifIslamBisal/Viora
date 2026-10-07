import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";

const FRUITS = (
  <>
    <option value="">Choose a fruit</option>
    <option value="apple">Apple</option>
    <option value="kiwi">Kiwi</option>
  </>
);

describe("Select", () => {
  it("renders a select with an accessible label", () => {
    render(<Select label="Fruit">{FRUITS}</Select>);
    const select = screen.getByRole("combobox", { name: "Fruit" });
    expect(select).toBeInTheDocument();
  });

  it("renders its option children", () => {
    render(<Select label="Fruit">{FRUITS}</Select>);
    expect(
      screen.getByRole("option", { name: "Apple" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Kiwi" })
    ).toBeInTheDocument();
  });

  it("respects a defaultValue", () => {
    render(
      <Select label="Fruit" defaultValue="kiwi">
        {FRUITS}
      </Select>
    );
    expect(screen.getByRole("combobox")).toHaveValue("kiwi");
  });

  it("fires onChange when a new option is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Select label="Fruit" onChange={onChange}>
        {FRUITS}
      </Select>
    );
    await user.selectOptions(screen.getByRole("combobox"), "kiwi");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.value).toBe("kiwi");
  });

  it("renders a hint wired via aria-describedby", () => {
    render(
      <Select label="Fruit" hint="Choose your favourite.">
        {FRUITS}
      </Select>
    );
    const select = screen.getByRole("combobox");
    expect(screen.getByText("Choose your favourite.")).toHaveAttribute(
      "id",
      `${select.id}-hint`
    );
    expect(select).toHaveAttribute("aria-describedby", `${select.id}-hint`);
  });

  it("renders an error with aria-invalid and describedby", () => {
    render(
      <Select label="Fruit" error="Please choose a fruit.">
        {FRUITS}
      </Select>
    );
    const select = screen.getByRole("combobox");
    const message = screen.getByText("Please choose a fruit.");
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(message).toHaveAttribute("id", `${select.id}-error`);
    expect(select).toHaveAttribute("aria-describedby", `${select.id}-error`);
  });

  it("applies the error class when error is set", () => {
    render(
      <Select label="Fruit" error="Required">
        {FRUITS}
      </Select>
    );
    expect(screen.getByRole("combobox")).toHaveClass(
      "viora-select",
      "viora-select--error"
    );
  });

  it("shows the error message over the hint", () => {
    render(
      <Select label="Fruit" hint="Optional" error="Required field.">
        {FRUITS}
      </Select>
    );
    expect(screen.getByText("Required field.")).toBeInTheDocument();
    expect(screen.queryByText("Optional")).toBeNull();
  });

  it.each(["sm", "md", "lg"])("applies the %s size class", (size) => {
    render(
      <Select label="Fruit" size={size}>
        {FRUITS}
      </Select>
    );
    expect(screen.getByRole("combobox")).toHaveClass(`viora-select--${size}`);
  });

  it("can be disabled", () => {
    render(
      <Select label="Fruit" disabled>
        {FRUITS}
      </Select>
    );
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("uses the provided id", () => {
    render(
      <Select id="fruit" label="Fruit">
        {FRUITS}
      </Select>
    );
    expect(screen.getByRole("combobox")).toHaveAttribute("id", "fruit");
  });

  it("merges custom className with component classes", () => {
    render(
      <Select label="Fruit" className="custom-class">
        {FRUITS}
      </Select>
    );
    expect(screen.getByRole("combobox")).toHaveClass(
      "viora-select",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(
      <Select label="Fruit" name="fruit" data-testid="sel">
        {FRUITS}
      </Select>
    );
    const select = screen.getByTestId("sel");
    expect(select).toHaveAttribute("name", "fruit");
  });
});