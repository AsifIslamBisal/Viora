import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Tree } from "./Tree";

const DATA = [
  { id: "dashboard", label: "Dashboard" },
  {
    id: "settings",
    label: "Settings",
    children: [
      { id: "profile", label: "Profile" },
      {
        id: "billing",
        label: "Billing",
        children: [{ id: "invoices", label: "Invoices" }],
      },
    ],
  },
];

const focusRow = (name) => screen.getByRole("treeitem", { name }).focus();

describe("Tree", () => {
  it("renders a labeled tree with the top-level items", () => {
    render(<Tree items={DATA} ariaLabel="Navigation" />);
    expect(screen.getByRole("tree", { name: "Navigation" })).toBeInTheDocument();
    expect(screen.getAllByRole("treeitem")).toHaveLength(2);
    expect(screen.getByRole("treeitem", { name: "Dashboard" })).toBeInTheDocument();
  });

  it("hides children until expanded", () => {
    render(<Tree items={DATA} ariaLabel="Navigation" />);
    expect(
      screen.queryByRole("treeitem", { name: "Profile" })
    ).not.toBeInTheDocument();
  });

  it("expands branches with the disclosure button", () => {
    render(<Tree items={DATA} ariaLabel="Navigation" />);
    fireEvent.click(screen.getByRole("button", { name: "Expand Settings" }));
    expect(screen.getByRole("treeitem", { name: "Profile" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Collapse Settings" }));
    expect(
      screen.queryByRole("treeitem", { name: "Profile" })
    ).not.toBeInTheDocument();
  });

  it("respects defaultExpanded", () => {
    render(<Tree items={DATA} ariaLabel="Navigation" defaultExpanded={["settings"]} />);
    expect(screen.getAllByRole("treeitem")).toHaveLength(4);
  });

  it("selects a row on click", () => {
    const onSelect = vi.fn();
    render(<Tree items={DATA} ariaLabel="Navigation" onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("treeitem", { name: "Settings" }));
    expect(onSelect).toHaveBeenCalledWith("settings");
  });

  it("marks the selected row", () => {
    render(<Tree items={DATA} ariaLabel="Navigation" selected="settings" />);
    expect(screen.getByRole("treeitem", { name: "Settings" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  it("exposes tree levels", () => {
    render(<Tree items={DATA} ariaLabel="Navigation" defaultExpanded={["settings"]} />);
    expect(screen.getByRole("treeitem", { name: "Settings" })).toHaveAttribute(
      "aria-level",
      "1"
    );
    expect(screen.getByRole("treeitem", { name: "Profile" })).toHaveAttribute(
      "aria-level",
      "2"
    );
  });

  it("moves focus with the arrow keys", () => {
    render(<Tree items={DATA} ariaLabel="Navigation" />);
    focusRow("Dashboard");
    const tree = screen.getByRole("tree");
    fireEvent.keyDown(tree, { key: "ArrowDown" });
    expect(document.activeElement).toHaveAccessibleName("Settings");
    fireEvent.keyDown(tree, { key: "ArrowUp" });
    expect(document.activeElement).toHaveAccessibleName("Dashboard");
  });

  it("expands a branch with the right arrow", () => {
    render(<Tree items={DATA} ariaLabel="Navigation" />);
    focusRow("Settings");
    const tree = screen.getByRole("tree");
    fireEvent.keyDown(tree, { key: "ArrowRight" });
    expect(screen.getByRole("treeitem", { name: "Profile" })).toBeInTheDocument();
  });

  it("collapses a branch with the left arrow", () => {
    render(
      <Tree items={DATA} ariaLabel="Navigation" defaultExpanded={["settings"]} />
    );
    focusRow("Settings");
    const tree = screen.getByRole("tree");
    fireEvent.keyDown(tree, { key: "ArrowLeft" });
    expect(
      screen.queryByRole("treeitem", { name: "Profile" })
    ).not.toBeInTheDocument();
  });

  it("selects with Enter on the focused row", () => {
    const onSelect = vi.fn();
    render(<Tree items={DATA} ariaLabel="Navigation" onSelect={onSelect} />);
    focusRow("Dashboard");
    const tree = screen.getByRole("tree");
    fireEvent.keyDown(tree, { key: "Enter" });
    expect(onSelect).toHaveBeenCalledWith("dashboard");
  });

  it("supports controlled expansion", () => {
    const onToggle = vi.fn();
    render(
      <Tree
        items={DATA}
        ariaLabel="Navigation"
        expanded={["settings"]}
        onToggle={onToggle}
      />
    );
    expect(screen.getByRole("treeitem", { name: "Profile" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Collapse Settings" }));
    expect(onToggle).toHaveBeenCalledWith("settings");
  });

  it("merges custom className with component classes", () => {
    render(<Tree items={DATA} ariaLabel="Navigation" className="custom-class" />);
    expect(screen.getByRole("tree")).toHaveClass("viora-tree", "custom-class");
  });

  it("forwards native attributes", () => {
    render(<Tree items={DATA} ariaLabel="Navigation" data-testid="nav-tree" />);
    expect(screen.getByTestId("nav-tree")).toHaveClass("viora-tree");
  });
});