import { useContext, useId } from "react";
import { cx } from "../../utils/cx";
import { RadioContext } from "./RadioContext";

export function Radio({ id, value, label, disabled, className, ...rest }) {
  const ctx = useContext(RadioContext);
  const generatedId = useId();
  const radioId = id ?? generatedId;
  const checked = ctx ? value === ctx.value : false;
  const isDisabled = disabled || (ctx?.disabled ?? false);

  return (
    <label className={cx("viora-radio", className)}>
      <input
        type="radio"
        id={radioId}
        name={ctx?.name}
        value={value}
        checked={checked}
        disabled={isDisabled}
        onChange={ctx?.onChange}
        className="viora-radio__input"
        {...rest}
      />
      <span className="viora-radio__circle" aria-hidden="true" />
      {label ? <span className="viora-radio__label">{label}</span> : null}
    </label>
  );
}

export default Radio;