import { useId } from "react";
import { cx } from "../../utils/cx";
import "./Switch.css";

export function Switch({
  id,
  label,
  hint,
  error,
  disabled,
  className,
  ...rest
}) {
  const generatedId = useId();
  const switchId = id ?? generatedId;
  const hintId = `${switchId}-hint`;
  const errorId = `${switchId}-error`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className="viora-field">
      <label className={cx("viora-switch", error && "viora-switch--error")}>
        <input
          id={switchId}
          type="checkbox"
          role="switch"
          className={cx("viora-switch__input", className)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          disabled={disabled}
          {...rest}
        />
        <span className="viora-switch__track" aria-hidden="true">
          <span className="viora-switch__thumb" />
        </span>
        {label ? <span className="viora-switch__label">{label}</span> : null}
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

export default Switch;