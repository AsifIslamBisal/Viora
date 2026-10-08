import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { cx } from "../../utils/cx";
import "./CommandPalette.css";

export function CommandPalette({
  open = false,
  onClose,
  groups = [],
  filter,
  placeholder = "Search commands…",
  emptyState = "No commands found.",
  ariaLabel = "Command palette",
  className,
  ...rest
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const matches = (item) => {
    if (!query) {
      return true;
    }
    if (filter) {
      return filter(query, item);
    }
    const haystack = `${item.label} ${(item.keywords ?? []).join(" ")}`;
    return haystack.toLowerCase().includes(query.toLowerCase());
  };

  const filteredGroups = useMemo(
    () =>
      groups
        .map((group) => ({
          name: group.name,
          items: group.items.filter(matches),
        }))
        .filter((group) => group.items.length > 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [groups, query]
  );

  const flatItems = useMemo(
    () => filteredGroups.flatMap((group) => group.items),
    [filteredGroups]
  );

  useEffect(() => {
    setActive(0);
  }, [flatItems.length, query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const run = (item) => {
    item.run?.(item);
    onClose?.();
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    if (key === "ArrowDown" || key === "ArrowUp") {
      event.preventDefault();
      const delta = key === "ArrowDown" ? 1 : -1;
      const count = flatItems.length;
      if (count > 0) {
        setActive((current) => (current + delta + count) % count);
      }
    } else if (key === "Enter") {
      event.preventDefault();
      if (flatItems[active]) {
        run(flatItems[active]);
      }
    } else if (key === "Escape") {
      event.preventDefault();
      onClose?.();
    }
  };

  const activeItem = flatItems[active];

  return createPortal(
    <div className="viora-command" {...rest} onMouseDown={(event) => {
      if (event.target === event.currentTarget) {
        onClose?.();
      }
    }}>
      <div
        className={cx("viora-command__panel", className)}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
      >
        <input
          type="text"
          className="viora-command__input"
          placeholder={placeholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoFocus
          role="combobox"
          aria-expanded="true"
          aria-controls="viora-command-list"
          aria-activedescendant={
            activeItem ? `viora-command-${activeItem.id}` : undefined
          }
        />
        <div
          id="viora-command-list"
          role="listbox"
          className="viora-command__list"
        >
          {flatItems.length === 0 ? (
            <p className="viora-command__empty">{emptyState}</p>
          ) : (
            filteredGroups.map((group) => (
              <div
                key={group.name ?? "ungrouped"}
                role="group"
                aria-label={group.name}
              >
                {group.name ? (
                  <p className="viora-command__group">{group.name}</p>
                ) : null}
                {group.items.map((item) => {
                  const index = flatItems.indexOf(item);
                  const isActive = index === active;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={cx(
                        "viora-command__item",
                        isActive && "viora-command__item--active"
                      )}
                      role="option"
                      id={`viora-command-${item.id}`}
                      aria-selected={isActive}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => run(item)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default CommandPalette;