import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Label } from "./Label";

describe("Label", () => {
  it("renders children in a label element", () => {
    render(<Label>Full name</Label>);
    expect(screen.getByText("Full name").tagName).toBe("LABEL");
  });

  it("forwards htmlFor", () => {
    render(<Label htmlFor="name">Full name</Label>);
    expect(screen.getByText("Full name")).toHaveAttribute("for", "name");
  });

  it.each(["sm", "md", "lg"])("applies the %s size class", (size) => {
    render(<Label size={size}>Full name</Label>);
    expect(screen.getByText("Full name")).toHaveClass(`viora-label--${size}`);
  });

  it("applies the muted tone class", () => {
    render(<Label tone="muted">Full name</Label>);
    expect(screen.getByText("Full name")).toHaveClass("viora-label--muted");
  });

  it("applies the error tone class", () => {
    render(<Label tone="error">Full name</Label>);
    expect(screen.getByText("Full name")).toHaveClass("viora-label--error");
  });

  it("does not add a tone class for the default tone", () => {
    render(<Label>Full name</Label>);
    expect(screen.getByText("Full name")).not.toHaveClass(/viora-label--(muted|error)/);
  });

  it("merges custom className with component classes", () => {
    render(<Label className="custom-class">Full name</Label>);
    expect(screen.getByText("Full name")).toHaveClass(
      "viora-label",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Label data-testid="label">Full name</Label>);
    expect(screen.getByTestId("label")).toHaveClass("viora-label");
  });
});