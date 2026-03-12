import { FC, useRef, useEffect, useState } from "react";
import { Column } from "../../types/kanban";
import { IcCheck } from "./Icons";

interface MoveDropdownProps {
  columns: Column[];
  currentColId: string;
  onMove: (colId: string) => void;
  onClose: () => void;
}

const MoveDropdown: FC<MoveDropdownProps> = ({ columns, currentColId, onMove, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [onClose]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute", bottom: "calc(100% + 8px)", left: 0,
        background: "var(--surface)", border: "1px solid var(--border2)",
        borderRadius: 12, zIndex: 300, minWidth: 190,
        boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12)",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.96)",
        transition: "opacity 0.2s ease, transform 0.22s cubic-bezier(0.34,1.56,0.64,1)",
        transformOrigin: "bottom left",
      }}
    >
      <div style={{
        padding: "8px 12px 6px", fontSize: 10, fontWeight: 700,
        letterSpacing: "0.8px", textTransform: "uppercase", color: "var(--muted)",
        borderBottom: "1px solid var(--border)",
      }}>
        Move to
      </div>

      {columns.map((col, i) => {
        const isCurrent = col.id === currentColId;
        return (
          <button
            key={col.id}
            onClick={() => { if (!isCurrent) { onMove(col.id); onClose(); } }}
            style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%",
              padding: "10px 13px",
              background: isCurrent ? "var(--accentBg)" : "transparent",
              color: isCurrent ? "var(--accent)" : "var(--text)",
              fontSize: 13, fontWeight: isCurrent ? 600 : 500,
              cursor: isCurrent ? "default" : "pointer",
              border: "none",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-8px)",
              transitionDelay: `${0.04 + i * 0.04}s`,
              transitionProperty: "background, color, opacity, transform",
              transitionDuration: "0.13s, 0.13s, 0.22s, 0.22s",
              transitionTimingFunction: "ease, ease, ease, cubic-bezier(0.34,1.56,0.64,1)",
            }}
            onMouseEnter={(e) => { if (!isCurrent) (e.currentTarget as HTMLButtonElement).style.background = "var(--border)"; }}
            onMouseLeave={(e) => { if (!isCurrent) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
          >
            <span style={{
              width: 9, height: 9, borderRadius: "50%", background: col.color,
              flexShrink: 0, boxShadow: isCurrent ? `0 0 6px ${col.color}88` : "none",
              transition: "box-shadow 0.15s",
            }} />
            <span style={{ flex: 1, textAlign: "left" }}>{col.title}</span>
            {isCurrent && (
              <span style={{
                width: 16, height: 16, borderRadius: "50%",
                background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <IcCheck />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default MoveDropdown;
