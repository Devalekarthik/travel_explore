import React from "react";

/**
 * Reusable Bootstrap Modal Component
 * Wraps Bootstrap modal structure for consistent modal usage
 * 
 * @param {Object} props
 * @param {string} props.id - Modal ID for Bootstrap targeting
 * @param {string} props.title - Modal title
 * @param {React.ReactNode} props.children - Modal body content
 * @param {string} props.size - Modal size (modal-sm, modal-lg, modal-xl)
 * @param {boolean} props.centered - Whether modal is vertically centered
 * @param {Function} props.onClose - Optional close handler
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.showCloseButton - Whether to show close button in header
 */
const Modal = ({
  id,
  title,
  children,
  size = "",
  centered = true,
  onClose,
  className = "",
  showCloseButton = true,
}) => {
  return (
    <div
      className={`modal fade ${className}`}
      id={id}
      tabIndex="-1"
      role="dialog"
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div
        className={`modal-dialog ${size} ${centered ? "modal-dialog-centered" : ""}`}
        role="document"
      >
        <div className="modal-content">
          {(title || showCloseButton) && (
            <div className="modal-header">
              {title && (
                <h5 className="modal-title" id={`${id}Label`}>
                  {title}
                </h5>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={onClose}
                />
              )}
            </div>
          )}
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
