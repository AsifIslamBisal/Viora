import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import userEvent from "@testing-library/user-event";
import { DatePicker } from "./DatePicker";

const dayLabel = (year, month, day) => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${weekdays[new Date(year, month, day).getDay()]}, ${months[month]} ${day}, ${year}`;
};

describe("DatePicker", () => {
  it("renders a combobox with the formatted value", () => {
    render(<DatePicker label="Due date" value={new Date(2026, 9, 15)} />);
    expect(screen.getByRole("combobox", { name: "Due date" })).toHaveValue(
      "10/15/2026"
    );
  });

  it("shows the placeholder when empty", () => {
    render(<DatePicker label="Due date" />);
    expect(screen.getByRole("combobox")).toHaveAttribute("placeholder", "Select a date");
  });

  it("opens the calendar popover on click", () => {
    render(<DatePicker label="Due date" />);
    const box = screen.getByRole("combobox");
    fireEvent.click(box);
    expect(box).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog", { name: "Choose date" })).toBeInTheDocument();
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("links the combobox to the popover via aria-controls", () => {
    render(<DatePicker label="Due date" value={new Date(2026, 9, 1)} />);
    const box = screen.getByRole("combobox");
    fireEvent.click(box);
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "id",
      box.getAttribute("aria-controls")
    );
  });

  it("reports a selected day and closes the popover", () => {
    const Picker = () => {
      const [value, setValue] = useState(new Date(2026, 9, 1));
      return <DatePicker label="Due date" value={value} onChange={setValue} />;
    };
    render(<Picker />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(
      screen.getByRole("button", { name: dayLabel(2026, 9, 4) })
    );
    expect(screen.getByRole("combobox")).toHaveValue("10/4/2026");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("does not select on an out-of-range day", () => {
    const onChange = vi.fn();
    render(
      <DatePicker
        label="Due date"
        value={new Date(2026, 9, 10)}
        min={new Date(2026, 9, 5)}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByRole("combobox"));
    expect(
      screen.getByRole("button", { name: dayLabel(2026, 9, 3) })
    ).toBeDisabled();
  });

  it("respects a custom date formatter", () => {
    const format = (date) => date.toLocaleDateString("en-GB");
    render(
      <DatePicker label="Due date" value={new Date(2026, 9, 15)} format={format} />
    );
    expect(screen.getByRole("combobox")).toHaveValue("15/10/2026");
  });

  it("closes on Escape without changing the value", () => {
    render(<DatePicker label="Due date" value={new Date(2026, 9, 15)} />);
    const box = screen.getByRole("combobox");
    fireEvent.click(box);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByRole("combobox")).toHaveValue("10/15/2026");
  });

  it("closes when clicking outside", () => {
    render(
      <>
        <DatePicker label="Due date" value={new Date(2026, 9, 15)} />
        <button type="button">Elsewhere</button>
      </>
    );
    const box = screen.getByRole("combobox");
    fireEvent.click(box);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole("button", { name: "Elsewhere" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("opens from the keyboard", async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Due date" />);
    const box = screen.getByRole("combobox");
    await user.click(box);
    box.focus();
    fireEvent.keyDown(box, { key: "ArrowDown" });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("disables opening when disabled", () => {
    render(<DatePicker label="Due date" disabled />);
    const box = screen.getByRole("combobox");
    fireEvent.click(box);
    expect(box).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("wires hint and error messages", () => {
    const { rerender } = render(
      <DatePicker label="Due date" hint="Pick a working day." />
    );
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-describedby",
      screen.getByText("Pick a working day.").id
    );
    rerender(<DatePicker label="Due date" error="Required." />);
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-describedby",
      screen.getByText("Required.").id
    );
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
  });

  it("merges custom className with component classes", () => {
    const { container } = render(
      <DatePicker label="Due date" className="custom-class" />
    );
    expect(container.querySelector(".viora-date-picker")).toHaveClass(
      "viora-date-picker",
      "custom-class"
    );
  });

  it("forwards native attributes to the input", () => {
    render(<DatePicker label="Due date" data-testid="due-date" />);
    expect(screen.getByTestId("due-date")).toHaveRole("combobox");
  });
});