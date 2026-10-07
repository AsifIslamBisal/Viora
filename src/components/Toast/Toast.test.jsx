import {
  act,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ToastProvider, useToast } from "./Toast";

describe("Toast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("throws when useToast is used without a provider", () => {
    expect(() => renderHook(() => useToast())).toThrow(
      "useToast must be used within a ToastProvider"
    );
  });

  it("renders a live region for notifications", () => {
    render(<ToastProvider>{null}</ToastProvider>);
    const region = screen.getByRole("region", { name: "Notifications" });
    expect(region).toHaveAttribute("aria-live", "polite");
  });

  it("renders toast titles and descriptions", () => {
    const Probe = () => {
      const toast = useToast();
      return (
        <button
          type="button"
          onClick={() =>
            toast({ title: "Saved", description: "Changes are saved." })
          }
        >
          Show
        </button>
      );
    };
    render(
      <ToastProvider>
        <Probe />
      </ToastProvider>
    );
    act(() => {
      screen.getByRole("button", { name: "Show" }).click();
    });
    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Changes are saved.")).toBeInTheDocument();
  });

  it.each(["success", "danger", "warning", "info"])(
    "applies the %s variant class",
    (variant) => {
      const Probe = () => {
        const toast = useToast();
        return (
          <button
            type="button"
            onClick={() => toast({ title: "Note", variant })}
          >
            Show
          </button>
        );
      };
      render(
        <ToastProvider>
          <Probe />
        </ToastProvider>
      );
      act(() => {
        screen.getByRole("button", { name: "Show" }).click();
      });
      expect(document.querySelector(".viora-toast")).toHaveClass(
        `viora-toast--${variant}`
      );
    }
  );

  it("uses a status role for non-alert toasts", () => {
    const Probe = () => {
      const toast = useToast();
      return (
        <button type="button" onClick={() => toast({ title: "Note" })}>
          Show
        </button>
      );
    };
    render(
      <ToastProvider>
        <Probe />
      </ToastProvider>
    );
    act(() => {
      screen.getByRole("button", { name: "Show" }).click();
    });
    expect(screen.getByRole("status")).toHaveTextContent("Note");
  });

  it("uses an alert role for danger toasts", () => {
    const Probe = () => {
      const toast = useToast();
      return (
        <button
          type="button"
          onClick={() => toast({ title: "Failed", variant: "danger" })}
        >
          Show
        </button>
      );
    };
    render(
      <ToastProvider>
        <Probe />
      </ToastProvider>
    );
    act(() => {
      screen.getByRole("button", { name: "Show" }).click();
    });
    expect(screen.getByRole("alert")).toHaveTextContent("Failed");
  });

  it("dismisses a toast via the close button", () => {
    const Probe = () => {
      const toast = useToast();
      return (
        <button type="button" onClick={() => toast({ title: "Note" })}>
          Show
        </button>
      );
    };
    render(
      <ToastProvider>
        <Probe />
      </ToastProvider>
    );
    act(() => {
      screen.getByRole("button", { name: "Show" }).click();
    });
    const close = screen.getByRole("button", { name: "Dismiss notification" });
    act(() => {
      close.click();
    });
    expect(screen.queryByText("Note")).not.toBeInTheDocument();
  });

  it("auto-dismisses after the configured duration", () => {
    const Probe = () => {
      const toast = useToast();
      return (
        <button
          type="button"
          onClick={() => toast({ title: "Transient", duration: 500 })}
        >
          Show
        </button>
      );
    };
    render(
      <ToastProvider>
        <Probe />
      </ToastProvider>
    );
    act(() => {
      screen.getByRole("button", { name: "Show" }).click();
    });
    expect(screen.getByText("Transient")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(screen.queryByText("Transient")).not.toBeInTheDocument();
  });

  it("stacks multiple toasts", () => {
    const Probe = () => {
      const toast = useToast();
      return (
        <button
          type="button"
          onClick={() => {
            toast({ title: "One" });
            toast({ title: "Two" });
          }}
        >
          Show
        </button>
      );
    };
    render(
      <ToastProvider>
        <Probe />
      </ToastProvider>
    );
    act(() => {
      screen.getByRole("button", { name: "Show" }).click();
    });
    expect(screen.getAllByText(/One|Two/)).toHaveLength(2);
  });

  it("merges a custom className onto the viewport", () => {
    render(<ToastProvider className="custom-class">{null}</ToastProvider>);
    expect(screen.getByRole("region")).toHaveClass(
      "viora-toast__viewport",
      "custom-class"
    );
  });
});