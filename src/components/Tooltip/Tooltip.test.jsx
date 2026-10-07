import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("links the trigger to the tooltip via aria-describedby", () => {
    const { container } = render(
      <Tooltip content="Delete this item">
        <button>Delete</button>
      </Tooltip>
    );
    const trigger = screen.getByRole("button", { name: "Delete" });
    const tooltip = container.querySelector('[role="tooltip"]');
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
  });

  it("is hidden by default", () => {
    const { container } = render(
      <Tooltip content="Delete this item">
        <button>Delete</button>
      </Tooltip>
    );
    expect(container.querySelector('[role="tooltip"]')).toHaveAttribute(
      "aria-hidden",
      "true"
    );
    expect(screen.getByRole("button").closest(".viora-tooltip")).not.toHaveClass(
      "viora-tooltip--open"
    );
  });

  it("shows on hover and hides on unhover", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Delete this item">
        <button>Delete</button>
      </Tooltip>
    );
    const trigger = screen.getByRole("button", { name: "Delete" });
    const wrapper = trigger.closest(".viora-tooltip");
    await user.hover(trigger);
    expect(wrapper).toHaveClass("viora-tooltip--open");
    expect(screen.getByRole("tooltip")).toHaveAttribute("aria-hidden", "false");
    await user.unhover(trigger);
    expect(wrapper).not.toHaveClass("viora-tooltip--open");
  });

  it("shows on keyboard focus and hides on blur", () => {
    render(
      <Tooltip content="Save your work">
        <button>Save</button>
      </Tooltip>
    );
    const trigger = screen.getByRole("button", { name: "Save" });
    const wrapper = trigger.closest(".viora-tooltip");
    fireEvent.focus(trigger);
    expect(wrapper).toHaveClass("viora-tooltip--open");
    fireEvent.blur(trigger);
    expect(wrapper).not.toHaveClass("viora-tooltip--open");
  });

  it("applies the top placement by default", () => {
    render(
      <Tooltip content="Top">
        <button>Action</button>
      </Tooltip>
    );
    expect(screen.getByRole("button").closest(".viora-tooltip")).toHaveClass(
      "viora-tooltip--top"
    );
  });

  it.each(["top", "right", "bottom", "left"])(
    "applies the %s placement class",
    (placement) => {
      render(
        <Tooltip placement={placement} content="Pinned">
          <button>Action</button>
        </Tooltip>
      );
      expect(screen.getByRole("button").closest(".viora-tooltip")).toHaveClass(
        `viora-tooltip--${placement}`
      );
    }
  );

  it("renders the content text", () => {
    const { container } = render(
      <Tooltip content="Delete this item">
        <button>Delete</button>
      </Tooltip>
    );
    expect(container.querySelector('[role="tooltip"]')).toHaveTextContent(
      "Delete this item"
    );
  });

  it("keeps the trigger's own props", () => {
    render(
      <Tooltip content="Go">
        <button className="my-button">Action</button>
      </Tooltip>
    );
    const trigger = screen.getByRole("button", { name: "Action" });
    expect(trigger).toHaveClass("my-button");
    expect(trigger).toHaveAttribute("aria-describedby");
  });

  it("merges custom className with component classes", () => {
    render(
      <Tooltip content="X" className="custom-class">
        <button>Action</button>
      </Tooltip>
    );
    expect(screen.getByRole("button").closest(".viora-tooltip")).toHaveClass(
      "viora-tooltip",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(
      <Tooltip content="X" data-testid="tip">
        <button>Action</button>
      </Tooltip>
    );
    expect(screen.getByTestId("tip")).toHaveClass("viora-tooltip");
  });
});