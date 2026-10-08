import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Toolbar, ToolbarSeparator } from "./Toolbar";

describe("Toolbar", () => {
  it("renders a toolbar with the accessible name", () => {
    render(
      <Toolbar ariaLabel="Formatting">
        <button type="button">Bold</button>
      </Toolbar>
    );
    expect(screen.getByRole("toolbar", { name: "Formatting" })).toBeInTheDocument();
  });

  it("defaults to horizontal orientation", () => {
    render(
      <Toolbar ariaLabel="Formatting">
        <button type="button">Bold</button>
      </Toolbar>
    );
    expect(screen.getByRole("toolbar")).toHaveAttribute(
      "aria-orientation",
      "horizontal"
    );
  });

  it("supports vertical orientation", () => {
    render(
      <Toolbar ariaLabel="Layout" orientation="vertical">
        <button type="button">Top</button>
      </Toolbar>
    );
    expect(screen.getByRole("toolbar")).toHaveAttribute(
      "aria-orientation",
      "vertical"
    );
  });

  it("applies the vertical modifier class", () => {
    render(
      <Toolbar ariaLabel="Layout" orientation="vertical">
        <button type="button">Top</button>
      </Toolbar>
    );
    expect(screen.getByRole("toolbar")).toHaveClass("viora-toolbar--vertical");
  });

  it("renders its children", () => {
    render(
      <Toolbar ariaLabel="Actions">
        <button type="button">Cut</button>
        <button type="button">Copy</button>
      </Toolbar>
    );
    expect(screen.getByRole("button", { name: "Cut" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
  });

  it("renders separators with a separator role", () => {
    render(
      <Toolbar ariaLabel="Actions">
        <button type="button">Cut</button>
        <ToolbarSeparator />
        <button type="button">Copy</button>
      </Toolbar>
    );
    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "vertical"
    );
  });

  it("supports horizontal separators", () => {
    render(
      <Toolbar ariaLabel="Actions">
        <ToolbarSeparator orientation="horizontal" />
      </Toolbar>
    );
    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "horizontal"
    );
  });

  it("merges custom className with component classes", () => {
    render(
      <Toolbar ariaLabel="Actions" className="custom-class">
        <button type="button">Cut</button>
      </Toolbar>
    );
    expect(screen.getByRole("toolbar")).toHaveClass(
      "viora-toolbar",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(
      <Toolbar ariaLabel="Actions" data-testid="toolbar">
        <button type="button">Cut</button>
      </Toolbar>
    );
    expect(screen.getByTestId("toolbar")).toHaveClass("viora-toolbar");
  });
});