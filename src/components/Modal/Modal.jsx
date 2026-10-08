import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { cx } from "../../utils/cx";
import "./Modal.css";

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Modal({
  open,
  onClose,
  title,
  description,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
  children,
  ...rest
}) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    previouslyFocused.current = document.activeElement;
    dialogRef.current?.focus();
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
      const dialog = dialogRef.current;
      const focusable = dialog.querySelectorAll(FOCUSABLE_SELECTOR);

      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
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
    <div
      className="viora-modal"
      onMouseDown={handleOverlayMouseDown}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cx("viora-modal__dialog", className)}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <header className="viora-modal__header">
          <div>
            <h2 id={titleId} className="viora-modal__title">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="viora-modal__description">
                {description}
              </p>
            ) : null}
          </div>
          {showCloseButton ? (
            <button
              type="button"
              className="viora-modal__close"
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
          ) : null}
        </header>
        <div className="viora-modal__content">{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;