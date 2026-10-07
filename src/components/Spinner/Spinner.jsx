import { cx } from "../../utils/cx";
import "./Spinner.css";

export function Spinner({ size = "md", label = "Loading", className, ...rest }) {
  return (
    <span
      role="status"
      className={cx("viora-spinner", `viora-spinner--${size}`, className)}
      {...rest}
    >
      <span className="viora-spinner__ring" aria-hidden="true" />
      <span className="viora-spinner__label">{label}</span>
    </span>
  );
}

export default Spinner;