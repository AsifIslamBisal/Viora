import { cx } from "../../utils/cx";
import "./Badge.css";

export function Badge({
  variant = "secondary",
  size = "md",
  dot = false,
  className,
  children,
  ...rest
}) {
  return (
    <span
      className={cx(
        "viora-badge",
        `viora-badge--${variant}`,
        `viora-badge--${size}`,
        className
      )}
      {...rest}
    >
      {dot ? <span className="viora-badge__dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

export default Badge;