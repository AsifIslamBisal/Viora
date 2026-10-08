import { useId } from "react";
import { cx } from "../../utils/cx";
import "./NumberInput.css";

function clamp(value, min, max) {
  if (min !== undefined && value < min) {
    return min;
  }
  if (max !== undefined && value > max) {
    return max;
  }
  return value;
}

export function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  hint,
  error,
  size = "md",
  disabled = false,
  className,
  ...rest
}) {
  const id = useId();

  const stepBy = (delta) => {
    const next = clamp((value ?? 0) + delta, min, max);
    if (typeof next === "number") {
      onChange?.(next);
    }
  };

  return (
    <div
      className={cx(
        "viora-input-number",
        `viora-input-number--${size}`,
        disabled && "viora-input-number--disabled",
        className
      )}
    >
      {label ? (
        <label
          htmlFor={id}
          className={cx(
            "viora-field__label",
            error && "viora-field__label--error"
          )}
        >
          {label}
        </label>
      ) : null}
      <div
        className={cx("viora-input-number__control")}
      >
        <button
          type="button"
          className="viora-input-number__button viora-input-number__button--decrement"
          onClick={() => stepBy(-step)}
          disabled={disabled || (min !== undefined && value <= min)}
          aria-label="Decrement"
        >
          <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M2.5 6h7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          className="viora-input-number__input"
          value={value}
          onChange={(event) => {
            const { value: text } = event.target;
            if (text === "") {
              return;
            }
            const number = Number(text);
            if (!Number.isNaN(number)) {
              onChange?.(clamp(number, min, max));
            }
          }}
          disabled={disabled}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          {...rest}
        />
        <button
          type="button"
          className="viora-input-number__button viora-input-number__button--increment"
          onClick={() => stepBy(step)}
          disabled={disabled || (max !== undefined && value >= max)}
          aria-label="Increment"
        >
          <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M6 2.5v7M2.5 6h7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      {error ? (
        <p id={`${id}-error`} className="viora-field__message viora-field__message--error">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="viora-field__message">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export default NumberInput;