import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("renders a status role", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has an sr-only default label of Loading", () => {
    render(<Spinner />);
    expect(screen.getByText("Loading")).toHaveClass("viora-spinner__label");
  });

  it("supports a custom label", () => {
    render(<Spinner label="Saving" />);
    expect(screen.getByText("Saving")).toBeInTheDocument();
  });

  it("applies the md size by default", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveClass("viora-spinner--md");
  });

  it.each(["sm", "md", "lg"])("applies the %s size class", (size) => {
    render(<Spinner size={size} />);
    expect(screen.getByRole("status")).toHaveClass(`viora-spinner--${size}`);
  });

  it("renders an aria-hidden ring", () => {
    render(<Spinner />);
    expect(document.querySelector(".viora-spinner__ring")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("merges custom className with component classes", () => {
    render(<Spinner className="custom-class" />);
    expect(screen.getByRole("status")).toHaveClass(
      "viora-spinner",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Spinner data-testid="spinner" />);
    expect(screen.getByTestId("spinner")).toHaveClass("viora-spinner");
  });
});