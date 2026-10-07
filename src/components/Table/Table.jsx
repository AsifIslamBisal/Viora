import { useState } from "react";
import { cx } from "../../utils/cx";
import "./Table.css";

const ARROW_DOWN = (
  <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M2 4l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function sortRows(data, columns, sort) {
  if (!sort) {
    return data;
  }
  const column = columns.find((col) => col.key === sort.key);
  if (!column) {
    return data;
  }
  const { accessor, sort: sorter, key } = column;
  const getValue = (row) =>
    accessor ? accessor(row) : (row[key] ?? "");
  const direction = sort.direction === "desc" ? -1 : 1;
  return [...data].sort((a, b) => {
    const aValue = getValue(a);
    const bValue = getValue(b);
    if (sorter) {
      return sorter(a, b) * direction;
    }
    if (typeof aValue === "number" && typeof bValue === "number") {
      return (aValue - bValue) * direction;
    }
    return String(aValue).localeCompare(String(bValue)) * direction;
  });
}

export function Table({
  columns,
  data,
  caption,
  initialSort,
  striped = false,
  emptyState,
  className,
  ...rest
}) {
  const [sort, setSort] = useState(initialSort ?? null);
  const sortedData = sortRows(data, columns, sort);

  const toggleSort = (column) => {
    setSort((current) =>
      current?.key === column.key && current.direction === "asc"
        ? { key: column.key, direction: "desc" }
        : { key: column.key, direction: "asc" }
    );
  };

  return (
    <table
      className={cx(
        "viora-table",
        striped && "viora-table--striped",
        className
      )}
      {...rest}
    >
      {caption ? <caption className="viora-table__caption">{caption}</caption> : null}
      <thead>
        <tr>
          {columns.map((column) => {
            const sortable = Boolean(column.sortable);
            const sorted =
              sort?.key === column.key ? sort.direction : undefined;
            return (
              <th
                key={column.key}
                scope="col"
                className={cx(
                  "viora-table__th",
                  column.align && `viora-table--align-${column.align}`
                )}
                aria-sort={
                  sorted === "asc"
                    ? "ascending"
                    : sorted === "desc"
                      ? "descending"
                      : undefined
                }
              >
                {sortable ? (
                  <button
                    type="button"
                    className="viora-table__sort"
                    onClick={() => toggleSort(column)}
                  >
                    {column.header}
                    <span
                      className={cx(
                        "viora-table__sort-indicator",
                        sorted === "asc" && "viora-table__sort-indicator--asc",
                        sorted === "desc" && "viora-table__sort-indicator--desc"
                      )}
                    >
                      {ARROW_DOWN}
                    </span>
                  </button>
                ) : (
                  column.header
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {sortedData.length ? (
          sortedData.map((row, rowIndex) => (
            <tr key={row.id ?? `row-${rowIndex}`}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cx(
                    "viora-table__td",
                    column.align && `viora-table--align-${column.align}`
                  )}
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              className="viora-table__empty"
              colSpan={columns.length}
            >
              {emptyState ?? "No data available."}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;