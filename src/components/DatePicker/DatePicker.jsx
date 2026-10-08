import { useEffect, useId, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import { Calendar } from "../Calendar/Calendar";
import "./DatePicker.css";

const defaultFormat = (date) =>
  `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

export function DatePicker({
  value,
  onChange,
  label,
  hint,
  error,
  placeholder = "Select a date",
  format = defaultFormat,
  min,
  max,
  disabledDate,
  defaultMonth,
  disabled = false,
  className,
  ...rest
}) {
  const id = useId();
  const inputId = `${id}-input`;
  const popoverId = `${id}-popover`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const previousFocus = useRef(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      previousFocus.current = document.activeElement;
      return undefined;
    }

    if (previousFocus.current) {
      previousFocus.current.focus();
      previousFocus.current = null;
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onPointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const toggle = (next) => {
    if (!disabled) {
      setOpen(next);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={cx("viora-field", "viora-date-picker", className)}
    >
      {label ? (
        <label className="viora-field__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}

      <div className="viora-date-picker__control">
        <input
          ref={inputRef}
          id={inputId}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-controls={popoverId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cx("viora-input", error && "viora-input--error")}
          placeholder={placeholder}
          value={value ? format(value) : ""}
          readOnly
          disabled={disabled}
          onClick={() => toggle(!open)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
              event.preventDefault();
              toggle(true);
            }
          }}
          {...rest}
        />
        <svg className="viora-date-picker__icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="2.5" y="4" width="15" height="13" rx="2" stroke="currentColor" />
          <path d="M2.5 8h15M6.5 2v3M13.5 2v3" stroke="currentColor" strokeLinecap="round" />
        </svg>
      </div>

      <div
        id={popoverId}
        role="dialog"
        aria-label="Choose date"
        hidden={!open}
        className="viora-date-picker__popover"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            toggle(false);
          }
        }}
      >
        <Calendar
          value={value}
          onChange={(date) => {
            onChange?.(date);
            toggle(false);
            inputRef.current?.focus();
          }}
          min={min}
          max={max}
          disabledDate={disabledDate}
          defaultMonth={defaultMonth ?? value ?? new Date()}
        />
      </div>

      {hint || error ? (
        <p
          id={error ? errorId : hintId}
          className={cx(
            "viora-field__message",
            error && "viora-field__message--error"
          )}
        >
          {error || hint}
        </p>
      ) : null}
    </div>
  );
}

export default DatePicker;