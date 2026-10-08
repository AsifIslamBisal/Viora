import { useEffect, useState } from "react";
import { cx } from "../../utils/cx";
import "./Calendar.css";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const startOfDay = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const clamp = (value, lo, hi) => Math.min(Math.max(value, lo), hi);

export function Calendar({
  value,
  onChange,
  defaultMonth,
  min,
  max,
  disabledDate,
  label = "Calendar",
  className,
  ...rest
}) {
  const seed = defaultMonth || value || new Date();
  const [view, setView] = useState(
    new Date(seed.getFullYear(), seed.getMonth(), 1)
  );
  const [focused, setFocused] = useState(() =>
    value ? value.getDate() : 1
  );

  const month = view.getMonth();
  const year = view.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();
  const viewMin = min ? new Date(min.getFullYear(), min.getMonth(), 1) : null;
  const viewMax = max ? new Date(max.getFullYear(), max.getMonth(), 1) : null;
  const prevDisabled = viewMin ? view <= viewMin : false;
  const nextDisabled = viewMax ? view >= viewMax : false;

  useEffect(() => {
    setFocused((current) => clamp(current, 1, daysInMonth));
    document
      .getElementById(`viora-calendar-${view.getTime()}-${clamp(focused, 1, daysInMonth)}`)
      ?.focus();
  }, [view, daysInMonth, focused]);

  const isDisabled = (day) => {
    const date = new Date(year, month, day);
    const dayStart = startOfDay(date);
    if (min && dayStart < startOfDay(min)) {
      return true;
    }
    if (max && dayStart > startOfDay(max)) {
      return true;
    }
    if (disabledDate?.(date)) {
      return true;
    }
    return false;
  };

  const isSelected = (day) =>
    !!value &&
    value.getFullYear() === year &&
    value.getMonth() === month &&
    value.getDate() === day;

  const changeMonth = (offset) => {
    const next = new Date(year, month + offset, 1);
    setView(next);
    setFocused(clamp(focused, 1, new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate()));
  };

  const moveFocus = (event) => {
    let next;
    switch (event.key) {
      case "ArrowLeft":
        next = focused - 1;
        break;
      case "ArrowRight":
        next = focused + 1;
        break;
      case "ArrowUp":
        next = focused - 7;
        break;
      case "ArrowDown":
        next = focused + 7;
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (!isDisabled(focused)) {
          onChange?.(new Date(year, month, focused));
        }
        return;
      default:
        return;
    }
    event.preventDefault();
    setFocused(clamp(next, 1, daysInMonth));
  };

  const cells = [];
  for (let slot = 0; slot < firstWeekday; slot += 1) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }

  return (
    <div
      role="group"
      aria-label={label}
      className={cx("viora-calendar", className)}
      {...rest}
    >
      <div className="viora-calendar__header">
        <button
          type="button"
          className="viora-calendar__nav"
          aria-label="Previous month"
          disabled={prevDisabled}
          onClick={() => changeMonth(-1)}
        >
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M10 3L5 8l5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="viora-calendar__label" aria-live="polite">
          {MONTHS[month]} {year}
        </span>
        <button
          type="button"
          className="viora-calendar__nav"
          aria-label="Next month"
          disabled={nextDisabled}
          onClick={() => changeMonth(1)}
        >
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div
        role="grid"
        aria-label={`${MONTHS[month]} ${year}`}
        className="viora-calendar__grid"
        onKeyDown={moveFocus}
      >
        {WEEKDAY_LABELS.map((dayLabel) => (
          <div role="columnheader" key={dayLabel} className="viora-calendar__weekday">
            {dayLabel}
          </div>
        ))}

        {cells.map((day, index) => {
          if (day === null) {
            return <div role="gridcell" className="viora-calendar__spacer" key={`blank-${index}`} />;
          }

          const date = new Date(year, month, day);
          const disabled = isDisabled(day);
          return (
            <div role="gridcell" className="viora-calendar__cell" key={day}>
              <button
                type="button"
                id={`viora-calendar-${view.getTime()}-${day}`}
                aria-label={`${WEEKDAYS[date.getDay()]}, ${MONTHS[month]} ${day}, ${year}`}
                aria-selected={isSelected(day)}
                aria-disabled={disabled || undefined}
                disabled={disabled}
                tabIndex={focused === day ? 0 : -1}
                className={cx(
                  "viora-calendar__day",
                  isSelected(day) && "viora-calendar__day--selected"
                )}
                onClick={() => onChange?.(date)}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;