import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "./Tabs";

const TABS = [
  { value: "overview", label: "Overview", content: <p>Overview content</p> },
  { value: "activity", label: "Activity", content: <p>Activity content</p> },
  { value: "settings", label: "Settings", content: <p>Settings content</p> },
];

describe("Tabs", () => {
  it("renders a tablist with tabs and aria-label", () => {
    render(<Tabs tabs={TABS} label="Project sections" />);
    expect(
      screen.getByRole("tablist", { name: "Project sections" })
    ).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Activity" })).toBeInTheDocument();
  });

  it("selects the first tab by default", () => {
    render(<Tabs tabs={TABS} />);
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByText("Overview content")).toBeInTheDocument();
    expect(screen.queryByText("Activity content")).toBeNull();
  });

  it("honors defaultValue", () => {
    render(<Tabs tabs={TABS} defaultValue="activity" />);
    expect(screen.getByRole("tab", { name: "Activity" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByText("Activity content")).toBeInTheDocument();
  });

  it("switches tabs on click", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={TABS} />);
    await user.click(screen.getByRole("tab", { name: "Settings" }));
    expect(screen.getByRole("tab", { name: "Settings" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByText("Settings content")).toBeInTheDocument();
    expect(screen.queryByText("Overview content")).toBeNull();
  });

  it("supports controlled value with onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Tabs tabs={TABS} value="overview" onChange={onChange} />);
    await user.click(screen.getByRole("tab", { name: "Activity" }));
    expect(onChange).toHaveBeenCalledWith("activity");
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  it("moves focus and selection on ArrowRight", () => {
    render(<Tabs tabs={TABS} />);
    fireEvent.keyDown(screen.getByRole("tab", { name: "Overview" }), {
      key: "ArrowRight",
    });
    const activityTab = screen.getByRole("tab", { name: "Activity" });
    expect(activityTab).toHaveFocus();
    expect(activityTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Activity content")).toBeInTheDocument();
  });

  it("wraps around on ArrowRight past the last tab", () => {
    render(<Tabs tabs={TABS} />);
    const settingsTab = screen.getByRole("tab", { name: "Settings" });
    fireEvent.keyDown(settingsTab, { key: "Home" });
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveFocus();
  });

  it("moves focus and selection on ArrowLeft", () => {
    render(<Tabs tabs={TABS} />);
    fireEvent.keyDown(screen.getByRole("tab", { name: "Overview" }), {
      key: "ArrowLeft",
    });
    expect(screen.getByRole("tab", { name: "Settings" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Settings" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  it("supports Home and End keys", () => {
    render(<Tabs tabs={TABS} />);
    const activityTab = screen.getByRole("tab", { name: "Activity" });
    fireEvent.keyDown(activityTab, { key: "End" });
    expect(screen.getByRole("tab", { name: "Settings" })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole("tab", { name: "Settings" }), {
      key: "Home",
    });
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveFocus();
  });

  it("uses a roving tabindex", () => {
    render(<Tabs tabs={TABS} />);
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute(
      "tabindex",
      "0"
    );
    expect(screen.getByRole("tab", { name: "Activity" })).toHaveAttribute(
      "tabindex",
      "-1"
    );
  });

  it("links the tabpanel to its active tab", () => {
    render(<Tabs tabs={TABS} />);
    const panel = screen.getByRole("tabpanel");
    const tabId = panel.getAttribute("aria-labelledby");
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute(
      "id",
      tabId
    );
  });

  it("merges custom className with component classes", () => {
    render(<Tabs tabs={TABS} className="custom-class" />);
    expect(screen.getByRole("tabpanel").parentElement).toHaveClass(
      "viora-tabs",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Tabs tabs={TABS} data-testid="tabs" />);
    expect(screen.getByTestId("tabs")).toHaveClass("viora-tabs");
  });
});