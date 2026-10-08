import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Drawer } from "./Drawer";

const DrawerHarness = ({ initialOpen = true, ...props }) => {
  const [open, setOpen] = useState(initialOpen);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open drawer
      </button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Settings" {...props}>
        Panel content
      </Drawer>
    </>
  );
};

describe("Drawer", () => {
  it("renders nothing when closed", () => {
    render(<Drawer open={false} onClose={() => {}} title="Settings" />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders a dialog with aria-modal when open", () => {
    render(<Drawer open onClose={() => {}} title="Settings" />);
    const dialog = screen.getByRole("dialog", { name: "Settings" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("labels the dialog with its title", () => {
    render(<Drawer open onClose={() => {}} title="Settings" />);
    const dialog = screen.getByRole("dialog");
    const heading = screen.getByRole("heading", { name: "Settings" });
    expect(dialog).toHaveAttribute("aria-labelledby", heading.id);
  });

  it("links the description via aria-describedby", () => {
    render(
      <Drawer open onClose={() => {}} title="Settings" description="Fine-tune this workspace." />
    );
    const dialog = screen.getByRole("dialog");
    const description = screen.getByText("Fine-tune this workspace.");
    expect(dialog).toHaveAttribute("aria-describedby", description.id);
  });

  it("portals the panel content into document.body", () => {
    render(<Drawer open onClose={() => {}} title="Settings" />);
    expect(document.querySelector(".viora-drawer")).toBeInTheDocument();
  });

  it("slides in from the right by default", () => {
    render(<Drawer open onClose={() => {}} title="Settings" />);
    expect(screen.getByRole("dialog")).toHaveClass("viora-drawer__panel--right");
  });

  it("supports a left placement", () => {
    render(<Drawer open onClose={() => {}} title="Settings" placement="left" />);
    expect(screen.getByRole("dialog")).toHaveClass("viora-drawer__panel--left");
  });

  it("applies a custom width", () => {
    render(<Drawer open onClose={() => {}} title="Settings" width="560px" />);
    expect(screen.getByRole("dialog")).toHaveStyle({ width: "560px" });
  });

  it("calls onClose when the close button is pressed", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Drawer open onClose={onClose} title="Settings" />);
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on Escape", () => {
    const onClose = vi.fn();
    render(<Drawer open onClose={onClose} title="Settings" />);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close on Escape when closeOnEscape is false", () => {
    const onClose = vi.fn();
    render(
      <Drawer open onClose={onClose} title="Settings" closeOnEscape={false} />
    );
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes when the overlay is clicked", () => {
    const onClose = vi.fn();
    render(<Drawer open onClose={onClose} title="Settings" />);
    fireEvent.mouseDown(document.querySelector(".viora-drawer"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close when the panel itself is clicked", () => {
    const onClose = vi.fn();
    render(<Drawer open onClose={onClose} title="Settings" />);
    fireEvent.mouseDown(screen.getByRole("dialog"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("focuses the panel on open", () => {
    render(<Drawer open onClose={() => {}} title="Settings" />);
    expect(screen.getByRole("dialog")).toHaveFocus();
  });

  it("returns focus to the trigger on close", async () => {
    const user = userEvent.setup();
    render(<DrawerHarness initialOpen={false} title="Settings" />);
    const trigger = screen.getByRole("button", { name: "Open drawer" });
    await user.click(trigger);
    expect(screen.getByRole("dialog")).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("locks body scroll while open and restores it on close", async () => {
    const user = userEvent.setup();
    render(<DrawerHarness initialOpen={false} title="Settings" />);
    expect(document.body.style.overflow).toBe("");
    await user.click(screen.getByRole("button", { name: "Open drawer" }));
    expect(document.body.style.overflow).toBe("hidden");
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(document.body.style.overflow).toBe("");
  });

  it("cycles focus with the Tab key", () => {
    render(
      <Drawer open onClose={() => {}} title="Settings">
        <input placeholder="Field" />
      </Drawer>
    );
    const dialog = screen.getByRole("dialog");
    const closeButton = screen.getByRole("button", { name: "Close" });
    const input = screen.getByPlaceholderText("Field");
    input.focus();
    fireEvent.keyDown(dialog, { key: "Tab" });
    expect(closeButton).toHaveFocus();
    fireEvent.keyDown(dialog, { key: "Tab", shiftKey: true });
    expect(input).toHaveFocus();
  });

  it("merges custom className with component classes", () => {
    render(
      <Drawer open onClose={() => {}} title="Settings" className="custom-class" />
    );
    expect(screen.getByRole("dialog")).toHaveClass(
      "viora-drawer__panel",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Drawer open onClose={() => {}} title="Settings" data-testid="drawer" />);
    expect(screen.getByTestId("drawer")).toHaveClass("viora-drawer__panel");
  });
});