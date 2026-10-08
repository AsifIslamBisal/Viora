import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { cx } from "../../utils/cx";
import "./Drawer.css";

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Drawer({
  open,
  onClose,
  title,
  description,
  placement = "right",
  width = "400px",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  children,
  ...rest
}) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    previouslyFocused.current = document.activeElement;
    panelRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    };
  }, [open]);

  if (!open) {
    return null;
  }

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      const panel = panelRef.current;
      const focusable = panel.querySelectorAll(FOCUSABLE_SELECTOR);

      if (!focusable.length) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }

    if (closeOnEscape && event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };

  const handleOverlayMouseDown = (event) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="viora-drawer" onMouseDown={handleOverlayMouseDown}>
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cx(
          "viora-drawer__panel",
          `viora-drawer__panel--${placement}`,
          className
        )}
        style={{ width }}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <header className="viora-drawer__header">
          <div>
            <h2 id={titleId} className="viora-drawer__title">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="viora-drawer__description">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            className="viora-drawer__close"
            aria-label="Close"
            onClick={onClose}
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M6 6l8 8M14 6l-8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>
        <div className="viora-drawer__content">{children}</div>
      </aside>
    </div>,
    document.body
  );
}

export default Drawer;