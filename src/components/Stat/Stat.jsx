import { cx } from "../../utils/cx";
import "./Stat.css";

const ARROW_UP = (
  <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M6 10V2M3 5l3-3 3 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ARROW_DOWN = (
  <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M6 2v8M3 7l3 3 3-3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Stat({
  label,
  value,
  delta,
  trend,
  prefix,
  suffix,
  className,
  ...rest
}) {
  return (
    <div className={cx("viora-stat", className)} {...rest}>
      <span className="viora-stat__label">{label}</span>
      <div className="viora-stat__value">
        {prefix ? <span className="viora-stat__prefix">{prefix}</span> : null}
        {value}
        {suffix ? <span className="viora-stat__suffix">{suffix}</span> : null}
      </div>
      {delta ? (
        <span
          className={cx(
            "viora-stat__delta",
            trend === "down" ? "viora-stat__delta--down" : "viora-stat__delta--up"
          )}
        >
          {trend === "down" ? ARROW_DOWN : ARROW_UP}
          {delta}
        </span>
      ) : null}
    </div>
  );
}

export default Stat;