import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import "./AlertDialog.css";

export function AlertDialog({
  open,
  onClose,
  title,
  description,
  message,
  children,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  onConfirm,
  dangerConfirm = false,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  ...rest
}) {
  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      role="alertdialog"
      showCloseButton={false}
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEscape={closeOnEscape}
      className={className}
      {...rest}
    >
      <div className="viora-alert-dialog">
        {message || children ? (
          <div className="viora-alert-dialog__body">{message ?? children}</div>
        ) : null}
        <div className="viora-alert-dialog__footer">
          <Button type="button" variant="secondary" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={dangerConfirm ? "danger" : "primary"}
            onClick={handleConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AlertDialog;