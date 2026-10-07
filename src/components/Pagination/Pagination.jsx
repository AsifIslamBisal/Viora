import { cx } from "../../utils/cx";
import "./Pagination.css";

const CHEVRON_LEFT = (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M10 4L6 8l4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CHEVRON_RIGHT = (
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

const ELLIPSIS_KEY = "viora-ellipsis";

function pageItems(page, totalPages, siblingCount) {
  if (totalPages <= 1) {
    return [1];
  }

  const start = Math.max(2, page - siblingCount);
  const end = Math.min(totalPages - 1, page + siblingCount);
  const items = [1];

  if (start > 2) {
    items.push(`${ELLIPSIS_KEY}-start`);
  }
  for (let index = start; index <= end; index += 1) {
    items.push(index);
  }
  if (end < totalPages - 1) {
    items.push(`${ELLIPSIS_KEY}-end`);
  }
  items.push(totalPages);

  return items;
}

export function Pagination({
  page,
  totalPages,
  onChange,
  siblingCount = 1,
  ariaLabel = "Pagination",
  className,
  ...rest
}) {
  const items = pageItems(page, totalPages, siblingCount);

  return (
    <nav
      className={cx("viora-pagination", className)}
      aria-label={ariaLabel}
      {...rest}
    >
      <ul className="viora-pagination__list">
        <li>
          <button
            type="button"
            className="viora-pagination__button viora-pagination__button--nav"
            onClick={() => onChange(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
          >
            {CHEVRON_LEFT}
          </button>
        </li>
        {items.map((item) =>
          typeof item === "string" ? (
            <li key={item} className="viora-pagination__ellipsis" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                className={cx(
                  "viora-pagination__button",
                  item === page && "viora-pagination__button--active"
                )}
                onClick={() => onChange(item)}
                aria-current={item === page ? "page" : undefined}
                aria-label={`Page ${item}`}
              >
                {item}
              </button>
            </li>
          )
        )}
        <li>
          <button
            type="button"
            className="viora-pagination__button viora-pagination__button--nav"
            onClick={() => onChange(page + 1)}
            disabled={page >= totalPages}
            aria-label="Next page"
          >
            {CHEVRON_RIGHT}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;