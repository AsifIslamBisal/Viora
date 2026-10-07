import { cx } from "../../utils/cx";
import "./Avatar.css";

const AVATAR_TONES = 5;

function toneFor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return (hash % AVATAR_TONES) + 1;
}

function initialsFor(name) {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({
  src,
  alt,
  name,
  initials,
  size = "md",
  status,
  className,
  ...rest
}) {
  const resolvedAlt = alt ?? name ?? "Avatar";
  const tone = name ? toneFor(name) : 1;

  if (src) {
    return (
      <span
        className={cx(
          "viora-avatar",
          `viora-avatar--${size}`,
          status && `viora-avatar--status-${status}`,
          className
        )}
        {...rest}
      >
        <img src={src} alt={resolvedAlt} className="viora-avatar__image" />
        {status ? (
          <span
            className="viora-avatar__status"
            aria-hidden="true"
          />
        ) : null}
      </span>
    );
  }

  const resolvedInitials = initials || (name ? initialsFor(name) : "");

  return (
    <span
      role="img"
      aria-label={resolvedAlt}
      className={cx(
        "viora-avatar",
        `viora-avatar--${size}`,
        `viora-avatar--tone-${tone}`,
        status && `viora-avatar--status-${status}`,
        className
      )}
      {...rest}
    >
      {resolvedInitials ? (
        <span className="viora-avatar__initials" aria-hidden="true">
          {resolvedInitials}
        </span>
      ) : (
        <svg
          className="viora-avatar__icon"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="8"
            r="4"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      )}
      {status ? (
        <span
          className="viora-avatar__status"
          aria-hidden="true"
        />
      ) : null}
    </span>
  );
}

export default Avatar;