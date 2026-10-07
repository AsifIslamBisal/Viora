import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders an h1 by default", () => {
    render(<Heading>Title</Heading>);
    const heading = screen.getByRole("heading", { level: 1, name: "Title" });
    expect(heading.tagName).toBe("H1");
  });

  it.each([1, 2, 3, 4, 5, 6])("renders the correct tag for level %d", (level) => {
    render(<Heading level={level}>Title</Heading>);
    const heading = screen.getByRole("heading", { level, name: "Title" });
    expect(heading.tagName).toBe(`H${level}`);
    expect(heading).toHaveClass(`viora-heading--${level}`);
  });

  it("merges custom className with component classes", () => {
    render(<Heading className="custom-class">Title</Heading>);
    expect(screen.getByRole("heading")).toHaveClass(
      "viora-heading",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Heading data-testid="heading">Title</Heading>);
    expect(screen.getByTestId("heading")).toHaveClass("viora-heading");
  });
});