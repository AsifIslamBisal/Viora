import { cx } from "../../utils/cx";
import "./Toolbar.css";

export function Toolbar({
  ariaLabel,
  orientation = "horizontal",
  className,
  children,
  ...rest
}) {
  return (
    <div
      role="toolbar"
      aria-label={ariaLabel}
      aria-orientation={orientation}
      className={cx(
        "viora-toolbar",
        orientation === "vertical" && "viora-toolbar--vertical",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function ToolbarSeparator({ orientation = "vertical", className, ...rest }) {
  return (
    <span
      role="separator"
      aria-orientation={orientation}
      className={cx(
        "viora-toolbar__separator",
        orientation === "horizontal" && "viora-toolbar__separator--horizontal",
        className
      )}
      {...rest}
    />
  );
}

export default Toolbar;