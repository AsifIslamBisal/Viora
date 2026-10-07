import { cx } from "../../utils/cx";
import "./Text.css";

export function Text({
  as: Tag = "p",
  size = "md",
  weight = "normal",
  tone = "default",
  className,
  children,
  ...rest
}) {
  return (
    <Tag
      className={cx(
        "viora-text",
        `viora-text--${size}`,
        `viora-text--weight-${weight}`,
        tone === "muted" && "viora-text--muted",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Text;