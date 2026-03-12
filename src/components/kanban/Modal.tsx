import { FC, ReactNode, useEffect } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ onClose, children }) => {
  useEffect(() => {
    const fn = (e: globalThis.KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadein 0.15s ease", padding: "16px",
      }}
    >
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface)", borderRadius: 16,
          width: "100%", maxWidth: 460,
          maxHeight: "90vh", overflowY: "auto",
          boxShadow: "var(--shadow2)",
          border: "1px solid var(--border)",
          animation: "slideup 0.20s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
