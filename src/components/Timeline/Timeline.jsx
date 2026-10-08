import { cx } from "../../utils/cx";
import "./Timeline.css";

export function Timeline({
  items = [],
  align = "start",
  ariaLabel = "Timeline",
  className,
  ...rest
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ol
      role="list"
      aria-label={ariaLabel}
      className={cx(
        "viora-timeline",
        `viora-timeline--${align}`,
        className
      )}
      {...rest}
    >
      {items.map((item, index) => (
        <li
          key={item.id ?? `${item.title}-${index}`}
          className={cx(
            "viora-timeline__item",
            index === items.length - 1 && "viora-timeline__item--last"
          )}
        >
          <span className="viora-timeline__dot" aria-hidden="true">
            {item.icon ? <span className="viora-timeline__icon">{item.icon}</span> : null}
          </span>
          <div className="viora-timeline__body">
            <div className="viora-timeline__header">
              {item.title ? <p className="viora-timeline__title">{item.title}</p> : null}
              {item.date ? <time className="viora-timeline__date">{item.date}</time> : null}
            </div>
            {item.content ? (
              <p className="viora-timeline__content">{item.content}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default Timeline;