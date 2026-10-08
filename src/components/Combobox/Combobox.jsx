import { useEffect, useId, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import "./Combobox.css";

const normalize = (option) =>
  typeof option === "string" ? { value: option, label: option } : option;

export function Combobox({
  options = [],
  value,
  onChange,
  label,
  hint,
  error,
  placeholder,
  disabled = false,
  className,
  ...rest
}) {
  const boxId = useId();
  const inputId = `${boxId}-input`;
  const listboxId = `${boxId}-listbox`;
  const hintId = `${boxId}-hint`;
  const errorId = `${boxId}-error`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  const items = options.map(normalize);
  const selected = items.find((option) => option.value === value) ?? null;

  const [query, setQuery] = useState(selected?.label ?? "");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef(null);

  const results = query === "" ? items : items.filter((option) =>
    option.label.toLowerCase().includes(query.toLowerCase())
  );

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

  const select = (option) => {
    setQuery(option.label);
    setOpen(false);
    setActiveIndex(0);
    onChange?.(option.value);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        setOpen(true);
        setActiveIndex((current) =>
          results.length ? (current + 1) % results.length : 0
        );
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        setOpen(true);
        setActiveIndex((current) =>
          results.length ? (current - 1 + results.length) % results.length : 0
        );
        break;
      }
      case "Enter": {
        if (open && results[activeIndex]) {
          event.preventDefault();
          select(results[activeIndex]);
        }
        break;
      }
      case "Escape": {
        if (open) {
          event.preventDefault();
          setOpen(false);
          setQuery(selected?.label ?? "");
        }
        break;
      }
      default:
        break;
    }
  };

  const activeOption = open ? results[activeIndex] : undefined;

  return (
    <div ref={wrapperRef} className={cx("viora-field", "viora-combobox", className)}>
      {label ? (
        <label className="viora-field__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={
          activeOption ? `${listboxId}-option-${activeIndex}` : undefined
        }
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cx("viora-input", error && "viora-input--error")}
        placeholder={placeholder}
        value={query}
        disabled={disabled}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          setActiveIndex(0);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        {...rest}
      />
      <ul
        id={listboxId}
        role="listbox"
        aria-label={label || "Options"}
        hidden={!open || results.length === 0}
        className="viora-combobox__listbox"
      >
        {results.map((option, index) => (
          <li
            key={option.value}
            id={`${listboxId}-option-${index}`}
            role="option"
            aria-selected={selected?.value === option.value}
            tabIndex={-1}
            className={cx(
              "viora-combobox__option",
              activeIndex === index && "viora-combobox__option--active",
              selected?.value === option.value && "viora-combobox__option--selected"
            )}
            onMouseDown={(event) => {
              event.preventDefault();
              select(option);
            }}
            onMouseEnter={() => setActiveIndex(index)}
          >
            {option.label}
          </li>
        ))}
      </ul>
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

export default Combobox;