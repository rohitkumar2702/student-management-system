import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import "./Modal.css";

/**
 * Modal
 * @param {boolean} open - controls visibility
 * @param {() => void} onClose - called on backdrop / Esc / close button
 * @param {string} title
 * @param {string} subtitle
 * @param {"sm"|"md"|"lg"} size
 * @param {boolean} closeOnBackdrop
 */
export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer = null,
  size = "md",
  closeOnBackdrop = true,
}) {
  const panelRef = useRef(null);
  const previouslyFocused = useRef(null);

  // Escape key + body scroll lock
  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement;

    const handleKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the modal
    const t = setTimeout(() => {
      if (panelRef.current) {
        const focusable = panelRef.current.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusable?.focus();
      }
    }, 20);

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
      // Restore focus
      if (previouslyFocused.current && previouslyFocused.current.focus) {
        previouslyFocused.current.focus();
      }
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdrop = (e) => {
    if (e.target !== e.currentTarget) return;
    if (closeOnBackdrop) onClose?.();
  };

  return createPortal(
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={handleBackdrop}
    >
      <div
        ref={panelRef}
        className={`modal modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        <header className="modal__header">
          <div className="modal__heading">
            {title && (
              <h2 id="modal-title" className="modal__title">
                {title}
              </h2>
            )}
            {subtitle && <p className="modal__subtitle">{subtitle}</p>}
          </div>
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </header>

        <div className="modal__body">{children}</div>

        {footer && <footer className="modal__footer">{footer}</footer>}
      </div>
    </div>,
    document.body
  );
}