import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";
import "./ConfirmDialog.css";

/**
 * ConfirmDialog
 * @param {boolean} open
 * @param {() => void} onClose
 * @param {() => void} onConfirm
 * @param {string} title
 * @param {string|React.ReactNode} description
 * @param {string} confirmLabel
 * @param {string} cancelLabel
 * @param {"danger"|"primary"} tone
 * @param {boolean} loading
 */
export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "danger",
  loading = false,
}) {
  return (
    <Modal
      open={open}
      onClose={loading ? () => {} : onClose}
      size="sm"
      closeOnBackdrop={!loading}
      footer={
        <>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={tone === "danger" ? "danger" : "primary"}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="confirm-dialog">
        <div
          className={`confirm-dialog__icon confirm-dialog__icon--${tone}`}
          aria-hidden="true"
        >
          <AlertTriangle size={22} />
        </div>
        <div className="confirm-dialog__content">
          <h2 className="confirm-dialog__title">{title}</h2>
          {description && (
            <div className="confirm-dialog__description">{description}</div>
          )}
        </div>
      </div>
    </Modal>
  );
}