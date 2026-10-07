import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Link } from "./Link";

describe("Link", () => {
  it("renders an anchor with the given href", () => {
    render(<Link href="/docs">Docs</Link>);
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute(
      "href",
      "/docs"
    );
  });

  it("defaults href to #", () => {
    render(<Link>Home</Link>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "#");
  });

  it.each(["primary", "muted", "danger"])(
    "applies the %s variant class",
    (variant) => {
      render(<Link variant={variant}>Link</Link>);
      expect(screen.getByRole("link")).toHaveClass(`viora-link--${variant}`);
    }
  );

  it("does not add a variant class for the default variant", () => {
    render(<Link>Link</Link>);
    expect(screen.getByRole("link")).not.toHaveClass(/viora-link--[a-z]/);
  });

  it.each(["always", "none"])("applies underline %s", (underline) => {
    render(<Link underline={underline}>Link</Link>);
    expect(screen.getByRole("link")).toHaveClass(
      `viora-link--underline-${underline}`
    );
  });

  it("does not add an underline class for hover", () => {
    render(<Link>Link</Link>);
    expect(screen.getByRole("link")).not.toHaveClass(/viora-link--underline/);
  });

  it("adds target and rel when external", () => {
    render(
      <Link href="https://example.com" external>
        Example
      </Link>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("does not add target when not external", () => {
    render(<Link href="https://example.com">Example</Link>);
    expect(screen.getByRole("link")).not.toHaveAttribute("target");
  });

  it("merges custom className with component classes", () => {
    render(<Link className="custom-class">Link</Link>);
    expect(screen.getByRole("link")).toHaveClass("viora-link", "custom-class");
  });

  it("forwards native attributes", () => {
    render(<Link data-testid="link">Link</Link>);
    expect(screen.getByTestId("link")).toHaveClass("viora-link");
  });
});