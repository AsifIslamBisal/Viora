import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies the secondary variant and md size by default", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge).toHaveClass(
      "viora-badge",
      "viora-badge--secondary",
      "viora-badge--md"
    );
  });

  it.each(["primary", "secondary", "success", "warning", "danger", "info"])(
    "applies the %s variant class",
    (variant) => {
      render(<Badge variant={variant}>Label</Badge>);
      expect(screen.getByText("Label")).toHaveClass(`viora-badge--${variant}`);
    }
  );

  it.each(["sm", "md"])("applies the %s size class", (size) => {
    render(<Badge size={size}>Label</Badge>);
    expect(screen.getByText("Label")).toHaveClass(`viora-badge--${size}`);
  });

  it("renders a dot when dot is true", () => {
    const { container } = render(<Badge dot>Active</Badge>);
    expect(screen.getByText("Active")).toHaveClass("viora-badge");
    expect(container.querySelector(".viora-badge__dot")).toBeInTheDocument();
  });

  it("does not render a dot by default", () => {
    const { container } = render(<Badge>Idle</Badge>);
    expect(container.querySelector(".viora-badge__dot")).toBeNull();
  });

  it("is aria-hidden on the dot", () => {
    const { container } = render(<Badge dot>Active</Badge>);
    expect(container.querySelector(".viora-badge__dot")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("merges custom className with component classes", () => {
    render(<Badge className="custom-class">Custom</Badge>);
    expect(screen.getByText("Custom")).toHaveClass(
      "viora-badge",
      "custom-class"
    );
  });

  it("forwards native span attributes", () => {
    render(<Badge data-testid="badge" title="Release status">Beta</Badge>);
    const badge = screen.getByTitle("Release status");
    expect(badge).toHaveAttribute("data-testid", "badge");
    expect(badge.textContent).toBe("Beta");
  });
});