import { cx } from "../../utils/cx";
import "./Card.css";

export function Card({
  title,
  description,
  footer,
  padding = "lg",
  className,
  children,
  ...rest
}) {
  return (
    <div
      className={cx(
        "viora-card",
        `viora-card--padding-${padding}`,
        className
      )}
      {...rest}
    >
      {title ? (
        <div className="viora-card__header">
          <h3 className="viora-card__title">{title}</h3>
          {description ? (
            <p className="viora-card__description">{description}</p>
          ) : null}
        </div>
      ) : null}
      <div className="viora-card__content">{children}</div>
      {footer ? <div className="viora-card__footer">{footer}</div> : null}
    </div>
  );
}

export default Card;