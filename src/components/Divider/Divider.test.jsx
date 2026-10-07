import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("renders a horizontal separator by default", () => {
    render(<Divider />);
    const divider = screen.getByRole("separator");
    expect(divider).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("renders a vertical separator when vertical", () => {
    render(<Divider orientation="vertical" />);
    const divider = screen.getByRole("separator");
    expect(divider).toHaveAttribute("aria-orientation", "vertical");
    expect(divider).toHaveClass("viora-divider--vertical");
  });

  it("renders the label between lines", () => {
    const { container } = render(<Divider label="Or continue with" />);
    expect(screen.getByText("Or continue with")).toBeInTheDocument();
    expect(
      container.querySelectorAll(".viora-divider__line")
    ).toHaveLength(2);
  });

  it("renders no label elements without a label", () => {
    const { container } = render(<Divider />);
    expect(container.querySelector(".viora-divider__label")).not.toBeInTheDocument();
    expect(container.querySelector(".viora-divider__line")).not.toBeInTheDocument();
  });

  it("applies the with-label class when labelled", () => {
    render(<Divider label="Section" />);
    expect(screen.getByRole("separator")).toHaveClass(
      "viora-divider--with-label"
    );
  });

  it("ignores the label for a vertical divider", () => {
    const { container } = render(<Divider orientation="vertical" label="x" />);
    expect(container.querySelector(".viora-divider__label")).not.toBeInTheDocument();
  });

  it("merges custom className with component classes", () => {
    render(<Divider className="custom-class" />);
    expect(screen.getByRole("separator")).toHaveClass(
      "viora-divider",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Divider data-testid="divider" />);
    expect(screen.getByTestId("divider")).toHaveClass("viora-divider");
  });
});