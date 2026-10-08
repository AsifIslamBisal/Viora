import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Kbd } from "./Kbd";

describe("Kbd", () => {
  it("renders its label in a kbd element", () => {
    render(<Kbd>Ctrl</Kbd>);
    expect(screen.getByText("Ctrl").tagName).toBe("KBD");
  });

  it("renders combined keys", () => {
    render(
      <Kbd>
        Ctrl + K
      </Kbd>
    );
    expect(screen.getByText(/Ctrl \+ K/)).toBeInTheDocument();
  });

  it("supports the small size", () => {
    const { container } = render(<Kbd size="sm">⌘</Kbd>);
    expect(container.querySelector(".viora-kbd")).toHaveClass("viora-kbd--sm");
  });

  it("supports the large size", () => {
    const { container } = render(<Kbd size="lg">Enter</Kbd>);
    expect(container.querySelector(".viora-kbd")).toHaveClass("viora-kbd--lg");
  });

  it("merges custom className with component classes", () => {
    const { container } = render(<Kbd className="custom-class">Tab</Kbd>);
    expect(container.querySelector(".viora-kbd")).toHaveClass(
      "viora-kbd",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Kbd data-testid="key">Esc</Kbd>);
    expect(screen.getByTestId("key")).toHaveClass("viora-kbd");
  });
});