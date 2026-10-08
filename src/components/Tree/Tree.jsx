import { useEffect, useMemo, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import "./Tree.css";

const Chevron = () => (
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

export function Tree({
  items = [],
  ariaLabel,
  expanded,
  defaultExpanded = [],
  onToggle,
  selected,
  onSelect,
  className,
  ...rest
}) {
  const [internalExpanded, setInternalExpanded] =
    useState(defaultExpanded);
  const [focusedId, setFocusedId] = useState(null);
  const treeRef = useRef(null);

  const isControlled = expanded !== undefined;
  const activeExpanded = isControlled ? expanded : internalExpanded;

  const toggle = (id) => {
    if (isControlled) {
      onToggle?.(id);
      return;
    }
    setInternalExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const rows = useMemo(() => {
    const walking = [];
    const walk = (nodes, level, parent) => {
      for (const node of nodes) {
        const hasChildren = Boolean(node.children?.length);
        const isOpen = activeExpanded.includes(node.id);
        walking.push({
          id: node.id,
          label: node.label,
          level,
          parent,
          hasChildren,
          isOpen,
        });
        if (hasChildren && isOpen) {
          walk(node.children, level + 1, node.id);
        }
      }
    };
    walk(items, 0, null);
    return walking;
  }, [items, activeExpanded]);

  useEffect(() => {
    setFocusedId((current) => current ?? rows[0]?.id ?? null);
  }, [rows]);

  useEffect(() => {
    if (focusedId) {
      document.getElementById(`viora-tree-${focusedId}`)?.focus();
    }
  }, [focusedId]);

  const handleKeyDown = (event) => {
    const rowEls = Array.from(
      treeRef.current?.querySelectorAll('[role="treeitem"]') ?? []
    );
    const index = rowEls.findIndex((el) => el === document.activeElement);
    if (index === -1) {
      return;
    }
    const row = rows[index];

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (index < rowEls.length - 1) {
          setFocusedId(rows[index + 1].id);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (index > 0) {
          setFocusedId(rows[index - 1].id);
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (row.hasChildren && !row.isOpen) {
          toggle(row.id);
        } else if (row.hasChildren && row.isOpen) {
          const child = rows.find(
            (candidate) =>
              candidate.parent === row.id && candidate.level === row.level + 1
          );
          if (child) {
            setFocusedId(child.id);
          }
        }
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (row.hasChildren && row.isOpen) {
          toggle(row.id);
        } else if (row.parent) {
          setFocusedId(row.parent);
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        onSelect?.(row.id);
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={treeRef}
      role="tree"
      aria-label={ariaLabel}
      className={cx("viora-tree", className)}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {rows.map((row) => (
        <div
          key={row.id}
          id={`viora-tree-${row.id}`}
          role="treeitem"
          aria-label={row.label}
          aria-level={row.level + 1}
          aria-expanded={row.hasChildren ? row.isOpen : undefined}
          aria-selected={selected === row.id}
          tabIndex={focusedId === row.id ? 0 : -1}
          className={cx(
            "viora-tree__item",
            row.hasChildren && "viora-tree__item--branch",
            selected === row.id && "viora-tree__item--selected"
          )}
          style={{ paddingLeft: 4 + row.level * 20 }}
          onClick={() => onSelect?.(row.id)}
          onFocus={() => setFocusedId(row.id)}
        >
          <button
            type="button"
            aria-label={
              row.hasChildren
                ? row.isOpen
                  ? `Collapse ${row.label}`
                  : `Expand ${row.label}`
                : undefined
            }
            disabled={!row.hasChildren}
            className={cx(
              "viora-tree__toggle",
              row.hasChildren && row.isOpen && "viora-tree__toggle--open"
            )}
            onClick={(event) => {
              if (row.hasChildren) {
                event.stopPropagation();
                toggle(row.id);
              }
            }}
          >
            <Chevron />
          </button>
          <span className="viora-tree__label">{row.label}</span>
        </div>
      ))}
    </div>
  );
}

export default Tree;