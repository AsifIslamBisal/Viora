import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Progress } from "./Progress";

function fillOf(container) {
  return container.querySelector(".viora-progress__fill");
}

describe("Progress", () => {
  it("renders a progressbar with default values", () => {
    render(<Progress label="Upload" />);
    const bar = screen.getByRole("progressbar", { name: "Upload" });
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(bar).toHaveAttribute("aria-valuenow", "0");
  });

  it("reports the value as aria-valuenow", () => {
    render(<Progress label="Upload" value={75} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "75"
    );
  });

  it("sets the fill width as a percentage", () => {
    const { container } = render(<Progress value={50} />);
    expect(fillOf(container)).toHaveStyle({ width: "50%" });
  });

  it("supports custom min and max", () => {
    const { container } = render(<Progress value={5} min={0} max={10} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuemax", "10");
    expect(fillOf(container)).toHaveStyle({ width: "50%" });
  });

  it("clamps values above max to 100%", () => {
    const { container } = render(<Progress value={150} />);
    expect(fillOf(container)).toHaveStyle({ width: "100%" });
  });

  it("clamps values below zero to 0%", () => {
    const { container } = render(<Progress value={-10} />);
    expect(fillOf(container)).toHaveStyle({ width: "0%" });
  });

  it("renders the value text when showValue is set", () => {
    render(<Progress value={66.6} showValue />);
    expect(screen.getByText("67%")).toBeInTheDocument();
  });

  it("omits the value text by default", () => {
    render(<Progress value={10} />);
    expect(screen.queryByText("10%")).not.toBeInTheDocument();
  });

  it.each(["success", "warning", "danger"])(
    "applies the %s tone class to the wrapper",
    (tone) => {
      render(<Progress value={50} tone={tone} />);
      expect(document.querySelector(".viora-progress")).toHaveClass(
        `viora-progress--${tone}`
      );
    }
  );

  it.each(["sm", "md", "lg"])("applies the %s size class", (size) => {
    render(<Progress value={50} size={size} />);
    expect(document.querySelector(".viora-progress")).toHaveClass(
      `viora-progress--${size}`
    );
  });

  it("omits aria-valuenow when indeterminate", () => {
    render(<Progress label="Loading" indeterminate />);
    const bar = screen.getByRole("progressbar");
    expect(bar).not.toHaveAttribute("aria-valuenow");
    expect(document.querySelector(".viora-progress")).toHaveClass(
      "viora-progress--indeterminate"
    );
  });

  it("merges custom className with component classes", () => {
    render(<Progress className="custom-class" />);
    expect(document.querySelector(".viora-progress")).toHaveClass(
      "viora-progress",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Progress data-testid="progress" />);
    expect(screen.getByTestId("progress")).toHaveClass("viora-progress");
  });
});