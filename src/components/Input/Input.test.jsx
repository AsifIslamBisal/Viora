import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
  it("renders a text input by default", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
  });

  it("forwards placeholder", () => {
    render(<Input placeholder="you@example.com" />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "you@example.com"
    );
  });

  it("renders a label linked to the input", () => {
    render(<Input label="Email" />);
    const input = screen.getByRole("textbox");
    const label = screen.getByText("Email");
    expect(label).toHaveAttribute("for", input.id);
  });

  it("uses the provided id", () => {
    render(<Input id="email" label="Email" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "email");
  });

  it("renders a hint wired via aria-describedby", () => {
    render(<Input label="Email" hint="We'll never share it." />);
    const input = screen.getByRole("textbox");
    expect(screen.getByText("We'll never share it.")).toHaveAttribute(
      "id",
      `${input.id}-hint`
    );
    expect(input).toHaveAttribute(
      "aria-describedby",
      `${input.id}-hint`
    );
  });

  it("renders an error with aria-invalid and describedby", () => {
    render(<Input label="Email" error="Invalid email address." />);
    const input = screen.getByRole("textbox");
    const message = screen.getByText("Invalid email address.");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(message).toHaveAttribute("id", `${input.id}-error`);
    expect(input).toHaveAttribute("aria-describedby", `${input.id}-error`);
  });

  it("applies the error class when error is set", () => {
    render(<Input error="Required" />);
    expect(screen.getByRole("textbox")).toHaveClass(
      "viora-input",
      "viora-input--error"
    );
  });

  it("shows the error message over the hint", () => {
    render(<Input hint="Optional" error="Required field." />);
    expect(screen.getByText("Required field.")).toBeInTheDocument();
    expect(screen.queryByText("Optional")).toBeNull();
  });

  it("applies the md size by default", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toHaveClass("viora-input--md");
  });

  it.each(["sm", "md", "lg"])("applies the %s size class", (size) => {
    render(<Input size={size} />);
    expect(screen.getByRole("textbox")).toHaveClass(`viora-input--${size}`);
  });

  it("can be disabled", () => {
    render(<Input disabled label="Email" />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("merges custom className with component classes", () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole("textbox")).toHaveClass(
      "viora-input",
      "custom-class"
    );
  });

  it("supports controlled value and onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input value="hello" onChange={onChange} />);
    expect(screen.getByRole("textbox")).toHaveValue("hello");
    await user.type(screen.getByRole("textbox"), "!");
    expect(onChange).toHaveBeenCalled();
  });

  it("forwards required", () => {
    render(<Input required />);
    expect(screen.getByRole("textbox")).toHaveAttribute("required");
  });
});