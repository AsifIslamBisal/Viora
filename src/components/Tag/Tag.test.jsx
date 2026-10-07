import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tag } from "./Tag";

const VARIANTS = ["primary", "success", "warning", "danger", "info"];

describe("Tag", () => {
  it("renders content from the label prop", () => {
    render(<Tag label="React" />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("renders children over the label", () => {
    render(<Tag label="React">React.js</Tag>);
    expect(screen.getByText("React.js")).toBeInTheDocument();
  });

  it.each(["primary", "success", "warning", "danger", "info"])(
    "applies the %s variant class",
    (variant) => {
      render(<Tag label="Tag" variant={variant} />);
      expect(document.querySelector(".viora-tag")).toHaveClass(
        `viora-tag--${variant}`
      );
    }
  );

  it("does not add a variant class for the default variant", () => {
    render(<Tag label="Tag" />);
    const tag = document.querySelector(".viora-tag");
    VARIANTS.forEach((variant) => {
      expect(tag).not.toHaveClass(`viora-tag--${variant}`);
    });
  });

  it.each(["sm", "md"])("applies the %s size class", (size) => {
    render(<Tag label="Tag" size={size} />);
    expect(document.querySelector(".viora-tag")).toHaveClass(`viora-tag--${size}`);
  });

  it("renders a remove button when onRemove is provided", () => {
    render(<Tag label="React" onRemove={() => {}} />);
    expect(screen.getByRole("button", { name: "Remove React" })).toBeInTheDocument();
  });

  it("calls onRemove when the remove button is clicked", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<Tag label="React" onRemove={onRemove} />);
    await user.click(screen.getByRole("button", { name: "Remove React" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("supports a custom remove label", () => {
    render(<Tag label="React" removeLabel="React framework" onRemove={() => {}} />);
    expect(
      screen.getByRole("button", { name: "Remove React framework" })
    ).toBeInTheDocument();
  });

  it("does not render a remove button without onRemove", () => {
    render(<Tag label="React" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("merges custom className with component classes", () => {
    render(<Tag label="Tag" className="custom-class" />);
    expect(document.querySelector(".viora-tag")).toHaveClass(
      "viora-tag",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Tag label="Tag" data-testid="tag" />);
    expect(screen.getByTestId("tag")).toHaveClass("viora-tag");
  });
});