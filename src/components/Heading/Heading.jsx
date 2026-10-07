import { cx } from "../../utils/cx";
import "./Heading.css";

export function Heading({ level = 1, className, children, ...rest }) {
  const Tag = `h${level}`;

  return (
    <Tag className={cx("viora-heading", `viora-heading--${level}`, className)} {...rest}>
      {children}
    </Tag>
  );
}

export default Heading;