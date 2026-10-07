import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { List } from "./List";

describe("List", () => {
  it("renders an unordered list by default", () => {
    render(<List items={["One", "Two"]} />);
    expect(screen.getByRole("list").tagName).toBe("UL");
    expect(within(screen.getByRole("list")).getAllByRole("listitem")).toHaveLength(2);
  });

  it("renders an ordered list for the ordered variant", () => {
    render(<List variant="ordered" items={["One", "Two"]} />);
    expect(screen.getByRole("list").tagName).toBe("OL");
  });

  it("renders the item contents", () => {
    render(<List items={["Alpha", <strong key="b">Beta</strong>]} />);
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta").tagName).toBe("STRONG");
  });

  it("renders children when items are omitted", () => {
    render(
      <List>
        <li>Custom item</li>
      </List>
    );
    expect(screen.getByText("Custom item")).toBeInTheDocument();
  });

  it("marks items with the item class", () => {
    render(<List items={["One"]} />);
    expect(screen.getByRole("listitem")).toHaveClass("viora-list__item");
  });

  it.each(["sm", "md", "lg"])("applies the %s spacing class", (spacing) => {
    render(<List items={["One"]} spacing={spacing} />);
    expect(screen.getByRole("list")).toHaveClass(`viora-list--spacing-${spacing}`);
  });

  it("applies the plain variant class", () => {
    render(<List variant="plain" items={["One"]} />);
    expect(screen.getByRole("list")).toHaveClass("viora-list--plain");
  });

  it("merges custom className with component classes", () => {
    render(<List items={["One"]} className="custom-class" />);
    expect(screen.getByRole("list")).toHaveClass("viora-list", "custom-class");
  });

  it("forwards native attributes", () => {
    render(<List items={["One"]} data-testid="list" />);
    expect(screen.getByTestId("list")).toHaveClass("viora-list");
  });
});