import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders its children with role status by default", () => {
    render(<Alert>Session saved.</Alert>);
    const alert = screen.getByRole("status");
    expect(alert).toHaveTextContent("Session saved.");
  });

  it("uses role alert for danger", () => {
    render(<Alert variant="danger">Operation failed.</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("uses role alert for warning", () => {
    render(<Alert variant="warning">Check your inputs.</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("honors an explicit role override", () => {
    render(<Alert variant="danger" role="status">Custom role.</Alert>);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("renders the title", () => {
    render(<Alert title="Heads up">Content</Alert>);
    expect(screen.getByText("Heads up")).toHaveClass("viora-alert__title");
  });

  it.each(["info", "primary", "success", "warning", "danger"])(
    "applies the %s variant class",
    (variant) => {
      render(<Alert variant={variant}>Message</Alert>);
      expect(screen.getByRole(variant === "danger" || variant === "warning" ? "alert" : "status")).toHaveClass(
        `viora-alert--${variant}`
      );
    }
  );

  it("renders an aria-hidden icon", () => {
    render(<Alert>Message</Alert>);
    expect(document.querySelector(".viora-alert__icon")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("does not render a close button by default", () => {
    render(<Alert>Message</Alert>);
    expect(screen.queryByRole("button", { name: "Dismiss" })).toBeNull();
  });

  it("dismisses the alert and calls onDismiss", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    const { container } = render(
      <Alert dismissible onDismiss={onDismiss}>
        Message
      </Alert>
    );
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(container.querySelector(".viora-alert")).toBeNull();
  });

  it("merges custom className with component classes", () => {
    render(<Alert className="custom-class">Message</Alert>);
    expect(screen.getByRole("status")).toHaveClass(
      "viora-alert",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Alert data-testid="alert">Message</Alert>);
    expect(screen.getByTestId("alert")).toHaveRole("status");
  });
});