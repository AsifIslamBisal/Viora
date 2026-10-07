import { cx } from "../../utils/cx";
import "./Label.css";

export function Label({
  size = "md",
  tone = "default",
  className,
  children,
  ...rest
}) {
  return (
    <label
      className={cx(
        "viora-label",
        `viora-label--${size}`,
        tone !== "default" && `viora-label--${tone}`,
        className
      )}
      {...rest}
    >
      {children}
    </label>
  );
}

export default Label;