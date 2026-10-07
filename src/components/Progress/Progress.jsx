import { cx } from "../../utils/cx";
import "./Progress.css";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function Progress({
  value = 0,
  min = 0,
  max = 100,
  label,
  tone = "default",
  size = "md",
  showValue = false,
  indeterminate = false,
  className,
  ...rest
}) {
  const ratio = clamp(value, min, max) / (max - min || 1);
  const percent = ratio * 100;

  return (
    <div
      className={cx(
        "viora-progress",
        `viora-progress--${size}`,
        tone !== "default" && `viora-progress--${tone}`,
        indeterminate && "viora-progress--indeterminate",
        className
      )}
      {...rest}
    >
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : Math.round(percent)}
        className="viora-progress__track"
      >
        <div
          className="viora-progress__fill"
          style={{ width: `${percent}%` }}
        />
      </div>
      {showValue ? (
        <span className="viora-progress__value">
          {Math.round(percent)}%
        </span>
      ) : null}
    </div>
  );
}

export default Progress;