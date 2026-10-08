import { useState } from "react";
import { cx } from "../../utils/cx";
import "./Rating.css";

const STAR_PATH =
  "M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.11l-4.94 2.6.94-5.5-4-3.9 5.53-.8z";

export function Rating({
  count = 5,
  value = 0,
  onChange,
  label = "Rating",
  size = "md",
  disabled = false,
  readOnly = false,
  className,
  ...rest
}) {
  const [hover, setHover] = useState(null);

  const interactive = !disabled && !readOnly;
  const filled = hover ?? value;

  const clamp = (next) => Math.min(Math.max(next, 0), count);

  const handleKeyDown = (event) => {
    if (!interactive) {
      return;
    }

    let next;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        next = clamp(value + 1);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = clamp(value - 1);
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count;
        break;
      default:
        return;
    }

    event.preventDefault();
    if (next !== value) {
      onChange?.(next);
    }
  };

  return (
    <span
      role="slider"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={count}
      aria-valuenow={value}
      aria-valuetext={`${value} of ${count}`}
      aria-disabled={disabled || undefined}
      aria-readonly={readOnly || undefined}
      tabIndex={interactive ? 0 : -1}
      className={cx(
        "viora-rating",
        `viora-rating--${size}`,
        disabled && "viora-rating--disabled",
        className
      )}
      onKeyDown={handleKeyDown}
      onMouseLeave={() => setHover(null)}
      {...rest}
    >
      {Array.from({ length: count }, (_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={starValue}
            aria-hidden="true"
            className={cx(
              "viora-rating__star",
              starValue <= filled && "viora-rating__star--filled"
            )}
            onClick={() => {
              if (interactive) {
                onChange?.(starValue);
              }
            }}
            onMouseEnter={() => interactive && setHover(starValue)}
          >
            <svg viewBox="0 0 20 20" fill="none">
              <path
                d={STAR_PATH}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        );
      })}
    </span>
  );
}

export default Rating;