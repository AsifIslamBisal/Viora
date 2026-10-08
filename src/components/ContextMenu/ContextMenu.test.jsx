import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ContextMenu } from "./ContextMenu";

const ITEMS = [
  { id: "rename", label: "Rename" },
  { id: "duplicate", label: "Duplicate" },
  { separator: true },
  { id: "delete", label: "Delete" },
];

describe("ContextMenu", () => {
  it("opens a menu on right-click", () => {
    render(<ContextMenu items={ITEMS}>Target</ContextMenu>);
    expect(screen.queryByRole("menu")).toBeNull();
    fireEvent.contextMenu(screen.getByText("Target"), { clientX: 100, clientY: 80 });
    expect(screen.getByRole("menu", { name: "Context menu" })).toBeInTheDocument();
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
  });

  it("opens the menu at the pointer position", () => {
    render(<ContextMenu items={ITEMS}>Target</ContextMenu>);
    fireEvent.contextMenu(screen.getByText("Target"), { clientX: 100, clientY: 80 });
    const menu = screen.getByRole("menu");
    expect(menu).toHaveStyle("left: 100px");
    expect(menu).toHaveStyle("top: 80px");
  });

  it("renders separators", () => {
    render(<ContextMenu items={ITEMS}>Target</ContextMenu>);
    fireEvent.contextMenu(screen.getByText("Target"), { clientX: 10, clientY: 10 });
    expect(screen.getAllByRole("separator")).toHaveLength(1);
  });

  it("runs onSelect and closes on click", () => {
    const onSelect = vi.fn();
    render(
      <ContextMenu items={[{ id: "rename", label: "Rename", onSelect }]}>
        Target
      </ContextMenu>
    );
    fireEvent.contextMenu(screen.getByText("Target"), { clientX: 10, clientY: 10 });
    fireEvent.click(screen.getByRole("menuitem", { name: "Rename" }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("closes on outside click", () => {
    render(<ContextMenu items={ITEMS}>Target</ContextMenu>);
    fireEvent.contextMenu(screen.getByText("Target"), { clientX: 10, clientY: 10 });
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("closes on Escape", () => {
    render(<ContextMenu items={ITEMS}>Target</ContextMenu>);
    fireEvent.contextMenu(screen.getByText("Target"), { clientX: 10, clientY: 10 });
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("navigates with arrow keys and selects with Enter", () => {
    const onSelect = vi.fn();
    const items = [
      { id: "a", label: "Alpha" },
      { id: "b", label: "Beta" },
      { id: "c", label: "Gamma", onSelect },
    ];
    render(<ContextMenu items={items}>Target</ContextMenu>);
    fireEvent.contextMenu(screen.getByText("Target"), { clientX: 10, clientY: 10 });
    const menu = screen.getByRole("menu");
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(screen.getByRole("menuitem", { name: "Gamma" })).toHaveClass(
      "viora-context-menu__item--active"
    );
    fireEvent.keyDown(menu, { key: "Enter" });
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("wraps around with arrow keys", () => {
    render(<ContextMenu items={ITEMS}>Target</ContextMenu>);
    fireEvent.contextMenu(screen.getByText("Target"), { clientX: 10, clientY: 10 });
    const menu = screen.getByRole("menu");
    fireEvent.keyDown(menu, { key: "ArrowUp" });
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveClass(
      "viora-context-menu__item--active"
    );
  });

  it("skips disabled items during navigation", () => {
    render(
      <ContextMenu
        items={[
          { id: "a", label: "Alpha" },
          { id: "b", label: "Beta", disabled: true },
          { id: "c", label: "Gamma" },
        ]}
      >
        Target
      </ContextMenu>
    );
    fireEvent.contextMenu(screen.getByText("Target"), { clientX: 10, clientY: 10 });
    fireEvent.keyDown(screen.getByRole("menu"), { key: "ArrowDown" });
    expect(screen.getByRole("menuitem", { name: "Gamma" })).toHaveClass(
      "viora-context-menu__item--active"
    );
  });

  it("focuses the first enabled item on open", () => {
    render(
      <ContextMenu
        items={[
          { id: "a", label: "Alpha", disabled: true },
          { id: "b", label: "Beta" },
        ]}
      >
        Target
      </ContextMenu>
    );
    fireEvent.contextMenu(screen.getByText("Target"), { clientX: 10, clientY: 10 });
    expect(screen.getByRole("menuitem", { name: "Beta" })).toHaveClass(
      "viora-context-menu__item--active"
    );
  });

  it("supports a custom aria-label", () => {
    render(<ContextMenu items={ITEMS} ariaLabel="File actions">Target</ContextMenu>);
    fireEvent.contextMenu(screen.getByText("Target"), { clientX: 10, clientY: 10 });
    expect(screen.getByRole("menu", { name: "File actions" })).toBeInTheDocument();
  });

  it("merges custom className with component classes", () => {
    const { container } = render(
      <ContextMenu items={ITEMS} className="custom-class">Target</ContextMenu>
    );
    expect(container.querySelector(".viora-context-menu")).toHaveClass(
      "viora-context-menu",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<ContextMenu items={ITEMS} data-testid="ctx">Target</ContextMenu>);
    expect(screen.getByTestId("ctx")).toHaveClass("viora-context-menu");
  });
});