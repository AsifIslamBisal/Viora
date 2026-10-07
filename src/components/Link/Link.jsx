import { cx } from "../../utils/cx";
import "./Link.css";

export function Link({
  href = "#",
  variant = "default",
  underline = "hover",
  external = false,
  className,
  children,
  ...rest
}) {
  return (
    <a
      href={href}
      className={cx(
        "viora-link",
        variant !== "default" && `viora-link--${variant}`,
        underline !== "hover" && `viora-link--underline-${underline}`,
        className
      )}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

export default Link;