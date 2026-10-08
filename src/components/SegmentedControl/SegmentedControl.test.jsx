import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SegmentedControl } from "./SegmentedControl";

const OPTIONS = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

describe("SegmentedControl", () => {
  it("renders options as a labelled radio group", () => {
    render(<SegmentedControl options={OPTIONS} label="View" />);
    const group = screen.getByRole("radiogroup", { name: "View" });
    expect(group).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("marks the controlled value selected", () => {
    render(<SegmentedControl options={OPTIONS} value="week" label="View" />);
    expect(screen.getByRole("radio", { name: "Week" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
    expect(screen.getByRole("radio", { name: "Day" })).toHaveAttribute(
      "aria-checked",
      "false"
    );
  });

  it("uses the first option by default", () => {
    render(<SegmentedControl options={OPTIONS} label="View" />);
    expect(screen.getByRole("radio", { name: "Day" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
  });

  it("honors a defaultValue", () => {
    render(<SegmentedControl options={OPTIONS} defaultValue="month" label="View" />);
    expect(screen.getByRole("radio", { name: "Month" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
  });

  it("selects on click and reports changes", () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={OPTIONS} label="View" onChange={onChange} />);
    fireEvent.click(screen.getByRole("radio", { name: "Month" }));
    expect(onChange).toHaveBeenCalledWith("month");
  });

  it("navigates with arrow keys", () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={OPTIONS} label="View" onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("radio", { name: "Day" }), { key: "ArrowRight" });
    expect(onChange).toHaveBeenLastCalledWith("week");
    fireEvent.keyDown(screen.getByRole("radio", { name: "Week" }), { key: "ArrowLeft" });
    expect(onChange).toHaveBeenLastCalledWith("day");
  });

  it("wraps around at the ends with arrow keys", () => {
    const onChange = vi.fn();
    const first = render(
      <SegmentedControl options={OPTIONS} value="month" label="View" onChange={onChange} />
    );
    fireEvent.keyDown(screen.getByRole("radio", { name: "Month" }), { key: "ArrowRight" });
    expect(onChange).toHaveBeenLastCalledWith("day");
    first.unmount();

    const onChangeLeft = vi.fn();
    render(
      <SegmentedControl options={OPTIONS} value="day" label="View" onChange={onChangeLeft} />
    );
    fireEvent.keyDown(screen.getByRole("radio", { name: "Day" }), { key: "ArrowLeft" });
    expect(onChangeLeft).toHaveBeenLastCalledWith("month");
  });

  it("jumps to the first and last enabled option with Home and End", () => {
    const onChange = vi.fn();
    render(
      <SegmentedControl
        options={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
        ]}
        value="week"
        label="View"
        onChange={onChange}
      />
    );
    fireEvent.keyDown(screen.getByRole("radio", { name: "Week" }), { key: "Home" });
    expect(onChange).toHaveBeenLastCalledWith("day");
    fireEvent.keyDown(screen.getByRole("radio", { name: "Day" }), { key: "End" });
    expect(onChange).toHaveBeenLastCalledWith("month");
  });

  it("skips disabled options during navigation", () => {
    const onChange = vi.fn();
    render(
      <SegmentedControl
        options={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week", disabled: true },
          { value: "month", label: "Month" },
        ]}
        label="View"
        onChange={onChange}
      />
    );
    fireEvent.keyDown(screen.getByRole("radio", { name: "Day" }), { key: "ArrowRight" });
    expect(onChange).toHaveBeenLastCalledWith("month");
  });

  it("uses roving tabindex", () => {
    render(<SegmentedControl options={OPTIONS} value="month" label="View" />);
    expect(screen.getByRole("radio", { name: "Month" })).toHaveAttribute(
      "tabindex",
      "0"
    );
    expect(screen.getByRole("radio", { name: "Day" })).toHaveAttribute(
      "tabindex",
      "-1"
    );
  });

  it("moves focus when navigating with arrows", () => {
    render(<SegmentedControl options={OPTIONS} label="View" />);
    const day = screen.getByRole("radio", { name: "Day" });
    fireEvent.keyDown(day, { key: "ArrowRight" });
    expect(screen.getByRole("radio", { name: "Week" })).toHaveFocus();
  });

  it("ignores keys when every option is disabled", () => {
    const onChange = vi.fn();
    render(
      <SegmentedControl
        options={OPTIONS.map((option) => ({ ...option, disabled: true }))}
        label="View"
        onChange={onChange}
      />
    );
    fireEvent.keyDown(screen.getByRole("radio", { name: "Day" }), { key: "ArrowRight" });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("disables the whole control", () => {
    render(<SegmentedControl options={OPTIONS} label="View" disabled />);
    expect(screen.getAllByRole("radio")).toHaveLength(3);
    screen.getAllByRole("radio").forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it("applies size modifiers", () => {
    const { container } = render(
      <SegmentedControl options={OPTIONS} label="View" size="sm" />
    );
    expect(container.querySelector(".viora-segmented")).toHaveClass(
      "viora-segmented--sm"
    );
  });

  it("merges custom className with component classes", () => {
    const { container } = render(
      <SegmentedControl options={OPTIONS} label="View" className="custom-class" />
    );
    expect(container.querySelector(".viora-segmented")).toHaveClass(
      "viora-segmented",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<SegmentedControl options={OPTIONS} label="View" data-testid="seg" />);
    expect(screen.getByTestId("seg")).toHaveClass("viora-segmented");
  });
});