import { cx } from "../../utils/cx";
import "./Slider.css";

export function Slider({
  value = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  label,
  tone = "default",
  showValue = false,
  disabled = false,
  className,
  ...rest
}) {
  const percent = Math.min(
    Math.max(((value - min) / (max - min || 1)) * 100, 0),
    100
  );

  const fillColor = {
    default: "var(--viora-primary)",
    success: "var(--viora-success)",
    warning: "var(--viora-warning)",
    danger: "var(--viora-danger)",
  }[tone];

  return (
    <div
      className={cx(
        "viora-slider",
        tone !== "default" && `viora-slider--${tone}`,
        disabled && "viora-slider--disabled",
        className
      )}
    >
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange?.(Number(event.target.value))}
        disabled={disabled}
        aria-label={label}
        className="viora-slider__input"
        style={{
          "--viora-slider-progress": `${percent}%`,
          "--viora-slider-fill": fillColor,
        }}
        {...rest}
      />
      {showValue ? (
        <span className="viora-slider__value">{value}</span>
      ) : null}
    </div>
  );
}

export default Slider;