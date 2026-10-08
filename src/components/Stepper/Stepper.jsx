import { useState } from "react";
import { cx } from "../../utils/cx";
import "./Stepper.css";

const STEP_STATUSES = ["upcoming", "completed", "current"];

export function Stepper({
  steps = [],
  current,
  defaultCurrent = 0,
  onChange,
  orientation = "horizontal",
  ariaLabel = "Progress steps",
  className,
  ...rest
}) {
  const [internalCurrent, setInternalCurrent] = useState(defaultCurrent);
  const isControlled = current !== undefined;
  const activeIndex = isControlled
    ? Math.max(0, Math.min(current, steps.length - 1))
    : internalCurrent;

  const goTo = (index) => {
    if (!isControlled) {
      setInternalCurrent(index);
    }
    onChange?.(index);
  };

  if (steps.length === 0) {
    return null;
  }

  return (
    <nav
      role="navigation"
      aria-label={ariaLabel}
      className={cx(
        "viora-stepper",
        `viora-stepper--${orientation}`,
        className
      )}
      {...rest}
    >
      <ol className="viora-stepper__list">
        {steps.map((step, index) => {
          const status =
            STEP_STATUSES[index < activeIndex ? 1 : index === activeIndex ? 2 : 0];
          return (
            <li
              key={step.id ?? `${step.label}-${index}`}
              className={cx(
                "viora-stepper__item",
                `viora-stepper__item--${status}`
              )}
            >
              <button
                type="button"
                className="viora-stepper__step"
                aria-current={status === "current" ? "step" : undefined}
                onClick={() => goTo(index)}
              >
                <span className="viora-stepper__badge" aria-hidden="true">
                  {status === "completed" ? (
                    <svg viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6.5l2.5 2.5 4.5-5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </span>
                <span className="viora-stepper__text">
                  <span className="viora-stepper__label">{step.label}</span>
                  {step.description ? (
                    <span className="viora-stepper__description">
                      {step.description}
                    </span>
                  ) : null}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Stepper;