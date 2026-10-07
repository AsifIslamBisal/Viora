import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders a textbox with 3 rows by default", () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "3");
  });

  it("respects a custom rows value", () => {
    render(<Textarea rows={6} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "6");
  });

  it("forwards placeholder", () => {
    render(<Textarea placeholder="Tell us more..." />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "Tell us more..."
    );
  });

  it("renders a label linked to the textarea", () => {
    render(<Textarea label="Bio" />);
    const textarea = screen.getByRole("textbox");
    expect(screen.getByText("Bio")).toHaveAttribute("for", textarea.id);
  });

  it("uses the provided id", () => {
    render(<Textarea id="bio" label="Bio" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "bio");
  });

  it("renders a hint wired via aria-describedby", () => {
    render(<Textarea label="Bio" hint="Max 200 characters." />);
    const textarea = screen.getByRole("textbox");
    expect(screen.getByText("Max 200 characters.")).toHaveAttribute(
      "id",
      `${textarea.id}-hint`
    );
    expect(textarea).toHaveAttribute(
      "aria-describedby",
      `${textarea.id}-hint`
    );
  });

  it("renders an error with aria-invalid and describedby", () => {
    render(<Textarea label="Bio" error="Bio is too long." />);
    const textarea = screen.getByRole("textbox");
    const message = screen.getByText("Bio is too long.");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(message).toHaveAttribute("id", `${textarea.id}-error`);
    expect(textarea).toHaveAttribute(
      "aria-describedby",
      `${textarea.id}-error`
    );
  });

  it("applies the error class when error is set", () => {
    render(<Textarea error="Required" />);
    expect(screen.getByRole("textbox")).toHaveClass(
      "viora-textarea",
      "viora-textarea--error"
    );
  });

  it("shows the error message over the hint", () => {
    render(<Textarea hint="Optional" error="Required field." />);
    expect(screen.getByText("Required field.")).toBeInTheDocument();
    expect(screen.queryByText("Optional")).toBeNull();
  });

  it.each(["sm", "md", "lg"])("applies the %s size class", (size) => {
    render(<Textarea size={size} />);
    expect(screen.getByRole("textbox")).toHaveClass(
      `viora-textarea--${size}`
    );
  });

  it("can be disabled", () => {
    render(<Textarea disabled label="Bio" />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("merges custom className with component classes", () => {
    render(<Textarea className="custom-class" />);
    expect(screen.getByRole("textbox")).toHaveClass(
      "viora-textarea",
      "custom-class"
    );
  });

  it("supports controlled value and onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Textarea value="hello" onChange={onChange} />);
    expect(screen.getByRole("textbox")).toHaveValue("hello");
    await user.type(screen.getByRole("textbox"), " world");
    expect(onChange).toHaveBeenCalled();
  });
});