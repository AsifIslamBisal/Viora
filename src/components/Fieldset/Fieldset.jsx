import { cx } from "../../utils/cx";
import "./Fieldset.css";

export function Fieldset({
  legend,
  disabled = false,
  gap = "md",
  className,
  children,
  ...rest
}) {
  return (
    <fieldset
      className={cx(
        "viora-fieldset",
        `viora-fieldset--gap-${gap}`,
        disabled && "viora-fieldset--disabled",
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {legend ? (
        <legend className="viora-fieldset__legend">{legend}</legend>
      ) : null}
      {children}
    </fieldset>
  );
}

export default Fieldset;