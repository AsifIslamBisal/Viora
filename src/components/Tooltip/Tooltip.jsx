import { Children, cloneElement, useId, useState } from "react";
import { cx } from "../../utils/cx";
import "./Tooltip.css";

export function Tooltip({
  content,
  children,
  placement = "top",
  className,
  ...rest
}) {
  const tooltipId = useId();
  const [open, setOpen] = useState(false);
  const trigger = cloneElement(Children.only(children), {
    "aria-describedby": tooltipId,
  });

  return (
    <div
      className={cx(
        "viora-tooltip",
        `viora-tooltip--${placement}`,
        open && "viora-tooltip--open",
        className
      )}
      {...rest}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {trigger}
      <div
        role="tooltip"
        id={tooltipId}
        className="viora-tooltip__content"
        aria-hidden={open ? "false" : "true"}
      >
        {content}
      </div>
    </div>
  );
}

export default Tooltip;