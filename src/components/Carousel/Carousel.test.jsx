import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Carousel } from "./Carousel";

const SLIDES = [
  <div key="a">Slide A</div>,
  <div key="b">Slide B</div>,
  <div key="c">Slide C</div>,
];

describe("Carousel", () => {
  it("renders the carousel region", () => {
    render(<Carousel>{SLIDES}</Carousel>);
    expect(screen.getByRole("region", { name: "Carousel" })).toHaveAttribute(
      "aria-roledescription",
      "carousel"
    );
  });

  it("labels each slide with its position", () => {
    render(<Carousel ariaLabel="Banners">{SLIDES}</Carousel>);
    expect(screen.getByRole("group", { name: "1 of 3" })).toHaveAttribute(
      "aria-roledescription",
      "slide"
    );
    expect(screen.getByRole("group", { name: "2 of 3" })).toBeInTheDocument();
  });

  it("advances on the next arrow", () => {
    const onSlideChange = vi.fn();
    render(<Carousel onSlideChange={onSlideChange} loop={false}>{SLIDES}</Carousel>);
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(onSlideChange).toHaveBeenCalledWith(1);
    expect(screen.getByRole("button", { name: "Previous slide" })).not.toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(onSlideChange).toHaveBeenLastCalledWith(2);
    expect(screen.getByRole("button", { name: "Next slide" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Previous slide" })).not.toBeDisabled();
  });

  it("goes backwards on the previous arrow", () => {
    const onSlideChange = vi.fn();
    render(<Carousel initialSlide={2} onSlideChange={onSlideChange}>{SLIDES}</Carousel>);
    fireEvent.click(screen.getByRole("button", { name: "Previous slide" }));
    expect(onSlideChange).toHaveBeenCalledWith(1);
  });

  it("wraps around when looping", () => {
    const onSlideChange = vi.fn();
    render(<Carousel onSlideChange={onSlideChange}>{SLIDES}</Carousel>);
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(onSlideChange).toHaveBeenLastCalledWith(2);
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(onSlideChange).toHaveBeenLastCalledWith(0);
  });

  it("wraps backwards when looping", () => {
    const onSlideChange = vi.fn();
    render(<Carousel onSlideChange={onSlideChange}>{SLIDES}</Carousel>);
    fireEvent.click(screen.getByRole("button", { name: "Previous slide" }));
    expect(onSlideChange).toHaveBeenCalledWith(2);
  });

  it("renders a dot per slide and marks the current one", () => {
    render(<Carousel>{SLIDES}</Carousel>);
    const dots = screen.getAllByRole("button", { name: /Go to slide/ });
    expect(dots).toHaveLength(3);
    expect(dots[0]).toHaveAttribute("aria-current", "true");
    expect(dots[1]).not.toHaveAttribute("aria-current");
  });

  it("navigates when a dot is clicked", () => {
    const onSlideChange = vi.fn();
    render(<Carousel initialSlide={0} onSlideChange={onSlideChange}>{SLIDES}</Carousel>);
    fireEvent.click(screen.getByRole("button", { name: "Go to slide 3" }));
    expect(onSlideChange).toHaveBeenCalledWith(2);
    expect(screen.getByRole("button", { name: "Go to slide 3" })).toHaveAttribute(
      "aria-current",
      "true"
    );
  });

  it("auto-plays on the configured interval", () => {
    vi.useFakeTimers();
    try {
      const onSlideChange = vi.fn();
      render(
        <Carousel autoPlay interval={1000} onSlideChange={onSlideChange}>
          {SLIDES}
        </Carousel>
      );
      act(() => vi.advanceTimersByTime(1000));
      expect(onSlideChange).toHaveBeenCalledWith(1);
      act(() => vi.advanceTimersByTime(1000));
      expect(onSlideChange).toHaveBeenLastCalledWith(2);
    } finally {
      vi.useRealTimers();
    }
  });

  it("wraps while auto-playing", () => {
    vi.useFakeTimers();
    try {
      const onSlideChange = vi.fn();
      render(
        <Carousel autoPlay interval={1000} onSlideChange={onSlideChange}>
          {SLIDES}
        </Carousel>
      );
      act(() => vi.advanceTimersByTime(1000));
      act(() => vi.advanceTimersByTime(1000));
      act(() => vi.advanceTimersByTime(1000));
      expect(onSlideChange).toHaveBeenLastCalledWith(0);
    } finally {
      vi.useRealTimers();
    }
  });

  it("pauses auto-play on hover", () => {
    vi.useFakeTimers();
    try {
      const onSlideChange = vi.fn();
      render(
        <Carousel autoPlay interval={1000} onSlideChange={onSlideChange}>
          {SLIDES}
        </Carousel>
      );
      const region = screen.getByRole("region", { name: "Carousel" });
      fireEvent.mouseEnter(region);
      act(() => vi.advanceTimersByTime(3000));
      expect(onSlideChange).not.toHaveBeenCalled();
      fireEvent.mouseLeave(region);
      act(() => vi.advanceTimersByTime(1000));
      expect(onSlideChange).toHaveBeenCalledWith(1);
    } finally {
      vi.useRealTimers();
    }
  });

  it("supports custom arrow labels", () => {
    render(
      <Carousel prevLabel="Back" nextLabel="Forward">
        {SLIDES}
      </Carousel>
    );
    expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Forward" })).toBeInTheDocument();
  });

  it("hides arrows and dots when disabled", () => {
    render(<Carousel showArrows={false} showDots={false}>{SLIDES}</Carousel>);
    expect(screen.queryByRole("button", { name: "Next slide" })).toBeNull();
    expect(screen.queryByRole("tablist")).toBeNull();
  });

  it("honors the initial slide", () => {
    render(<Carousel initialSlide={2}>{SLIDES}</Carousel>);
    expect(screen.getByRole("button", { name: "Go to slide 3" })).toHaveAttribute(
      "aria-current",
      "true"
    );
  });

  it("renders nothing without slides", () => {
    const { container } = render(<Carousel />);
    expect(container).toBeEmptyDOMElement();
  });

  it("merges custom className with component classes", () => {
    render(<Carousel className="custom-class">{SLIDES}</Carousel>);
    expect(screen.getByRole("region", { name: "Carousel" })).toHaveClass(
      "viora-carousel",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Carousel data-testid="carousel">{SLIDES}</Carousel>);
    expect(screen.getByTestId("carousel")).toHaveClass("viora-carousel");
  });
});