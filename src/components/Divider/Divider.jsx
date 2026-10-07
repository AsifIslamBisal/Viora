import { cx } from "../../utils/cx";
import "./Divider.css";

export function Divider({
  orientation = "horizontal",
  label,
  className,
  ...rest
}) {
  if (orientation === "vertical") {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        className={cx("viora-divider", "viora-divider--vertical", className)}
        {...rest}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cx("viora-divider", "viora-divider--with-label", className)}
        {...rest}
      >
        <span className="viora-divider__line" aria-hidden="true" />
        <span className="viora-divider__label">{label}</span>
        <span className="viora-divider__line" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cx("viora-divider", className)}
      {...rest}
    />
  );
}

export default Divider;