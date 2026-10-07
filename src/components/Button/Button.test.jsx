import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>Save changes</Button>);
    expect(
      screen.getByRole("button", { name: "Save changes" })
    ).toBeInTheDocument();
  });

  it("fires onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} type="submit">
        Submit
      </Button>
    );
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>
    );
    await user.click(screen.getByRole("button", { name: "Disabled" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("uses type=button by default", () => {
    render(<Button>Default</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("respects a custom type", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("applies the primary variant by default", () => {
    render(<Button>Primary</Button>);
    expect(screen.getByRole("button")).toHaveClass(
      "viora-button",
      "viora-button--primary",
      "viora-button--md"
    );
  });

  it.each(["primary", "secondary", "outline", "ghost", "danger"])(
    "applies the %s variant class",
    (variant) => {
      render(<Button variant={variant}>Action</Button>);
      expect(screen.getByRole("button")).toHaveClass(
        `viora-button--${variant}`
      );
    }
  );

  it.each(["sm", "md", "lg"])("applies the %s size class", (size) => {
    render(<Button size={size}>Action</Button>);
    expect(screen.getByRole("button")).toHaveClass(`viora-button--${size}`);
  });

  it("shows a spinner and sets aria-busy while loading", () => {
    const { container } = render(<Button loading>Saving</Button>);
    const button = screen.getByRole("button", { name: "Saving" });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toBeDisabled();
    expect(container.querySelector(".viora-button__spinner")).toBeInTheDocument();
  });

  it("is disabled while loading so it cannot be clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Saving
      </Button>
    );
    await user.click(screen.getByRole("button", { name: "Saving" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not render a spinner when not loading", () => {
    const { container } = render(<Button>Idle</Button>);
    expect(container.querySelector(".viora-button__spinner")).toBeNull();
    expect(screen.getByRole("button")).not.toHaveAttribute("aria-busy");
  });

  it("merges custom className with component classes", () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole("button")).toHaveClass(
      "viora-button",
      "custom-class"
    );
  });

  it("forwards native button attributes", () => {
    render(
      <Button name="action" value="save" aria-label="Save document">
        Save
      </Button>
    );
    const button = screen.getByRole("button", { name: "Save document" });
    expect(button).toHaveAttribute("name", "action");
    expect(button).toHaveAttribute("value", "save");
  });
});
