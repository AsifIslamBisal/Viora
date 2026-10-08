import { useEffect, useMemo, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import "./DataGrid.css";

const SORT_ICONS = {
  asc: (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M6 9.5V2.5M3.5 5l2.5-2.5L8.5 5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  desc: (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M6 2.5v7M3.5 7l2.5 2.5L8.5 7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const defaultSorter = (a, b, key) => {
  const av = a[key];
  const bv = b[key];
  if (typeof av === "number" && typeof bv === "number") {
    return av - bv;
  }
  return String(av ?? "").localeCompare(String(bv ?? ""));
};

export function DataGrid({
  columns = [],
  data = [],
  rowKey = "id",
  pageSize = 10,
  initialSort,
  selectable = false,
  selected,
  onSelectionChange,
  caption,
  emptyState = "No rows to display",
  striped = false,
  className,
  ...rest
}) {
  const [sortState, setSortState] = useState(initialSort ?? { key: null, dir: "asc" });
  const [page, setPage] = useState(0);
  const [internalSelected, setInternalSelected] = useState([]);
  const selectAllRef = useRef(null);

  const isSelectionControlled = selected !== undefined;
  const activeSelected = isSelectionControlled ? selected : internalSelected;
  const selectedSet = useMemo(
    () => new Set(activeSelected),
    [activeSelected]
  );

  const commitSelection = (ids) => {
    if (!isSelectionControlled) {
      setInternalSelected(ids);
    }
    onSelectionChange?.(ids);
  };

  const sorted = useMemo(() => {
    if (!sortState.key) {
      return data;
    }
    const column = columns.find((c) => c.key === sortState.key);
    const compare = column?.sorter ?? defaultSorter;
    const direction = sortState.dir === "asc" ? 1 : -1;
    return [...data].sort((a, b) => compare(a, b, column.key) * direction);
  }, [data, columns, sortState]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages - 1);
  const pageStart = safePage * pageSize;
  const pageRows = sorted.slice(pageStart, pageStart + pageSize);

  useEffect(() => {
    if (selectAllRef.current) {
      const some = pageRows.some((row) => selectedSet.has(row[rowKey]));
      const all = pageRows.length > 0 && pageRows.every((row) => selectedSet.has(row[rowKey]));
      selectAllRef.current.indeterminate = some && !all;
    }
  }, [pageRows, selectedSet, rowKey]);

  const toggleSort = (key) => {
    setPage(0);
    setSortState((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  };

  const toggleRow = (id) => {
    const next = new Set(selectedSet);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    commitSelection(Array.from(next));
  };

  const toggleAllOnPage = () => {
    const ids = pageRows.map((row) => row[rowKey]);
    const allSelected =
      ids.length > 0 && ids.every((id) => selectedSet.has(id));
    const next = new Set(selectedSet);
    ids.forEach((id) => (allSelected ? next.delete(id) : next.add(id)));
    commitSelection(Array.from(next));
  };

  const ariaSort = (key) =>
    sortState.key === key
      ? sortState.dir === "asc"
        ? "ascending"
        : "descending"
      : "none";

  if (!pageRows.length) {
    return (
      <div className={cx("viora-data-grid", className)} {...rest}>
        {caption ? <p className="viora-data-grid__caption">{caption}</p> : null}
        <div className="viora-data-grid__empty">{emptyState}</div>
      </div>
    );
  }

  return (
    <div className={cx("viora-data-grid", className)} {...rest}>
      {caption ? <p className="viora-data-grid__caption">{caption}</p> : null}

      <div className="viora-data-grid__table-wrap">
        <table
          className={cx("viora-data-grid__table", striped && "viora-data-grid__table--striped")}
        >
          <thead>
            <tr>
              {selectable ? (
                <th scope="col" className="viora-data-grid__check-cell">
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    aria-label="Select all"
                    checked={
                      pageRows.length > 0 &&
                      pageRows.every((row) => selectedSet.has(row[rowKey]))
                    }
                    onChange={toggleAllOnPage}
                  />
                </th>
              ) : null}
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  align={column.align}
                  aria-sort={column.sortable ? ariaSort(column.key) : undefined}
                  className={cx(
                    column.sortable &&
                      "viora-data-grid__header-sortable"
                  )}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      className="viora-data-grid__sort"
                      onClick={() => toggleSort(column.key)}
                    >
                      {column.header}
                      <span className="viora-data-grid__sort-icon">
                        {sortState.key === column.key && SORT_ICONS[sortState.dir]}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => {
              const id = row[rowKey];
              return (
                <tr key={id}>
                  {selectable ? (
                    <td className="viora-data-grid__check-cell">
                      <input
                        type="checkbox"
                        aria-label={`Select row ${id}`}
                        checked={selectedSet.has(id)}
                        onChange={() => toggleRow(id)}
                      />
                    </td>
                  ) : null}
                  {columns.map((column) => (
                    <td key={column.key} align={column.align}>
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="viora-data-grid__footer">
        <span className="viora-data-grid__summary" aria-live="polite">
          {sorted.length === 0
            ? "0 rows"
            : `${pageStart + 1}–${pageStart + pageRows.length} of ${sorted.length}`}
        </span>
        <nav className="viora-data-grid__nav" aria-label="Pagination">
          <button
            type="button"
            className="viora-data-grid__nav-button"
            aria-label="Previous page"
            disabled={safePage === 0}
            onClick={() => setPage(safePage - 1)}
          >
            Previous
          </button>
          <span className="viora-data-grid__page">
            Page {safePage + 1} of {totalPages}
          </span>
          <button
            type="button"
            className="viora-data-grid__nav-button"
            aria-label="Next page"
            disabled={safePage >= totalPages - 1}
            onClick={() => setPage(safePage + 1)}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}

export default DataGrid;