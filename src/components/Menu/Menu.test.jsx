import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Menu } from "./Menu";

const ITEMS = [
  { label: "Rename", onClick: () => {} },
  { label: "Duplicate", onClick: () => {} },
  { label: "Share", href: "/share" },
  { separator: true },
  { label: "Delete", variant: "danger", onClick: () => {} },
];

describe("Menu", () => {
  it("is closed by default and hides the panel", () => {
    render(<Menu trigger="Actions" items={ITEMS} />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens the menu on trigger click with correct ARIA", async () => {
    const user = userEvent.setup();
    render(<Menu trigger="Actions" items={ITEMS} />);
    const trigger = screen.getByRole("button", { name: "Actions" });
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(screen.getByRole("menu", { name: "Menu options" })).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("labels the menu with a custom label", async () => {
    const user = userEvent.setup();
    render(<Menu trigger="Actions" items={ITEMS} label="File actions" />);
    await user.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByRole("menu", { name: "File actions" })).toBeInTheDocument();
  });

  it("renders menu items as buttons", async () => {
    const user = userEvent.setup();
    render(<Menu trigger="Actions" items={ITEMS} />);
    await user.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByRole("menuitem", { name: "Rename" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Duplicate" })).toBeInTheDocument();
  });

  it("renders href items as menu links", async () => {
    const user = userEvent.setup();
    render(<Menu trigger="Actions" items={ITEMS} />);
    await user.click(screen.getByRole("button", { name: "Actions" }));
    const share = screen.getByRole("menuitem", { name: "Share" });
    expect(share.tagName).toBe("A");
    expect(share).toHaveAttribute("href", "/share");
  });

  it("calls onClick and closes on item selection", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Menu trigger="Actions" items={[{ label: "Rename", onClick }]} />
    );
    await user.click(screen.getByRole("button", { name: "Actions" }));
    await user.click(screen.getByRole("menuitem", { name: "Rename" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("keeps the menu open after selection when closeOnSelect is false", async () => {
    const user = userEvent.setup();
    render(
      <Menu
        trigger="Actions"
        items={[{ label: "Rename", onClick: () => {} }]}
        closeOnSelect={false}
      />
    );
    await user.click(screen.getByRole("button", { name: "Actions" }));
    await user.click(screen.getByRole("menuitem", { name: "Rename" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("marks disabled items and skips them for focus", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Menu
        trigger="Actions"
        items={[{ label: "Locked", disabled: true, onClick }]}
      />
    );
    const trigger = screen.getByRole("button", { name: "Actions" });
    await user.click(trigger);
    const item = screen.getByRole("menuitem", { name: "Locked" });
    expect(item).toHaveAttribute("aria-disabled", "true");
    expect(trigger).toHaveFocus();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders a separator row", async () => {
    const user = userEvent.setup();
    const { container } = render(<Menu trigger="Actions" items={ITEMS} />);
    await user.click(screen.getByRole("button", { name: "Actions" }));
    const separators = container.querySelectorAll('[role="separator"]');
    expect(separators.length).toBeGreaterThan(0);
  });

  it("marks dangerous items with the danger class", async () => {
    const user = userEvent.setup();
    render(<Menu trigger="Actions" items={ITEMS} />);
    await user.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveClass(
      "viora-menu__item--danger"
    );
  });

  it("moves focus with arrow keys", async () => {
    const user = userEvent.setup();
    render(<Menu trigger="Actions" items={[{ label: "One" }, { label: "Two" }]} />);
    await user.click(screen.getByRole("button", { name: "Actions" }));
    expect(document.activeElement).toHaveTextContent("One");
    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toHaveTextContent("Two");
    await user.keyboard("{ArrowUp}");
    expect(document.activeElement).toHaveTextContent("One");
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Menu trigger="Actions" items={ITEMS} />);
    const trigger = screen.getByRole("button", { name: "Actions" });
    await user.click(trigger);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Menu trigger="Actions" items={ITEMS} />
        <button type="button">Outside</button>
      </div>
    );
    await user.click(screen.getByRole("button", { name: "Actions" }));
    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("applies the align-end class", async () => {
    const user = userEvent.setup();
    render(<Menu trigger="Actions" items={ITEMS} align="end" />);
    expect(
      document.querySelector(".viora-menu")
    ).toHaveClass("viora-menu--align-end");
    await user.click(screen.getByRole("button", { name: "Actions" }));
  });

  it("merges custom className with component classes", () => {
    render(<Menu trigger="Actions" items={ITEMS} className="custom-class" />);
    expect(document.querySelector(".viora-menu")).toHaveClass(
      "viora-menu",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Menu trigger="Actions" items={ITEMS} data-testid="menu" />);
    expect(screen.getByTestId("menu")).toHaveClass("viora-menu");
  });
});