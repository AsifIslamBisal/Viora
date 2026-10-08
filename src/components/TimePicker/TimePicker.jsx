import { useId } from "react";
import { cx } from "../../utils/cx";
import "./TimePicker.css";

export function TimePicker({
  id,
  label,
  hint,
  error,
  value,
  onChange,
  step = 60,
  disabled = false,
  className,
  ...rest
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className={cx("viora-field", "viora-time-picker", className)}>
      {label ? (
        <label className="viora-field__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <div className="viora-time-picker__control">
        <input
          id={inputId}
          type="time"
          value={value ?? ""}
          step={step}
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cx("viora-input", error && "viora-input--error")}
          {...rest}
        />
        <svg className="viora-time-picker__icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="7.25" stroke="currentColor" />
          <path
            d="M10 5.5V10l3 2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {hint || error ? (
        <p
          id={error ? errorId : hintId}
          className={cx(
            "viora-field__message",
            error && "viora-field__message--error"
          )}
        >
          {error || hint}
        </p>
      ) : null}
    </div>
  );
}

export default TimePicker;