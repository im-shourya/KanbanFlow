import { FC } from "react";

const KFToast: FC<{ message: string }> = ({ message }) => (
  <div style={{
    position: "fixed", bottom: 28, left: "50%",
    zIndex: 2000,
    background: "var(--text)", color: "var(--bg)",
    padding: "10px 22px", borderRadius: 99,
    fontSize: 13, fontWeight: 500, whiteSpace: "nowrap",
    boxShadow: "var(--shadow2)",
    animation: "toastin 0.2s ease",
    pointerEvents: "none",
  }}>
    {message}
  </div>
);

export default KFToast;
