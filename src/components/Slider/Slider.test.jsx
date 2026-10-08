import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("renders a range input with the label", () => {
    render(<Slider label="Volume" />);
    expect(screen.getByRole("slider", { name: "Volume" })).toBeInTheDocument();
  });

  it("defaults to 0–100 with step 1", () => {
    render(<Slider />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("min", "0");
    expect(slider).toHaveAttribute("max", "100");
    expect(slider).toHaveAttribute("step", "1");
  });

  it("honors custom min, max, and step", () => {
    render(<Slider label="Zoom" min={50} max={200} step={10} />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("min", "50");
    expect(slider).toHaveAttribute("max", "200");
    expect(slider).toHaveAttribute("step", "10");
  });

  it("sets the fill progress via a CSS variable", () => {
    render(<Slider label="Level" min={0} max={200} value={100} />);
    expect(screen.getByRole("slider")).toHaveStyle({
      "--viora-slider-progress": "50%",
    });
  });

  it("reports changes through onChange", () => {
    const onChange = vi.fn();
    render(<Slider label="Level" onChange={onChange} />);
    fireEvent.change(screen.getByRole("slider"), { target: { value: "42" } });
    expect(onChange).toHaveBeenCalledWith(42);
  });

  it("disables the input when disabled", () => {
    render(<Slider label="Level" disabled />);
    expect(screen.getByRole("slider")).toBeDisabled();
  });

  it("renders the current value when showValue is set", () => {
    render(<Slider label="Level" value={66} showValue />);
    expect(screen.getByText("66")).toBeInTheDocument();
  });

  it("omits the value text by default", () => {
    render(<Slider label="Level" value={66} />);
    expect(screen.queryByText("66")).not.toBeInTheDocument();
  });

  it.each(["success", "warning", "danger"])(
    "applies the %s tone to the fill",
    (tone) => {
      render(<Slider label="Level" tone={tone} />);
      const slider = screen.getByRole("slider");
      expect(
        document.querySelector(".viora-slider")
      ).toHaveClass(`viora-slider--${tone}`);
      expect(slider).toHaveStyle({
        "--viora-slider-fill": `var(--viora-${tone})`,
      });
    }
  );

  it("uses the primary fill by default", () => {
    render(<Slider label="Level" />);
    expect(screen.getByRole("slider")).toHaveStyle({
      "--viora-slider-fill": "var(--viora-primary)",
    });
  });

  it("merges custom className with component classes", () => {
    render(<Slider label="Level" className="custom-class" />);
    expect(document.querySelector(".viora-slider")).toHaveClass(
      "viora-slider",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Slider label="Level" data-testid="slider" />);
    expect(screen.getByTestId("slider")).toHaveAttribute("type", "range");
  });
});