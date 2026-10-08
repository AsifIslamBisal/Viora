import { cx } from "../../utils/cx";
import "./EmptyState.css";

const DEFAULT_ICON = (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <rect
      x="6"
      y="12"
      width="36"
      height="26"
      rx="4"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M6 20h36M20 14l-2 4m-8-8v0"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export function EmptyState({
  title,
  message,
  children,
  icon,
  action,
  size = "md",
  className,
  ...rest
}) {
  return (
    <div
      className={cx(
        "viora-empty-state",
        `viora-empty-state--${size}`,
        className
      )}
      {...rest}
    >
      <span className="viora-empty-state__icon" aria-hidden="true">
        {icon ?? DEFAULT_ICON}
      </span>
      {title ? <h3 className="viora-empty-state__title">{title}</h3> : null}
      {message || children ? (
        <p className="viora-empty-state__message">{message ?? children}</p>
      ) : null}
      {action ? <div className="viora-empty-state__action">{action}</div> : null}
    </div>
  );
}

export default EmptyState;