import { FC } from "react";
import { PRIORITIES, PriorityValue } from "../../types/kanban";

interface PriorityPickerProps {
  value: PriorityValue;
  onChange: (v: PriorityValue) => void;
}

const PriorityPicker: FC<PriorityPickerProps> = ({ value, onChange }) => (
  <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
    {PRIORITIES.map((p) => {
      const isSelected = value === p.value;
      return (
        <button
          key={p.value}
          type="button"
          onClick={() => onChange(p.value)}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "7px 12px", borderRadius: 99,
            border: `1.5px solid ${isSelected ? p.color : "var(--border2)"}`,
            background: isSelected ? `${p.color}18` : "transparent",
            color: isSelected ? p.color : "var(--muted)",
            fontSize: 12, fontWeight: isSelected ? 600 : 500,
            cursor: "pointer", transition: "all 0.18s ease",
            fontFamily: "'DM Sans', sans-serif",
            transform: isSelected ? "scale(1.04)" : "scale(1)",
          }}
        >
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: p.color,
            boxShadow: isSelected ? `0 0 6px ${p.color}99` : "none",
            flexShrink: 0, transition: "box-shadow 0.18s",
          }} />
          {p.label}
        </button>
      );
    })}
  </div>
);

export default PriorityPicker;
