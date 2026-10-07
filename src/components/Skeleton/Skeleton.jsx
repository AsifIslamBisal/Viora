import { cx } from "../../utils/cx";
import "./Skeleton.css";

export function Skeleton({
  variant = "text",
  width,
  height,
  className,
  style,
  ...rest
}) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "viora-skeleton",
        `viora-skeleton--${variant}`,
        className
      )}
      style={{
        ...(width !== undefined
          ? { width: typeof width === "number" ? `${width}px` : width }
          : {}),
        ...(height !== undefined
          ? { height: typeof height === "number" ? `${height}px` : height }
          : {}),
        ...style,
      }}
      {...rest}
    >
      <span className="viora-skeleton__shimmer" aria-hidden="true" />
    </span>
  );
}

export default Skeleton;