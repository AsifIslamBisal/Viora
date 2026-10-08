import { Children, useCallback, useEffect, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import "./Carousel.css";

export function Carousel({
  children,
  ariaLabel = "Carousel",
  autoPlay = false,
  interval = 4000,
  loop = true,
  showArrows = true,
  showDots = true,
  initialSlide = 0,
  prevLabel = "Previous slide",
  nextLabel = "Next slide",
  onSlideChange,
  className,
  ...rest
}) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const [current, setCurrent] = useState(
    count > 0 ? Math.max(0, Math.min(initialSlide, count - 1)) : 0
  );
  const [paused, setPaused] = useState(false);
  const currentRef = useRef(current);
  currentRef.current = current;

  const goTo = useCallback(
    (index) => {
      if (count === 0) {
        return;
      }
      const next = loop
        ? ((index % count) + count) % count
        : Math.max(0, Math.min(index, count - 1));
      setCurrent(next);
      onSlideChange?.(next);
    },
    [count, loop, onSlideChange]
  );

  const prev = useCallback(
    () => goTo(currentRef.current - 1),
    [goTo]
  );
  const next = useCallback(
    () => goTo(currentRef.current + 1),
    [goTo]
  );

  useEffect(() => {
    if (!autoPlay || paused) {
      return undefined;
    }
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, paused, interval, next]);

  if (count === 0) {
    return null;
  }

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className={cx("viora-carousel", className)}
      {...rest}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="viora-carousel__viewport">
        <div
          className="viora-carousel__track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="viora-carousel__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showArrows ? (
        <div className="viora-carousel__arrows">
          <button
            type="button"
            className="viora-carousel__arrow"
            aria-label={prevLabel}
            disabled={!loop && current === 0}
            onClick={prev}
          >
            ‹
          </button>
          <button
            type="button"
            className="viora-carousel__arrow"
            aria-label={nextLabel}
            disabled={!loop && current === count - 1}
            onClick={next}
          >
            ›
          </button>
        </div>
      ) : null}

      {showDots ? (
        <div className="viora-carousel__dots" role="tablist" aria-label="Slides">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className="viora-carousel__dot"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === current ? "true" : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default Carousel;