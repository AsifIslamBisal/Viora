import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NotificationBanner } from "./NotificationBanner";

describe("NotificationBanner", () => {
  it("renders the title and content", () => {
    render(<NotificationBanner title="Heads up" content="Add your phone." />);
    expect(screen.getByText("Heads up")).toBeInTheDocument();
    expect(screen.getByText("Add your phone.")).toBeInTheDocument();
  });

  it("renders children as content", () => {
    render(
      <NotificationBanner title="Note">
        <em>Important detail</em>
      </NotificationBanner>
    );
    expect(screen.getByText("Important detail")).toBeInTheDocument();
  });

  it("uses a status role for informational tones", () => {
    render(<NotificationBanner title="Done" tone="success" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("uses an alert role for warning and danger tones", () => {
    const { rerender } = render(
      <NotificationBanner title="Careful" tone="warning" />
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    rerender(<NotificationBanner title="Stop" tone="danger" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("labels the region from the title", () => {
    render(<NotificationBanner title="Update available" tone="info" />);
    expect(screen.getByRole("status", { name: "Update available" })).toBeInTheDocument();
  });

  it("applies the tone class", () => {
    render(<NotificationBanner title="Note" tone="warning" />);
    expect(screen.getByRole("alert")).toHaveClass("viora-notification--warning");
  });

  it("renders a tone-specific default icon", () => {
    const { container } = render(<NotificationBanner title="Note" tone="danger" />);
    expect(container.querySelector(".viora-notification__icon svg")).toBeInTheDocument();
  });

  it("overrides the icon", () => {
    const Icon = () => <svg data-testid="custom-icon" />;
    render(
      <NotificationBanner title="Note" tone="success" icon={<Icon />} />
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("shows and hides the dismiss button", () => {
    const { rerender } = render(<NotificationBanner title="Note" />);
    expect(
      screen.queryByRole("button", { name: "Dismiss notification" })
    ).toBeNull();
    rerender(<NotificationBanner title="Note" dismissible />);
    expect(
      screen.getByRole("button", { name: "Dismiss notification" })
    ).toBeInTheDocument();
  });

  it("dismisses the banner and reports it", () => {
    const onDismiss = vi.fn();
    const { container } = render(
      <NotificationBanner title="Note" dismissible onDismiss={onDismiss} />
    );
    fireEvent.click(screen.getByRole("button", { name: "Dismiss notification" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(container).toBeEmptyDOMElement();
  });

  it("merges custom className with component classes", () => {
    render(<NotificationBanner title="Note" className="custom-class" />);
    expect(screen.getByRole("status")).toHaveClass(
      "viora-notification",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<NotificationBanner title="Note" data-testid="banner" />);
    expect(screen.getByTestId("banner")).toHaveClass("viora-notification");
  });
});