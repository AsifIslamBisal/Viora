import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Rating } from "./Rating";

const starsOf = (container) =>
  Array.from(container.querySelectorAll(".viora-rating__star"));

describe("Rating", () => {
  it("renders a slider with the accessible name", () => {
    render(<Rating label="Your rating" />);
    expect(screen.getByRole("slider", { name: "Your rating" })).toBeInTheDocument();
  });

  it("exposes min, max, and current value", () => {
    render(<Rating count={5} value={3} />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "5");
    expect(slider).toHaveAttribute("aria-valuenow", "3");
  });

  it("describes the value as a fraction", () => {
    render(<Rating count={5} value={3} />);
    expect(screen.getByRole("slider")).toHaveAttribute(
      "aria-valuetext",
      "3 of 5"
    );
  });

  it("renders the requested number of stars", () => {
    const { container } = render(<Rating count={7} />);
    expect(starsOf(container)).toHaveLength(7);
  });

  it("fills one star per point of value", () => {
    const { container } = render(<Rating count={5} value={3} />);
    const filled = starsOf(container).filter((star) =>
      star.classList.contains("viora-rating__star--filled")
    );
    expect(filled).toHaveLength(3);
  });

  it("reports the clicked star through onChange", () => {
    const onChange = vi.fn();
    const { container } = render(<Rating onChange={onChange} />);
    fireEvent.click(starsOf(container)[3]);
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("ignores clicks when readOnly", () => {
    const onChange = vi.fn();
    const { container } = render(<Rating readOnly onChange={onChange} />);
    fireEvent.click(starsOf(container)[1]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("advances with the right arrow", () => {
    const onChange = vi.fn();
    render(<Rating value={2} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("slider"), { key: "ArrowRight" });
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("clamps the right arrow at the max", () => {
    const onChange = vi.fn();
    render(<Rating value={5} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("slider"), { key: "ArrowRight" });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("retreats with the left arrow", () => {
    const onChange = vi.fn();
    render(<Rating value={4} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("slider"), { key: "ArrowLeft" });
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("jumps to zero on Home and to the max on End", () => {
    const onChange = vi.fn();
    render(<Rating value={3} count={5} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("slider"), { key: "Home" });
    expect(onChange).toHaveBeenCalledWith(0);
    fireEvent.keyDown(screen.getByRole("slider"), { key: "End" });
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it("ignores arrow keys when readOnly", () => {
    const onChange = vi.fn();
    render(<Rating readOnly value={3} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("slider"), { key: "ArrowRight" });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("removes focusability when disabled", () => {
    render(<Rating disabled />);
    expect(screen.getByRole("slider")).toHaveAttribute("tabindex", "-1");
  });

  it("previews the hovered star while the pointer is inside", () => {
    const { container } = render(<Rating value={1} />);
    fireEvent.mouseEnter(starsOf(container)[3], { force: true });
    const filled = starsOf(container).filter((star) =>
      star.classList.contains("viora-rating__star--filled")
    );
    expect(filled).toHaveLength(4);
    fireEvent.mouseLeave(screen.getByRole("slider"));
    expect(
      starsOf(container).filter((star) =>
        star.classList.contains("viora-rating__star--filled")
      )
    ).toHaveLength(1);
  });

  it("applies the size classes", () => {
    const { container } = render(<Rating size="lg" />);
    expect(container.querySelector(".viora-rating")).toHaveClass(
      "viora-rating--lg"
    );
  });

  it("merges custom className with component classes", () => {
    const { container } = render(<Rating className="custom-class" />);
    expect(container.querySelector(".viora-rating")).toHaveClass(
      "viora-rating",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Rating data-testid="rating" />);
    expect(screen.getByTestId("rating")).toHaveClass("viora-rating");
  });
});