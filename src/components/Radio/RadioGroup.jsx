import { useId } from "react";
import { cx } from "../../utils/cx";
import { RadioContext } from "./RadioContext";
import "./Radio.css";

export function RadioGroup({
  label,
  name,
  value,
  onChange,
  disabled = false,
  direction = "column",
  hint,
  error,
  className,
  children,
  ...rest
}) {
  const generatedId = useId();
  const groupName = name ?? generatedId;
  const hintId = `${groupName}-hint`;
  const errorId = `${groupName}-error`;

  return (
    <fieldset
      id={groupName}
      role="radiogroup"
      disabled={disabled}
      className={cx(
        "viora-radio-group",
        `viora-radio-group--${direction}`,
        className
      )}
      aria-describedby={error ? errorId : hint ? hintId : undefined}
      {...rest}
    >
      {label ? (
        <legend className="viora-radio-group__legend">{label}</legend>
      ) : null}
      <div className="viora-radio-group__options">
        <RadioContext.Provider
          value={{ name: groupName, value, onChange, disabled }}
        >
          {children}
        </RadioContext.Provider>
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
    </fieldset>
  );
}

export default RadioGroup;