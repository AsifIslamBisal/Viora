import { cx } from "../../utils/cx";
import "./Kbd.css";

export function Kbd({ size = "md", children, className, ...rest }) {
  return (
    <kbd className={cx("viora-kbd", `viora-kbd--${size}`, className)} {...rest}>
      {children}
    </kbd>
  );
}

export default Kbd;