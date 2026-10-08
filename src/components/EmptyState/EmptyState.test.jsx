import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders the title", () => {
    render(<EmptyState title="No projects" />);
    expect(screen.getByRole("heading", { name: "No projects", level: 3 })).toBeInTheDocument();
  });

  it("renders a message prop", () => {
    render(<EmptyState title="No projects" message="Create your first one." />);
    expect(screen.getByText("Create your first one.")).toBeInTheDocument();
  });

  it("renders children as the message", () => {
    render(
      <EmptyState title="Inbox zero">
        <em>Enjoy the silence.</em>
      </EmptyState>
    );
    expect(screen.getByText("Enjoy the silence.")).toBeInTheDocument();
  });

  it("renders a default icon", () => {
    const { container } = render(<EmptyState title="Empty" />);
    expect(container.querySelector(".viora-empty-state__icon svg")).toBeInTheDocument();
  });

  it("overrides the icon", () => {
    const Icon = () => <svg data-testid="custom-icon" />;
    render(<EmptyState title="Empty" icon={<Icon />} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(document.querySelectorAll(".viora-empty-state__icon svg")).toHaveLength(1);
  });

  it("renders an action slot", () => {
    render(
      <EmptyState title="No files" action={<button type="button">Upload</button>} />
    );
    expect(screen.getByRole("button", { name: "Upload" })).toBeInTheDocument();
  });

  it("does not render an action when omitted", () => {
    render(<EmptyState title="No files" />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("applies size modifiers", () => {
    const { container } = render(<EmptyState title="Empty" size="lg" />);
    expect(container.querySelector(".viora-empty-state")).toHaveClass(
      "viora-empty-state--lg"
    );
  });

  it("merges custom className with component classes", () => {
    const { container } = render(<EmptyState title="Empty" className="custom-class" />);
    expect(container.querySelector(".viora-empty-state")).toHaveClass(
      "viora-empty-state",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<EmptyState title="Empty" data-testid="empty" />);
    expect(screen.getByTestId("empty")).toHaveClass("viora-empty-state");
  });
});