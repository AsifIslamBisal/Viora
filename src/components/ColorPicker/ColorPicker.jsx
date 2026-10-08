import { useEffect, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import "./ColorPicker.css";

const DEFAULT_COLORS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#14b8a6",
  "#06b6d4",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#ec4899",
  "#f43f5e",
];

const HEX_PATTERN = /^#([0-9a-fA-F]{6})$/;

export function ColorPicker({
  id,
  label,
  hint,
  error,
  value = "#3b82f6",
  onChange,
  colors = DEFAULT_COLORS,
  disabled = false,
  className,
  ...rest
}) {
  const [open, setOpen] = useState(false);
  const [hex, setHex] = useState(value);
  const [hexError, setHexError] = useState(null);
  const rootRef = useRef(null);
  const hintId = `${id ?? "viora-color"}-hint`;
  const errorId = `${id ?? "viora-color"}-error`;

  useEffect(() => {
    setHex(value);
    setHexError(null);
  }, [value]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const handleMouseDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [open]);

  const commitHex = () => {
    const trimmed = hex.trim();
    if (HEX_PATTERN.test(trimmed)) {
      setHexError(null);
      onChange?.(trimmed.toLowerCase());
      setOpen(false);
    } else {
      setHexError(`${trimmed || hex} isn't a valid hex color`);
    }
  };

  return (
    <div
      ref={rootRef}
      className={cx("viora-field", "viora-color-picker", className)}
      {...rest}
    >
      {label ? (
        <span className="viora-field__label" id={`${id ?? "viora-color"}-label`}>
          {label}
        </span>
      ) : null}
      <button
        type="button"
        className="viora-color-picker__trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((value_) => !value_)}
      >
        <span
          className="viora-color-picker__swatch"
          style={{ backgroundColor: value }}
          aria-hidden="true"
        />
        <span className="viora-color-picker__value">{value}</span>
      </button>
      {hint || error || hexError ? (
        <p
          id={hexError ? errorId : error ? errorId : hintId}
          className={cx(
            "viora-field__message",
            (error || hexError) && "viora-field__message--error"
          )}
        >
          {error || hexError || hint}
        </p>
      ) : null}

      {open ? (
        <div
          className="viora-color-picker__popover"
          role="dialog"
          aria-label={`${label ?? "Color"} picker`}
          aria-modal="false"
        >
          <div className="viora-color-picker__grid">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                className="viora-color-picker__preset"
                aria-label={color}
                aria-pressed={value === color}
                style={{ backgroundColor: color }}
                onClick={() => {
                  onChange?.(color);
                  setOpen(false);
                }}
              />
            ))}
          </div>
          <div className="viora-color-picker__custom">
            <input
              type="color"
              className="viora-color-picker__native"
              aria-label="Pick a custom color"
              value={value}
              disabled={disabled}
              onChange={(event) => onChange?.(event.target.value)}
            />
            <input
              type="text"
              className={cx("viora-input", hexError && "viora-input--error")}
              aria-label="Hex color"
              aria-invalid={hexError ? true : undefined}
              spellCheck="false"
              value={hex}
              disabled={disabled}
              onChange={(event) => setHex(event.target.value)}
              onBlur={commitHex}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  commitHex();
                }
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ColorPicker;