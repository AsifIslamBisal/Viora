import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Skeleton } from "./Skeleton";

function firstClass(container) {
  return container.querySelector(".viora-skeleton").className;
}

describe("Skeleton", () => {
  it("renders the base class", () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector(".viora-skeleton")).toBeInTheDocument();
  });

  it("uses the text variant by default", () => {
    const { container } = render(<Skeleton />);
    expect(firstClass(container)).toContain("viora-skeleton--text");
  });

  it.each(["circle", "rect"])("applies the %s variant class", (variant) => {
    const { container } = render(<Skeleton variant={variant} />);
    expect(firstClass(container)).toContain(`viora-skeleton--${variant}`);
  });

  it("converts numeric width to px", () => {
    const { container } = render(<Skeleton width={120} />);
    expect(container.querySelector(".viora-skeleton")).toHaveStyle({
      width: "120px",
    });
  });

  it("converts numeric height to px", () => {
    const { container } = render(<Skeleton height={32} />);
    expect(container.querySelector(".viora-skeleton")).toHaveStyle({
      height: "32px",
    });
  });

  it("passes through string dimensions", () => {
    const { container } = render(<Skeleton width="50%" height="2rem" />);
    expect(container.querySelector(".viora-skeleton")).toHaveStyle({
      width: "50%",
      height: "32px",
    });
  });

  it("merges style with dimension styles", () => {
    const { container } = render(
      <Skeleton width={100} style={{ borderRadius: 4 }} />
    );
    expect(container.querySelector(".viora-skeleton")).toHaveStyle({
      width: "100px",
      borderRadius: "4px",
    });
  });

  it("is hidden from assistive technology", () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector(".viora-skeleton")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("merges custom className with component classes", () => {
    const { container } = render(<Skeleton className="custom-class" />);
    expect(firstClass(container)).toContain("custom-class");
  });

  it("forwards native attributes", () => {
    const { container } = render(<Skeleton data-testid="skeleton" />);
    expect(container.querySelector(".viora-skeleton")).toHaveAttribute(
      "data-testid",
      "skeleton"
    );
  });
});