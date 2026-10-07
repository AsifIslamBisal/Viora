import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioGroup } from "./RadioGroup";
import { Radio } from "./Radio";

const PLAN_OPTIONS = (
  <>
    <Radio value="free" label="Free" />
    <Radio value="pro" label="Pro" />
    <Radio value="team" label="Team" />
  </>
);

const noop = () => {};

describe("RadioGroup", () => {
  it("renders a radiogroup with an accessible legend", () => {
    render(
      <RadioGroup label="Plan" value="free" onChange={noop}>
        {PLAN_OPTIONS}
      </RadioGroup>
    );
    expect(screen.getByRole("radiogroup", { name: "Plan" })).toBeInTheDocument();
  });

  it("renders radios with accessible names", () => {
    render(
      <RadioGroup label="Plan" value="free" onChange={noop}>
        {PLAN_OPTIONS}
      </RadioGroup>
    );
    expect(screen.getByRole("radio", { name: "Free" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Pro" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Team" })).toBeInTheDocument();
  });

  it("checks the option matching the group value", () => {
    render(
      <RadioGroup label="Plan" value="pro" onChange={noop}>
        {PLAN_OPTIONS}
      </RadioGroup>
    );
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Free" })).not.toBeChecked();
  });

  it("shares the group name across all radios", () => {
    render(
      <RadioGroup label="Plan" name="plan" value="free" onChange={noop}>
        {PLAN_OPTIONS}
      </RadioGroup>
    );
    for (const name of ["Free", "Pro", "Team"]) {
      expect(screen.getByRole("radio", { name })).toHaveAttribute(
        "name",
        "plan"
      );
    }
  });

  it("fires onChange with the selected value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RadioGroup label="Plan" value="free" onChange={onChange}>
        {PLAN_OPTIONS}
      </RadioGroup>
    );
    await user.click(screen.getByText("Team"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.value).toBe("team");
  });

  it("disables all radios when the group is disabled", () => {
    render(
      <RadioGroup label="Plan" value="free" onChange={noop} disabled>
        {PLAN_OPTIONS}
      </RadioGroup>
    );
    for (const name of ["Free", "Pro", "Team"]) {
      expect(screen.getByRole("radio", { name })).toBeDisabled();
    }
  });

  it("honors a per-radio disabled prop", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RadioGroup label="Plan" value="free" onChange={onChange}>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" disabled />
      </RadioGroup>
    );
    await user.click(screen.getByText("Pro"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it.each(["column", "row"])("applies the %s direction class", (direction) => {
    render(
      <RadioGroup label="Plan" value="free" onChange={noop} direction={direction}>
        {PLAN_OPTIONS}
      </RadioGroup>
    );
    expect(screen.getByRole("radiogroup")).toHaveClass(
      `viora-radio-group--${direction}`
    );
  });

  it("renders a hint wired to the group", () => {
    render(
      <RadioGroup label="Plan" value="free" onChange={noop} hint="Billed monthly.">
        {PLAN_OPTIONS}
      </RadioGroup>
    );
    const group = screen.getByRole("radiogroup");
    expect(screen.getByText("Billed monthly.")).toBeInTheDocument();
    expect(group).toHaveAttribute(
      "aria-describedby",
      `${group.id}-hint`
    );
  });

  it("renders an error message and takes precedence over the hint", () => {
    render(
      <RadioGroup
        label="Plan"
        value="free"
        onChange={noop}
        hint="Billed monthly."
        error="Choose a plan."
      >
        {PLAN_OPTIONS}
      </RadioGroup>
    );
    const group = screen.getByRole("radiogroup");
    expect(screen.getByText("Choose a plan.")).toHaveClass(
      "viora-field__message--error"
    );
    expect(screen.queryByText("Billed monthly.")).toBeNull();
    expect(group).toHaveAttribute("aria-describedby", `${group.id}-error`);
  });

  it("merges custom className with component classes", () => {
    render(
      <RadioGroup label="Plan" value="free" onChange={noop} className="custom-class">
        {PLAN_OPTIONS}
      </RadioGroup>
    );
    expect(screen.getByRole("radiogroup")).toHaveClass(
      "viora-radio-group",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(
      <RadioGroup label="Plan" value="free" onChange={noop} data-testid="group">
        {PLAN_OPTIONS}
      </RadioGroup>
    );
    expect(screen.getByTestId("group")).toHaveClass("viora-radio-group");
  });
});