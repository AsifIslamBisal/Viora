import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Timeline } from "./Timeline";

const ITEMS = [
  { id: "a", title: "Created", date: "Oct 1", content: "Project created." },
  { id: "b", title: "Reviewed", date: "Oct 3" },
  {
    id: "c",
    title: "Shipped",
    date: "Oct 8",
    content: "Released to production.",
  },
];

describe("Timeline", () => {
  it("renders items as a labelled list", () => {
    render(<Timeline items={ITEMS} />);
    expect(screen.getByRole("list", { name: "Timeline" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("Created")).toBeInTheDocument();
    expect(screen.getByText("Reviewed")).toBeInTheDocument();
    expect(screen.getByText("Shipped")).toBeInTheDocument();
  });

  it("renders optional content text", () => {
    render(<Timeline items={ITEMS} />);
    expect(screen.getByText("Project created.")).toBeInTheDocument();
    expect(screen.getByText("Released to production.")).toBeInTheDocument();
  });

  it("renders dates as time elements", () => {
    render(<Timeline items={ITEMS} />);
    expect(screen.getAllByRole("time")[0]).toHaveTextContent("Oct 1");
    expect(screen.getAllByRole("time")).toHaveLength(3);
  });

  it("renders an icon inside the dot when provided", () => {
    const icon = <svg data-testid="icon" />;
    render(
      <Timeline
        items={[{ id: "a", title: "Shipped", icon }]}
      />
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByTestId("icon").closest(".viora-timeline__dot")).toBeInTheDocument();
  });

  it("marks the last item", () => {
    const { container } = render(<Timeline items={ITEMS} />);
    expect(container.querySelector(".viora-timeline__item--last")).toHaveTextContent(
      "Shipped"
    );
  });

  it("supports center alignment", () => {
    const { container } = render(<Timeline items={ITEMS} align="center" />);
    expect(container.querySelector(".viora-timeline")).toHaveClass(
      "viora-timeline--center"
    );
  });

  it("supports a custom aria-label", () => {
    render(<Timeline items={ITEMS} ariaLabel="Release history" />);
    expect(screen.getByRole("list", { name: "Release history" })).toBeInTheDocument();
  });

  it("renders nothing without items", () => {
    const { container } = render(<Timeline items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("merges custom className with component classes", () => {
    render(<Timeline items={ITEMS} className="custom-class" />);
    expect(screen.getByRole("list", { name: "Timeline" })).toHaveClass(
      "viora-timeline",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Timeline items={ITEMS} data-testid="timeline" />);
    expect(screen.getByTestId("timeline")).toHaveClass("viora-timeline");
  });
});