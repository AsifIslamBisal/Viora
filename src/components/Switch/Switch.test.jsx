import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders a switch with an accessible label", () => {
    render(<Switch label="Dark mode" />);
    expect(
      screen.getByRole("switch", { name: "Dark mode" })
    ).toBeInTheDocument();
  });

  it("does not render a label span when omitted", () => {
    const { container } = render(<Switch />);
    expect(container.querySelector(".viora-switch__label")).toBeNull();
  });

  it("reflects a checked prop", () => {
    render(<Switch label="Dark mode" checked />);
    expect(screen.getByRole("switch", { name: "Dark mode" })).toBeChecked();
  });

  it("fires onChange when clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch label="Dark mode" onChange={onChange} />);
    await user.click(screen.getByText("Dark mode"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.checked).toBe(true);
  });

  it("does not fire onChange when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch label="Locked" disabled onChange={onChange} />);
    await user.click(screen.getByText("Locked"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders a hint wired via aria-describedby", () => {
    render(<Switch label="Dark mode" hint="Changes the whole theme." />);
    const switchEl = screen.getByRole("switch", { name: "Dark mode" });
    expect(screen.getByText("Changes the whole theme.")).toHaveAttribute(
      "id",
      `${switchEl.id}-hint`
    );
    expect(switchEl).toHaveAttribute(
      "aria-describedby",
      `${switchEl.id}-hint`
    );
  });

  it("renders an error with aria-invalid and describedby", () => {
    render(<Switch label="Auto sync" error="Sync failed." />);
    const switchEl = screen.getByRole("switch", { name: "Auto sync" });
    const message = screen.getByText("Sync failed.");
    expect(switchEl).toHaveAttribute("aria-invalid", "true");
    expect(message).toHaveAttribute("id", `${switchEl.id}-error`);
    expect(switchEl).toHaveAttribute("aria-describedby", `${switchEl.id}-error`);
  });

  it("applies the error style and shows the error over the hint", () => {
    render(<Switch label="Auto sync" hint="Optional" error="Required." />);
    const switchEl = screen.getByRole("switch", { name: "Auto sync" });
    expect(switchEl.closest(".viora-switch")).toHaveClass(
      "viora-switch--error"
    );
    expect(screen.getByText("Required.")).toBeInTheDocument();
    expect(screen.queryByText("Optional")).toBeNull();
  });

  it("uses the provided id", () => {
    render(<Switch id="dark" label="Dark mode" />);
    expect(screen.getByRole("switch")).toHaveAttribute("id", "dark");
  });

  it("merges custom className with component classes", () => {
    render(<Switch label="Custom" className="custom-class" />);
    expect(screen.getByRole("switch")).toHaveClass(
      "viora-switch__input",
      "custom-class"
    );
  });

  it("forwards aria-label when no label is given", () => {
    render(<Switch aria-label="Notifications" />);
    expect(
      screen.getByRole("switch", { name: "Notifications" })
    ).toBeInTheDocument();
  });
});