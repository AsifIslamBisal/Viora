import { useState } from "react";
import { cx } from "../../utils/cx";
import "./NotificationBanner.css";

const DEFAULT_ICONS = {
  info: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 9.2v4M10 6.4h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.8 10.2l2.2 2.2 4.2-4.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 3.2L17.5 16H2.5L10 3.2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 8.5v3.4M10 14.2h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  danger: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.5 7.5l5 5M12.5 7.5l-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
};

export function NotificationBanner({
  tone = "info",
  title,
  content,
  children,
  icon,
  dismissible = false,
  onDismiss,
  className,
  ...rest
}) {
  const [dismissed, setDismissed] = useState(false);
  const idBase = `viora-notification-${tone}`;
  const titleId = `${idBase}-title`;

  if (dismissed) {
    return null;
  }

  const role = tone === "warning" || tone === "danger" ? "alert" : "status";

  return (
    <section
      role={role}
      aria-labelledby={title ? titleId : undefined}
      className={cx(
        "viora-notification",
        `viora-notification--${tone}`,
        className
      )}
      {...rest}
    >
      <span className="viora-notification__icon" aria-hidden="true">
        {icon ?? DEFAULT_ICONS[tone]}
      </span>
      <div className="viora-notification__body">
        {title ? (
          <p className="viora-notification__title" id={titleId}>
            {title}
          </p>
        ) : null}
        {content || children ? (
          <div className="viora-notification__content">{content ?? children}</div>
        ) : null}
      </div>
      {dismissible ? (
        <button
          type="button"
          className="viora-notification__close"
          aria-label="Dismiss notification"
          onClick={() => {
            setDismissed(true);
            onDismiss?.();
          }}
        >
          ×
        </button>
      ) : null}
    </section>
  );
}

export default NotificationBanner;