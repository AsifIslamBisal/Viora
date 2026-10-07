import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cx } from "../../utils/cx";
import "./Toast.css";

const ToastContext = createContext(null);

let nextToastId = 0;

function ToastCard({ toast, onDismiss }) {
  const isAlert =
    toast.variant === "danger" || toast.variant === "warning";

  return (
    <div
      role={isAlert ? "alert" : "status"}
      className={cx(
        "viora-toast",
        toast.variant !== "default" && `viora-toast--${toast.variant}`
      )}
    >
      <div className="viora-toast__body">
        <div className="viora-toast__title">{toast.title}</div>
        {toast.description ? (
          <div className="viora-toast__description">{toast.description}</div>
        ) : null}
      </div>
      <button
        type="button"
        className="viora-toast__close"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M3 3l6 6M9 3L3 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

export function ToastProvider({ children, className, ...rest }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    const timeout = timers.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timers.current.delete(id);
    }
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description, variant = "default", duration = 4000 }) => {
      const id = nextToastId;
      nextToastId += 1;
      setToasts((prev) => [
        ...prev,
        { id, title, description, variant, duration },
      ]);
      if (duration > 0) {
        const timeout = setTimeout(() => dismiss(id), duration);
        timers.current.set(id, timeout);
      }
      return id;
    },
    [dismiss]
  );

  const value = useMemo(() => toast, [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div
          role="region"
          aria-label="Notifications"
          aria-live="polite"
          className={cx("viora-toast__viewport", className)}
          {...rest}
        >
          {toasts.map((item) => (
            <ToastCard
              key={item.id}
              toast={item}
              onDismiss={() => dismiss(item.id)}
            />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const toast = useContext(ToastContext);
  if (toast === null) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return toast;
}

export default ToastProvider;