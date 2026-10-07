import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Text } from "./Text";

describe("Text", () => {
  it("renders a paragraph by default", () => {
    const { container } = render(<Text>Body copy</Text>);
    expect(container.querySelector("p.viora-text")).toBeInTheDocument();
  });

  it.each(["p", "span", "div", "label", "strong"])(
    "renders as %s when as is set",
    (tag) => {
      const { container } = render(<Text as={tag}>Copy</Text>);
      expect(container.querySelector(`${tag}.viora-text`)).toBeInTheDocument();
    }
  );

  it.each(["sm", "md", "lg"])("applies the %s size class", (size) => {
    render(<Text size={size}>Copy</Text>);
    expect(document.querySelector(".viora-text")).toHaveClass(
      `viora-text--${size}`
    );
  });

  it.each(["normal", "medium", "semibold"])(
    "applies the %s weight class",
    (weight) => {
      render(<Text weight={weight}>Copy</Text>);
      expect(document.querySelector(".viora-text")).toHaveClass(
        `viora-text--weight-${weight}`
      );
    }
  );

  it("applies the muted tone class", () => {
    render(<Text tone="muted">Muted copy</Text>);
    expect(document.querySelector(".viora-text")).toHaveClass(
      "viora-text--muted"
    );
  });

  it("does not apply the muted class by default", () => {
    render(<Text>Plain copy</Text>);
    expect(document.querySelector(".viora-text")).not.toHaveClass(
      "viora-text--muted"
    );
  });

  it("merges custom className with component classes", () => {
    render(<Text className="custom-class">Copy</Text>);
    expect(document.querySelector(".viora-text")).toHaveClass(
      "viora-text",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Text data-testid="text">Copy</Text>);
    expect(screen.getByTestId("text")).toHaveClass("viora-text");
  });
});