import { useId } from "react";
import { cx } from "../../utils/cx";
import "./Textarea.css";

export function Textarea({
  id,
  label,
  hint,
  error,
  size = "md",
  rows = 3,
  disabled,
  className,
  ...rest
}) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const hintId = `${textareaId}-hint`;
  const errorId = `${textareaId}-error`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className="viora-field">
      {label ? (
        <label className="viora-field__label" htmlFor={textareaId}>
          {label}
        </label>
      ) : null}
      <textarea
        id={textareaId}
        rows={rows}
        className={cx(
          "viora-textarea",
          `viora-textarea--${size}`,
          error && "viora-textarea--error",
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

export default Textarea;