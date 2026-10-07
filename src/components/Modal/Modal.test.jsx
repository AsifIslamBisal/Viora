import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Modal } from "./Modal";

const ModalHarness = ({ initialOpen = true, ...props }) => {
  const [open, setOpen] = useState(initialOpen);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open modal
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Confirm" {...props}>
        Modal content
      </Modal>
    </>
  );
};

describe("Modal", () => {
  it("renders nothing when closed", () => {
    render(<Modal open={false} onClose={() => {}} title="Confirm" />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders a dialog with aria-modal when open", () => {
    render(<Modal open onClose={() => {}} title="Confirm" />);
    const dialog = screen.getByRole("dialog", { name: "Confirm" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("labels the dialog with its title", () => {
    render(<Modal open onClose={() => {}} title="Confirm" />);
    const dialog = screen.getByRole("dialog");
    const heading = screen.getByRole("heading", { name: "Confirm" });
    expect(dialog).toHaveAttribute("aria-labelledby", heading.id);
  });

  it("links the description via aria-describedby", () => {
    render(
      <Modal open onClose={() => {}} title="Confirm" description="Please proceed." />
    );
    const dialog = screen.getByRole("dialog");
    const description = screen.getByText("Please proceed.");
    expect(dialog).toHaveAttribute("aria-describedby", description.id);
  });

  it("portals the dialog content into document.body", () => {
    render(<Modal open onClose={() => {}} title="Confirm" />);
    expect(document.querySelector(".viora-modal")).toBeInTheDocument();
  });

  it("calls onClose when the close button is pressed", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="Confirm" />);
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on Escape", () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="Confirm" />);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close on Escape when closeOnEscape is false", () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Confirm" closeOnEscape={false} />
    );
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes when the overlay is clicked", () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="Confirm" />);
    fireEvent.mouseDown(document.querySelector(".viora-modal"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close when the dialog itself is clicked", () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="Confirm" />);
    fireEvent.mouseDown(screen.getByRole("dialog"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("focuses the dialog on open", () => {
    render(<Modal open onClose={() => {}} title="Confirm" />);
    expect(screen.getByRole("dialog")).toHaveFocus();
  });

  it("returns focus to the trigger on close", async () => {
    const user = userEvent.setup();
    render(<ModalHarness initialOpen={false} title="Confirm" />);
    const trigger = screen.getByRole("button", { name: "Open modal" });
    await user.click(trigger);
    expect(screen.getByRole("dialog")).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("locks body scroll while open and restores it on close", async () => {
    const user = userEvent.setup();
    render(<ModalHarness initialOpen={false} title="Confirm" />);
    expect(document.body.style.overflow).toBe("");
    await user.click(screen.getByRole("button", { name: "Open modal" }));
    expect(document.body.style.overflow).toBe("hidden");
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(document.body.style.overflow).toBe("");
  });

  it("cycles focus with the Tab key", () => {
    render(
      <Modal open onClose={() => {}} title="Confirm">
        <input placeholder="Field" />
      </Modal>
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
    render(<Modal open onClose={() => {}} title="Confirm" className="custom-class" />);
    expect(screen.getByRole("dialog")).toHaveClass(
      "viora-modal__dialog",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Modal open onClose={() => {}} title="Confirm" data-testid="modal" />);
    expect(screen.getByTestId("modal")).toHaveClass("viora-modal__dialog");
  });
});