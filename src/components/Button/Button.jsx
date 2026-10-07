import { cx } from "../../utils/cx";
import "./Button.css";

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  type = "button",
  className,
  children,
  ...rest
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={cx(
        "viora-button",
        `viora-button--${variant}`,
        `viora-button--${size}`,
        className
      )}
      disabled={isDisabled}
      aria-busy={loading ? true : undefined}
      {...rest}
    >
      {loading ? (
        <span className="viora-button__spinner" aria-hidden="true" />
      ) : null}
      {children}
    </button>
  );
}

export default Button;
