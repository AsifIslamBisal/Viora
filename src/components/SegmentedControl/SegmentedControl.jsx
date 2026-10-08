import { useRef, useState } from "react";
import { cx } from "../../utils/cx";
import "./SegmentedControl.css";

export function SegmentedControl({
  options = [],
  value,
  defaultValue,
  onChange,
  label,
  size = "md",
  disabled = false,
  className,
  ...rest
}) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? options[0]?.value);
  const isControlled = value !== undefined;
  const activeValue = isControlled ? value : internalValue;
  const optionRefs = useRef([]);

  const select = (index) => {
    const option = options[index];
    if (!option || option.disabled || disabled) {
      return;
    }
    if (!isControlled) {
      setInternalValue(option.value);
    }
    onChange?.(option.value);
  };

  const focusIndex = (index) => {
    const next =
      ((index % options.length) + options.length) % options.length;
    optionRefs.current[next]?.focus();
    return next;
  };

  const nextEnabled = (from, direction) => {
    for (let step = 1; step <= options.length; step += 1) {
      const index = (((from + direction * step) % options.length) + options.length) % options.length;
      if (!options[index].disabled) {
        return index;
      }
    }
    return from;
  };

  const handleKeyDown = (event) => {
    if (disabled || options.length === 0) {
      return;
    }
    const current = Math.max(
      0,
      options.findIndex((option) => option.value === activeValue)
    );
    const key = event.key;
    if (key === "ArrowRight" || key === "ArrowDown") {
      event.preventDefault();
      const index = nextEnabled(current, 1);
      select(index);
      focusIndex(index);
    } else if (key === "ArrowLeft" || key === "ArrowUp") {
      event.preventDefault();
      const index = nextEnabled(current, -1);
      select(index);
      focusIndex(index);
    } else if (key === "Home") {
      event.preventDefault();
      const index = nextEnabled(-1, 1);
      select(index);
      focusIndex(index);
    } else if (key === "End") {
      event.preventDefault();
      const index = nextEnabled(options.length, -1);
      select(index);
      focusIndex(index);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cx(
        "viora-segmented",
        `viora-segmented--${size}`,
        disabled && "viora-segmented--disabled",
        className
      )}
      {...rest}
      onKeyDown={handleKeyDown}
    >
      {options.map((option, index) => {
        const selected = option.value === activeValue;
        return (
          <button
            key={option.value}
            ref={(node) => {
              optionRefs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            disabled={disabled || option.disabled}
            className={cx(
              "viora-segmented__option",
              selected && "viora-segmented__option--selected"
            )}
            onClick={() => select(index)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;