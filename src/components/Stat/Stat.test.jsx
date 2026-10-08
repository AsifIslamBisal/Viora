import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Stat } from "./Stat";

describe("Stat", () => {
  it("renders the label and value", () => {
    const { getByText } = render(<Stat label="Revenue" value="$45,231" />);
    expect(getByText("Revenue")).toBeInTheDocument();
    expect(getByText("$45,231")).toBeInTheDocument();
  });

  it("wraps the value with prefix and suffix", () => {
    const { container } = render(
      <Stat label="Uptime" value="99.99" prefix="~" suffix="%" />
    );
    expect(container.querySelector(".viora-stat__prefix")).toHaveTextContent("~");
    expect(container.querySelector(".viora-stat__suffix")).toHaveTextContent("%");
  });

  it("renders the delta with an up trend by default", () => {
    const { getByText, container } = render(
      <Stat label="Revenue" value="$45k" delta="+12.5%" />
    );
    expect(getByText("+12.5%")).toBeInTheDocument();
    expect(container.querySelector(".viora-stat__delta")).toHaveClass(
      "viora-stat__delta--up"
    );
  });

  it("renders a down trend delta", () => {
    const { container } = render(
      <Stat label="Churn" value="3.1%" delta="-0.4%" trend="down" />
    );
    expect(container.querySelector(".viora-stat__delta")).toHaveClass(
      "viora-stat__delta--down"
    );
  });

  it("renders no delta when omitted", () => {
    const { container } = render(<Stat label="Revenue" value="$45k" />);
    expect(container.querySelector(".viora-stat__delta")).not.toBeInTheDocument();
  });

  it("merges custom className with component classes", () => {
    const { container } = render(
      <Stat label="Revenue" value="5" className="custom-class" />
    );
    expect(container.querySelector(".viora-stat")).toHaveClass(
      "viora-stat",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    const { getByTestId } = render(
      <Stat label="Revenue" value="5" data-testid="stat" />
    );
    expect(getByTestId("stat")).toHaveClass("viora-stat");
  });
});