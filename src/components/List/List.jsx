import { cx } from "../../utils/cx";
import "./List.css";

export function List({
  variant = "unordered",
  spacing = "md",
  items,
  className,
  children,
  ...rest
}) {
  const isOrdered = variant === "ordered";
  const Tag = isOrdered ? "ol" : "ul";

  return (
    <Tag
      className={cx(
        "viora-list",
        `viora-list--${variant}`,
        `viora-list--spacing-${spacing}`,
        className
      )}
      {...rest}
    >
      {items
        ? items.map((item, index) => (
            <li className="viora-list__item" key={index}>
              {item}
            </li>
          ))
        : children}
    </Tag>
  );
}

export default List;