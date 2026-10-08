import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CommandPalette } from "./CommandPalette";

const GROUPS = [
  {
    name: "View",
    items: [
      { id: "dashboard", label: "Go to dashboard", keywords: ["home"] },
      { id: "settings", label: "Open settings" },
    ],
  },
  {
    name: "Edit",
    items: [
      { id: "delete", label: "Delete item" },
      { id: "rename", label: "Rename item" },
    ],
  },
];

describe("CommandPalette", () => {
  it("renders nothing while closed", () => {
    const { container } = render(<CommandPalette open={false} groups={GROUPS} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the search input and grouped options when open", () => {
    render(<CommandPalette open groups={GROUPS} />);
    expect(
      screen.getByRole("combobox", { name: "" })
    ).toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: "Command palette" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "View" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /Go to dashboard/ })).toBeInTheDocument();
  });

  it("filters options by query", () => {
    render(<CommandPalette open groups={GROUPS} />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "delete" },
    });
    expect(screen.getByRole("option", { name: /Delete item/ })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /dashboard/ })).toBeNull();
  });

  it("matches against keywords", () => {
    render(<CommandPalette open groups={GROUPS} />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "home" },
    });
    expect(screen.getByRole("option", { name: /Go to dashboard/ })).toBeInTheDocument();
  });

  it("uses a custom filter", () => {
    const filter = vi.fn((query, item) => item.id.startsWith(query));
    render(<CommandPalette open groups={GROUPS} filter={filter} />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "ren" } });
    expect(screen.getByRole("option", { name: /Rename item/ })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /dashboard/ })).toBeNull();
  });

  it("shows the empty state when nothing matches", () => {
    render(<CommandPalette open groups={GROUPS} emptyState="Nothing found" />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "zzz" },
    });
    expect(screen.getByText("Nothing found")).toBeInTheDocument();
  });

  it("moves the active option with arrow keys", () => {
    render(<CommandPalette open groups={GROUPS} />);
    const input = screen.getByRole("combobox");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(screen.getByRole("option", { name: /Open settings/ })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(screen.getByRole("option", { name: /Go to dashboard/ })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  it("wraps around at the edges of the list", () => {
    render(<CommandPalette open groups={GROUPS} />);
    const input = screen.getByRole("combobox");
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(screen.getByRole("option", { name: /Rename item/ })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(screen.getByRole("option", { name: /Go to dashboard/ })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  it("runs the active command on Enter and closes", () => {
    const run = vi.fn();
    const onClose = vi.fn();
    render(
      <CommandPalette
        open
        groups={[{ name: null, items: [{ id: "go", label: "Go somewhere", run }] }]}
        onClose={onClose}
      />
    );
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "Enter" });
    expect(run).toHaveBeenCalledWith(
      expect.objectContaining({ id: "go" })
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("runs a command on click", () => {
    const run = vi.fn();
    render(
      <CommandPalette
        open
        groups={[{ name: null, items: [{ id: "go", label: "Go somewhere", run }] }]}
      />
    );
    fireEvent.click(screen.getByRole("option", { name: /Go somewhere/ }));
    expect(run).toHaveBeenCalledWith(expect.objectContaining({ id: "go" }));
  });

  it("closes on Escape", () => {
    const onClose = vi.fn();
    render(<CommandPalette open groups={GROUPS} onClose={onClose} />);
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes when the overlay is clicked", () => {
    const onClose = vi.fn();
    render(<CommandPalette open groups={GROUPS} onClose={onClose} />);
    fireEvent.mouseDown(document.querySelector(".viora-command"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close when the panel itself is clicked", () => {
    const onClose = vi.fn();
    render(<CommandPalette open groups={GROUPS} onClose={onClose} />);
    fireEvent.mouseDown(screen.getByRole("dialog"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("focuses the search input on open", () => {
    render(<CommandPalette open groups={GROUPS} />);
    expect(screen.getByRole("combobox")).toHaveFocus();
  });

  it("resets the query on reopen", () => {
    const { rerender } = render(<CommandPalette open groups={GROUPS} />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "settings" },
    });
    rerender(<CommandPalette open={false} groups={GROUPS} />);
    rerender(<CommandPalette open groups={GROUPS} />);
    expect(screen.getByRole("combobox")).toHaveValue("");
    expect(screen.getAllByRole("option")).toHaveLength(4);
  });

  it("sets aria-activedescendant to the active option", () => {
    render(<CommandPalette open groups={GROUPS} />);
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-activedescendant",
      "viora-command-settings"
    );
  });

  it("merges custom className on the panel", () => {
    render(<CommandPalette open groups={GROUPS} className="custom-class" />);
    expect(screen.getByRole("dialog")).toHaveClass("viora-command__panel", "custom-class");
  });

  it("forwards native attributes", () => {
    render(<CommandPalette open groups={GROUPS} data-testid="palette" />);
    expect(document.querySelector(".viora-command")).toHaveAttribute(
      "data-testid",
      "palette"
    );
  });
});