import { cx } from "../../utils/cx";
import "./ButtonGroup.css";

export function ButtonGroup({
  children,
  orientation = "horizontal",
  joined = true,
  ariaLabel,
  className,
  ...rest
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cx(
        "viora-button-group",
        `viora-button-group--${orientation}`,
        joined && "viora-button-group--joined",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export default ButtonGroup;