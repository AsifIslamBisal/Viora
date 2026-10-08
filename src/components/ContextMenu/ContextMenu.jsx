import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cx } from "../../utils/cx";
import "./ContextMenu.css";

export function ContextMenu({
  items = [],
  children,
  ariaLabel = "Context menu",
  className,
  ...rest
}) {
  const [anchor, setAnchor] = useState(null);
  const [active, setActive] = useState(0);
  const menuRef = useRef(null);

  const isFocusable = (item) => !item.disabled && !item.separator;

  const firstEnabled = items.findIndex(isFocusable);

  useEffect(() => {
    if (!anchor) {
      return undefined;
    }
    const handleMouseDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setAnchor(null);
      }
    };
    const handleScroll = () => setAnchor(null);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [anchor]);

  useEffect(() => {
    if (anchor) {
      setActive(Math.max(0, firstEnabled));
      menuRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchor]);

  const openMenu = (event) => {
    event.preventDefault();
    setAnchor({ x: event.clientX, y: event.clientY });
  };

  const close = () => setAnchor(null);

  const selectItem = (index) => {
    const item = items[index];
    if (!item || item.disabled || item.separator) {
      return;
    }
    item.onSelect?.();
    close();
  };

  const step = (from, direction) => {
    for (let offset = 1; offset <= items.length; offset += 1) {
      const index = (((from + direction * offset) % items.length) + items.length) % items.length;
      if (isFocusable(items[index])) {
        return index;
      }
    }
    return from;
  };

  const lastEnabled = () => {
    for (let index = items.length - 1; index >= 0; index -= 1) {
      if (isFocusable(items[index])) {
        return index;
      }
    }
    return 0;
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive(step(active, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive(step(active, -1));
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(Math.max(0, items.findIndex(isFocusable)));
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(lastEnabled());
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectItem(active);
    }
  };

  const menuLeft = Math.min(anchor?.x ?? 0, (window.innerWidth || 0) - 180);
  const menuTop = Math.min(anchor?.y ?? 0, (window.innerHeight || 0) - 220);

  return (
    <div
      className={cx("viora-context-menu", className)}
      {...rest}
      onContextMenu={openMenu}
    >
      {children}
      {anchor
        ? createPortal(
            <div
              ref={menuRef}
              role="menu"
              aria-label={ariaLabel}
              tabIndex={-1}
              className="viora-context-menu__menu"
              style={{ left: menuLeft, top: menuTop }}
              onKeyDown={handleKeyDown}
            >
              {items.map((item, index) =>
                item.separator ? (
                  <div
                    key={index}
                    role="separator"
                    className="viora-context-menu__separator"
                  />
                ) : (
                  <button
                    key={item.id ?? item.label}
                    type="button"
                    role="menuitem"
                    className={cx(
                      "viora-context-menu__item",
                      index === active && "viora-context-menu__item--active"
                    )}
                    disabled={item.disabled}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => selectItem(index)}
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>,
            document.body
          )
        : null}
    </div>
  );
}

export default ContextMenu;