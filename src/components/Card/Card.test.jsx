import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renders its children", () => {
    render(<Card>Content</Card>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders the title as an h3 heading", () => {
    render(<Card title="Analytics">Content</Card>);
    const heading = screen.getByRole("heading", { name: "Analytics" });
    expect(heading.tagName).toBe("H3");
    expect(heading).toHaveClass("viora-card__title");
  });

  it("renders the description next to the title", () => {
    render(<Card title="Analytics" description="Last 30 days">Content</Card>);
    expect(screen.getByText("Last 30 days")).toHaveClass(
      "viora-card__description"
    );
  });

  it("does not render a description without a title", () => {
    const { container } = render(<Card description="Orphan">Content</Card>);
    expect(container.querySelector(".viora-card__header")).toBeNull();
    expect(container.querySelector(".viora-card__description")).toBeNull();
  });

  it("does not render a header when no title is given", () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.querySelector(".viora-card__header")).toBeNull();
  });

  it("renders the footer slot", () => {
    render(<Card footer={<button>Save</button>}>Content</Card>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button.closest(".viora-card__footer")).not.toBeNull();
  });

  it("does not render a footer by default", () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.querySelector(".viora-card__footer")).toBeNull();
  });

  it("applies the lg padding by default", () => {
    render(<Card>Content</Card>);
    expect(screen.getByText("Content").closest(".viora-card")).toHaveClass(
      "viora-card--padding-lg"
    );
  });

  it.each(["none", "sm", "md", "lg"])(
    "applies the %s padding class",
    (padding) => {
      render(<Card padding={padding}>Content</Card>);
      expect(
        screen.getByText("Content").closest(".viora-card")
      ).toHaveClass(`viora-card--padding-${padding}`);
    }
  );

  it("merges custom className with component classes", () => {
    render(<Card className="custom-class">Content</Card>);
    expect(screen.getByText("Content").closest(".viora-card")).toHaveClass(
      "viora-card",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId("card")).toHaveClass("viora-card");
  });
});