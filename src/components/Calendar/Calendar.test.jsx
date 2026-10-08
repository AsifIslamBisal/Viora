import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Calendar } from "./Calendar";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS = [
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

const dayLabel = (year, month, day) =>
  `${WEEKDAYS[new Date(year, month, day).getDay()]}, ${MONTHS[month]} ${day}, ${year}`;

const daysOf = () =>
  document.querySelectorAll('.viora-calendar__cell button');

describe("Calendar", () => {
  it("renders the month and year in the header", () => {
    render(<Calendar defaultMonth={new Date(2026, 9, 1)} />);
    expect(screen.getByText("October 2026")).toBeInTheDocument();
    expect(screen.getByRole("grid", { name: "October 2026" })).toBeInTheDocument();
  });

  it("renders the seven weekday columns", () => {
    render(<Calendar defaultMonth={new Date(2026, 9, 1)} />);
    expect(screen.getAllByRole("columnheader")).toHaveLength(7);
  });

  it("renders all days of the month", () => {
    render(<Calendar defaultMonth={new Date(2026, 9, 1)} />);
    expect(daysOf()).toHaveLength(31);
  });

  it("marks the selected day", () => {
    render(
      <Calendar defaultMonth={new Date(2026, 9, 1)} value={new Date(2026, 9, 10)} />
    );
    const selected = screen.getByRole("button", { name: dayLabel(2026, 9, 10) });
    expect(selected).toHaveAttribute("aria-selected", "true");
    expect(selected).toHaveClass("viora-calendar__day--selected");
  });

  it("reports the clicked day through onChange", () => {
    const onChange = vi.fn();
    render(
      <Calendar defaultMonth={new Date(2026, 9, 1)} onChange={onChange} />
    );
    fireEvent.click(screen.getByRole("button", { name: dayLabel(2026, 9, 15) }));
    expect(onChange).toHaveBeenCalledWith(new Date(2026, 9, 15));
  });

  it("navigates to the next and previous months", () => {
    render(<Calendar defaultMonth={new Date(2026, 9, 1)} />);
    fireEvent.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("November 2026")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByText("October 2026")).toBeInTheDocument();
  });

  it("disables navigation once the max month is reached", () => {
    render(
      <Calendar
        defaultMonth={new Date(2026, 9, 1)}
        max={new Date(2026, 9, 15)}
      />
    );
    expect(screen.getByRole("button", { name: "Next month" })).toBeDisabled();
  });

  it("disables navigation at the min month", () => {
    render(
      <Calendar
        defaultMonth={new Date(2026, 9, 1)}
        min={new Date(2026, 9, 1)}
      />
    );
    expect(screen.getByRole("button", { name: "Previous month" })).toBeDisabled();
  });

  it("disables days before the min date", () => {
    render(
      <Calendar
        defaultMonth={new Date(2026, 9, 1)}
        min={new Date(2026, 9, 5)}
      />
    );
    expect(
      screen.getByRole("button", { name: dayLabel(2026, 9, 4) })
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: dayLabel(2026, 9, 5) })
    ).not.toBeDisabled();
  });

  it("disables days after the max date", () => {
    render(
      <Calendar
        defaultMonth={new Date(2026, 9, 1)}
        max={new Date(2026, 9, 20)}
      />
    );
    expect(
      screen.getByRole("button", { name: dayLabel(2026, 9, 21) })
    ).toBeDisabled();
  });

  it("honors a custom disabledDate predicate", () => {
    render(
      <Calendar
        defaultMonth={new Date(2026, 9, 1)}
        disabledDate={(date) => date.getDay() === 0}
      />
    );
    expect(
      screen.getByRole("button", { name: dayLabel(2026, 9, 4) })
    ).toBeDisabled();
  });

  it("moves focus with the arrow keys and selects with Enter", () => {
    const onChange = vi.fn();
    render(
      <Calendar
        defaultMonth={new Date(2026, 9, 1)}
        value={new Date(2026, 9, 12)}
        onChange={onChange}
      />
    );
    const grid = screen.getByRole("grid", { name: "October 2026" });
    fireEvent.keyDown(grid, { key: "ArrowRight" });
    expect(document.activeElement).toHaveAccessibleName(dayLabel(2026, 9, 13));
    fireEvent.keyDown(grid, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(new Date(2026, 9, 13));
  });

  it("moves focus backward with the left arrow", () => {
    render(
      <Calendar defaultMonth={new Date(2026, 9, 1)} value={new Date(2026, 9, 1)} />
    );
    const grid = screen.getByRole("grid", { name: "October 2026" });
    fireEvent.keyDown(grid, { key: "ArrowRight" });
    fireEvent.keyDown(grid, { key: "ArrowLeft" });
    expect(document.activeElement).toHaveAccessibleName(dayLabel(2026, 9, 1));
  });

  it("merges custom className with component classes", () => {
    render(
      <Calendar defaultMonth={new Date(2026, 9, 1)} className="custom-class" />
    );
    expect(screen.getByRole("grid").parentElement).toHaveClass(
      "viora-calendar",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(
      <Calendar defaultMonth={new Date(2026, 9, 1)} data-testid="calendar" />
    );
    expect(screen.getByTestId("calendar")).toHaveClass("viora-calendar");
  });
});