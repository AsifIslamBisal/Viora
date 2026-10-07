import { useId } from "react";
import { cx } from "../../utils/cx";
import "./Input.css";

export function Input({
  id,
  label,
  hint,
  error,
  size = "md",
  type = "text",
  disabled,
  className,
  ...rest
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className="viora-field">
      {label ? (
        <label className="viora-field__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        type={type}
        className={cx(
          "viora-input",
          `viora-input--${size}`,
          error && "viora-input--error",
          className
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        disabled={disabled}
        {...rest}
      />
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

export default Input;