import { useEffect, useMemo, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import "./MultiSelect.css";

const normalizeOptions = (options) =>
  options.map((option) =>
    typeof option === "string"
      ? { value: option, label: option }
      : { value: option.value, label: option.label }
  );

export function MultiSelect({
  id,
  label,
  hint,
  error,
  options = [],
  value = [],
  onChange,
  placeholder = "Select items…",
  disabled = false,
  className,
  ...rest
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const hintId = `${id ?? "viora-multi"}-hint`;
  const errorId = `${id ?? "viora-multi"}-error`;

  const entries = useMemo(() => normalizeOptions(options), [options]);
  const selectedSet = useMemo(() => new Set(value), [value]);

  useEffect(() => {
    if (open) {
      setActive(0);
    }
  }, [open]);

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

  const toggleValue = (entry) => {
    const next = new Set(selectedSet);
    if (next.has(entry.value)) {
      next.delete(entry.value);
    } else {
      next.add(entry.value);
    }
    onChange?.(Array.from(next));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (event.key === "ArrowDown" && !open) {
      event.preventDefault();
      setOpen(true);
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (open && entries.length > 0) {
        event.preventDefault();
        const delta = event.key === "ArrowDown" ? 1 : -1;
        setActive((current) => (current + delta + entries.length) % entries.length);
      }
    }
  };

  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div
      ref={rootRef}
      className={cx("viora-field", "viora-multi", className)}
      {...rest}
      onKeyDown={handleKeyDown}
    >
      {label ? (
        <span className="viora-field__label" id={`${id ?? "viora-multi"}-label`}>
          {label}
        </span>
      ) : null}

      <button
        ref={triggerRef}
        type="button"
        className="viora-multi__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? "viora-multi-list" : undefined}
        aria-activedescendant={
          open && entries[active] ? `viora-multi-${entries[active].value}` : undefined
        }
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        disabled={disabled}
        onClick={() => setOpen((value_) => !value_)}
      >
        {value.length > 0 ? `${value.length} selected` : placeholder}
      </button>

      {value.length > 0 ? (
        <ul className="viora-multi__chips">
          {value.map((selectedValue) => {
            const entry = entries.find((item) => item.value === selectedValue);
            const chipLabel = entry?.label ?? selectedValue;
            return (
              <li key={selectedValue} className="viora-multi__chip">
                <span>{chipLabel}</span>
                <button
                  type="button"
                  aria-label={`Remove ${chipLabel}`}
                  disabled={disabled}
                  onClick={() => toggleValue({ value: selectedValue, label: chipLabel })}
                >
                  ×
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      {open ? (
        <ul
          id="viora-multi-list"
          role="listbox"
          aria-multiselectable="true"
          aria-label={label ?? "Options"}
          className="viora-multi__popover"
        >
          {entries.length === 0 ? (
            <li className="viora-multi__empty">No options</li>
          ) : (
            entries.map((entry, index) => {
              const selected = selectedSet.has(entry.value);
              return (
                <li key={entry.value} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    id={`viora-multi-${entry.value}`}
                    className={cx(
                      "viora-multi__option",
                      index === active && "viora-multi__option--active",
                      selected && "viora-multi__option--selected"
                    )}
                    onClick={() => toggleValue(entry)}
                    onMouseEnter={() => setActive(index)}
                  >
                    <span className="viora-multi__check" aria-hidden="true">
                      {selected ? "✓" : ""}
                    </span>
                    {entry.label}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      ) : null}

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

export default MultiSelect;