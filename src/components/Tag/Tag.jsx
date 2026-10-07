import { cx } from "../../utils/cx";
import "./Tag.css";

const REMOVE_LABEL = (fallback) => `Remove ${fallback}`;

export function Tag({
  label,
  variant = "default",
  size = "md",
  onRemove,
  removeLabel,
  className,
  children,
  ...rest
}) {
  const content = children ?? label;
  const name = removeLabel ?? label ?? "Tag";

  return (
    <span
      className={cx(
        "viora-tag",
        variant !== "default" && `viora-tag--${variant}`,
        `viora-tag--${size}`,
        className
      )}
      {...rest}
    >
      <span className="viora-tag__label">{content}</span>
      {onRemove ? (
        <button
          type="button"
          className="viora-tag__remove"
          onClick={onRemove}
          aria-label={REMOVE_LABEL(name)}
        >
          <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M3 3l6 6M9 3L3 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      ) : null}
    </span>
  );
}

export default Tag;