import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "./Accordion";

const ITEMS = [
  { value: "setup", title: "Setup", content: "Install the package." },
  { value: "usage", title: "Usage", content: "Import the components." },
  { value: "theming", title: "Theming", content: "Override design tokens." },
];

describe("Accordion", () => {
  it("renders a trigger per item", () => {
    render(<Accordion items={ITEMS} />);
    ITEMS.forEach((item) => {
      expect(screen.getByRole("button", { name: item.title })).toBeInTheDocument();
    });
  });

  it("starts with all panels closed by default", () => {
    const { container } = render(<Accordion items={ITEMS} />);
    ITEMS.forEach((item) => {
      expect(screen.getByRole("button", { name: item.title })).toHaveAttribute(
        "aria-expanded",
        "false"
      );
    });
    container.querySelectorAll(".viora-accordion__panel").forEach((panel) => {
      expect(panel).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("opens the panel matching defaultOpen", () => {
    render(<Accordion items={ITEMS} defaultOpen="usage" />);
    expect(
      screen.getByRole("button", { name: "Usage" })
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      document.querySelector('.viora-accordion__panel[aria-hidden="false"]')
    ).toBeInTheDocument();
  });

  it("toggles open and closed on click", async () => {
    const user = userEvent.setup();
    render(<Accordion items={ITEMS} />);
    const trigger = screen.getByRole("button", { name: "Setup" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps a single panel open at a time", async () => {
    const user = userEvent.setup();
    render(<Accordion items={ITEMS} />);
    await user.click(screen.getByRole("button", { name: "Setup" }));
    await user.click(screen.getByRole("button", { name: "Theming" }));
    expect(
      screen.getByRole("button", { name: "Setup" })
    ).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.getByRole("button", { name: "Theming" })
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("wires the panel region to its trigger", () => {
    const { container } = render(<Accordion items={ITEMS} />);
    const trigger = screen.getByRole("button", { name: "Setup" });
    const panel = container.querySelector('.viora-accordion__panel');
    expect(trigger).toHaveAttribute("aria-controls", panel.id);
    expect(panel).toHaveAttribute("role", "region");
    expect(panel).toHaveAttribute("aria-labelledby", trigger.id);
  });

  it("prevents collapsing when collapsible is false", async () => {
    const user = userEvent.setup();
    render(<Accordion items={ITEMS} collapsible={false} />);
    const trigger = screen.getByRole("button", { name: "Setup" });
    await user.click(trigger);
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("supports controlled usage via open and onToggle", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const { rerender } = render(
      <Accordion items={ITEMS} open="setup" onToggle={onToggle} />
    );
    await user.click(screen.getByRole("button", { name: "Usage" }));
    expect(onToggle).toHaveBeenCalledWith("usage");
    rerender(<Accordion items={ITEMS} open={null} onToggle={onToggle} />);
    expect(
      screen.getByRole("button", { name: "Usage" })
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("merges custom className with component classes", () => {
    render(<Accordion items={ITEMS} className="custom-class" />);
    expect(document.querySelector(".viora-accordion")).toHaveClass(
      "viora-accordion",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Accordion items={ITEMS} data-testid="accordion" />);
    expect(screen.getByTestId("accordion")).toHaveClass("viora-accordion");
  });
});