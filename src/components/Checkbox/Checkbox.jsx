import { useEffect, useId, useRef } from "react";
import { cx } from "../../utils/cx";
import "./Checkbox.css";

export function Checkbox({
  id,
  label,
  hint,
  error,
  indeterminate = false,
  disabled,
  className,
  ...rest
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const describedBy = error ? errorId : hint ? hintId : undefined;
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className="viora-field">
      <label
        className={cx("viora-checkbox", error && "viora-checkbox--error")}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="checkbox"
          className={cx("viora-checkbox__input", className)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          aria-checked={indeterminate ? "mixed" : undefined}
          disabled={disabled}
          {...rest}
        />
        <span className="viora-checkbox__box" aria-hidden="true">
          <svg className="viora-checkbox__check" viewBox="0 0 16 16" fill="none">
            <path
              d="M3.5 8.5l3 3 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg className="viora-checkbox__dash" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 8h8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        {label ? (
          <span className="viora-checkbox__label">{label}</span>
        ) : null}
      </label>
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

export default Checkbox;