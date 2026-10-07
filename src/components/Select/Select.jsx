import { useId } from "react";
import { cx } from "../../utils/cx";
import "./Select.css";

export function Select({
  id,
  label,
  hint,
  error,
  size = "md",
  disabled,
  className,
  children,
  ...rest
}) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const hintId = `${selectId}-hint`;
  const errorId = `${selectId}-error`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className="viora-field">
      {label ? (
        <label className="viora-field__label" htmlFor={selectId}>
          {label}
        </label>
      ) : null}
      <div className="viora-select-wrap">
        <select
          id={selectId}
          className={cx(
            "viora-select",
            `viora-select--${size}`,
            error && "viora-select--error",
            className
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          disabled={disabled}
          {...rest}
        >
          {children}
        </select>
        <span className="viora-select__chevron" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
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

export default Select;