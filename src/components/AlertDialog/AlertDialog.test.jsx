import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { AlertDialog } from "./AlertDialog";

describe("AlertDialog", () => {
  it("renders an alertdialog with the title when open", () => {
    render(
      <AlertDialog open title="Delete project?" message="This cannot be undone." />
    );
    expect(screen.getByRole("alertdialog", { name: "Delete project?" })).toBeInTheDocument();
    expect(screen.getByText("This cannot be undone.")).toBeInTheDocument();
  });

  it("renders nothing while closed", () => {
    const { container } = render(
      <AlertDialog open={false} title="Delete project?" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders children as the body", () => {
    render(
      <AlertDialog open title="Warning">
        <em>Are you sure?</em>
      </AlertDialog>
    );
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("shows default labels", () => {
    render(<AlertDialog open title="Delete project?" />);
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
  });

  it("uses custom labels", () => {
    render(
      <AlertDialog
        open
        title="Delete?"
        cancelLabel="Keep it"
        confirmLabel="Delete anyway"
      />
    );
    expect(screen.getByRole("button", { name: "Keep it" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete anyway" })).toBeInTheDocument();
  });

  it("closes on cancel", () => {
    const onClose = vi.fn();
    render(<AlertDialog open title="Delete project?" onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("runs onConfirm then closes", () => {
    const onConfirm = vi.fn();
    const onClose = vi.fn();
    render(
      <AlertDialog
        open
        title="Delete project?"
        onConfirm={onConfirm}
        onClose={onClose}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("styles the confirm button as destructive", () => {
    render(<AlertDialog open title="Delete project?" dangerConfirm />);
    expect(screen.getByRole("button", { name: "Confirm" })).toHaveClass(
      "viora-button--danger"
    );
  });

  it("uses a primary confirm button by default", () => {
    render(<AlertDialog open title="Save changes?" />);
    expect(screen.getByRole("button", { name: "Confirm" })).toHaveClass(
      "viora-button--primary"
    );
  });

  it("closes on overlay click", () => {
    const onClose = vi.fn();
    render(<AlertDialog open title="Delete project?" onClose={onClose} />);
    fireEvent.mouseDown(document.querySelector(".viora-modal"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("keeps the dialog open when overlay clicks are disabled", () => {
    const onClose = vi.fn();
    render(
      <AlertDialog
        open
        title="Delete project?"
        onClose={onClose}
        closeOnOverlayClick={false}
      />
    );
    fireEvent.mouseDown(document.querySelector(".viora-modal"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes on Escape", () => {
    const onClose = vi.fn();
    render(<AlertDialog open title="Delete project?" onClose={onClose} />);
    fireEvent.keyDown(screen.getByRole("alertdialog"), { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not render a close button", () => {
    render(<AlertDialog open title="Delete project?" />);
    expect(screen.queryByRole("button", { name: "Close" })).toBeNull();
  });

  it("merges custom className with component classes", () => {
    render(<AlertDialog open title="Delete project?" className="custom-class" />);
    expect(screen.getByRole("alertdialog")).toHaveClass("custom-class");
  });

  it("forwards native attributes", () => {
    render(<AlertDialog open title="Delete project?" data-testid="dialog" />);
    expect(screen.getByTestId("dialog")).toBeInTheDocument();
  });
});