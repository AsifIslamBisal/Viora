import { Fragment } from "react";
import { cx } from "../../utils/cx";
import "./Breadcrumb.css";

const DEFAULT_SEPARATOR = (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M6 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Breadcrumb({
  items,
  ariaLabel = "Breadcrumb",
  separator = DEFAULT_SEPARATOR,
  className,
  ...rest
}) {
  return (
    <nav aria-label={ariaLabel} className={cx("viora-breadcrumb", className)} {...rest}>
      <ol className="viora-breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={item.href ?? `${item.label}-${index}`}>
              <li className="viora-breadcrumb__item">
                {!isLast && item.href ? (
                  <a className="viora-breadcrumb__link" href={item.href}>
                    {item.label}
                  </a>
                ) : (
                  <span
                    className="viora-breadcrumb__page"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast ? (
                <span className="viora-breadcrumb__separator" aria-hidden="true">
                  {separator}
                </span>
              ) : null}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;