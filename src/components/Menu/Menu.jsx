import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import "./Menu.css";

export function Menu({
  trigger,
  items = [],
  label = "Menu options",
  align = "start",
  closeOnSelect = true,
  className,
  ...rest
}) {
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState(null);
  const menuId = useId();
  const panelId = `${menuId}-menu`;
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const itemRefs = useRef(new Map());

  const menuItems = items
    .map((item, index) => ({ ...item, key: item.key ?? `item-${index}` }))
    .filter((item) => !item.separator && !item.disabled);

  const close = useCallback(() => {
    setOpen(false);
    setActiveKey(null);
  }, []);

  useEffect(() => {
    function onPointerDown(event) {
      if (
        panelRef.current?.contains(event.target) ||
        triggerRef.current?.contains(event.target)
      ) {
        return;
      }
      close();
    }

    function onKeyDown(event) {
      if (event.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    }

    if (open) {
      document.addEventListener("pointerdown", onPointerDown);
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("pointerdown", onPointerDown);
        document.removeEventListener("keydown", onKeyDown);
      };
    }
    return undefined;
  }, [open, close]);

  useEffect(() => {
    if (open && activeKey) {
      itemRefs.current.get(activeKey)?.focus();
    }
  }, [open, activeKey]);

  const openMenu = () => {
    setOpen(true);
    const first = menuItems[0];
    if (first) {
      setActiveKey(first.key);
    }
  };

  const onPanelKeyDown = (event) => {
    if (!menuItems.length) {
      return;
    }
    const currentIndex = menuItems.findIndex((item) => item.key === activeKey);
    let index;

    if (event.key === "ArrowDown") {
      index = (currentIndex + 1) % menuItems.length;
    } else if (event.key === "ArrowUp") {
      index =
        (currentIndex - 1 + menuItems.length) % menuItems.length;
    } else if (event.key === "Home") {
      index = 0;
    } else if (event.key === "End") {
      index = menuItems.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveKey(menuItems[index].key);
  };

  return (
    <div
      className={cx(
        "viora-menu",
        align === "end" && "viora-menu--align-end",
        className
      )}
      {...rest}
    >
      <button
        type="button"
        ref={triggerRef}
        className="viora-menu__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? close() : openMenu())}
      >
        {trigger}
      </button>
      {open ? (
        <div
          id={panelId}
          ref={panelRef}
          role="menu"
          aria-label={label}
          className="viora-menu__panel"
          onKeyDown={onPanelKeyDown}
        >
          <ul className="viora-menu__list">
            {items.map((item, index) => {
              if (item.separator) {
                return (
                  <li
                    key={`separator-${index}`}
                    role="none"
                    className="viora-menu__row"
                  >
                    <span
                      role="separator"
                      className="viora-menu__separator"
                    />
                  </li>
                );
              }

              const itemKey = item.key ?? `item-${index}`;
              const commonProps = {
                role: "menuitem",
                ref: (el) => {
                  if (el) {
                    itemRefs.current.set(itemKey, el);
                  }
                },
                tabIndex: activeKey === itemKey ? 0 : -1,
                onMouseEnter: () => {
                  if (!item.disabled) {
                    setActiveKey(itemKey);
                  }
                },
                className: cx(
                  "viora-menu__item",
                  item.variant === "danger" && "viora-menu__item--danger",
                  item.disabled && "viora-menu__item--disabled"
                ),
              };

              if (item.disabled) {
                return (
                  <li key={itemKey} role="none" className="viora-menu__row">
                    <span {...commonProps} aria-disabled="true">
                      {item.label}
                    </span>
                  </li>
                );
              }

              if (item.href) {
                return (
                  <li key={itemKey} role="none" className="viora-menu__row">
                    <a
                      {...commonProps}
                      href={item.href}
                      onClick={() => {
                        item.onClick?.();
                        if (closeOnSelect) {
                          close();
                        }
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              }

              return (
                <li key={itemKey} role="none" className="viora-menu__row">
                  <button
                    {...commonProps}
                    type="button"
                    onClick={() => {
                      item.onClick?.();
                      if (closeOnSelect) {
                        close();
                      }
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default Menu;