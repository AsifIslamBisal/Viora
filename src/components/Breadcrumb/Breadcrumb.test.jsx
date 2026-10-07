import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Breadcrumb } from "./Breadcrumb";

const ITEMS = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
  { label: "Breadcrumb" },
];

describe("Breadcrumb", () => {
  it("renders a nav landmark with a Breadcrumb label", () => {
    render(<Breadcrumb items={ITEMS} />);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });

  it("honors a custom aria-label", () => {
    render(<Breadcrumb items={ITEMS} ariaLabel="Current section" />);
    expect(
      screen.getByRole("navigation", { name: "Current section" })
    ).toBeInTheDocument();
  });

  it("renders intermediate items as links", () => {
    render(<Breadcrumb items={ITEMS} />);
    const link = screen.getByRole("link", { name: "Components" });
    expect(link).toHaveAttribute("href", "/components");
  });

  it("marks the last item as the current page", () => {
    render(<Breadcrumb items={ITEMS} />);
    const lastCrumb = screen.getByText("Breadcrumb");
    expect(lastCrumb).toHaveAttribute("aria-current", "page");
  });

  it("does not mark intermediate items as current", () => {
    render(<Breadcrumb items={ITEMS} />);
    expect(screen.getByText("Home")).not.toHaveAttribute("aria-current");
  });

  it("renders a list of breadcrumb items", () => {
    render(<Breadcrumb items={ITEMS} />);
    const nav = screen.getByRole("navigation");
    const list = within(nav).getByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
  });

  it("renders separators between items but not after the last", () => {
    const { container } = render(<Breadcrumb items={ITEMS} />);
    expect(
      container.querySelectorAll(".viora-breadcrumb__separator")
    ).toHaveLength(2);
  });

  it("supports a custom separator", () => {
    render(<Breadcrumb items={ITEMS} separator="›" />);
    const separators = document.querySelectorAll(".viora-breadcrumb__separator");
    expect(separators[0]).toHaveTextContent("›");
  });

  it("renders a single crumb without links or separators", () => {
    const { container } = render(
      <Breadcrumb items={[{ label: "Dashboard" }]} />
    );
    expect(container.querySelectorAll(".viora-breadcrumb__link")).toHaveLength(0);
    expect(
      container.querySelectorAll(".viora-breadcrumb__separator")
    ).toHaveLength(0);
    expect(screen.getByText("Dashboard")).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("merges custom className with component classes", () => {
    render(<Breadcrumb items={ITEMS} className="custom-class" />);
    expect(screen.getByRole("navigation")).toHaveClass(
      "viora-breadcrumb",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Breadcrumb items={ITEMS} data-testid="crumbs" />);
    expect(screen.getByTestId("crumbs")).toHaveClass("viora-breadcrumb");
  });
});