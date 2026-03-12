import { FC } from "react";
import { PALETTE } from "../../types/kanban";
import { IcPlus } from "./Icons";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const ColorPicker: FC<ColorPickerProps> = ({ value, onChange }) => (
  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
    {PALETTE.map((c) => (
      <button
        key={c}
        type="button"
        onClick={() => onChange(c)}
        style={{
          width: 30, height: 30, borderRadius: "50%",
          background: c, border: "none",
          outline: value === c ? `3px solid ${c}` : "3px solid transparent",
          outlineOffset: 2,
          transform: value === c ? "scale(1.15)" : "scale(1)",
          transition: "transform 0.12s, outline 0.12s",
          cursor: "pointer",
        }}
        title={c}
      />
    ))}
    <div
      style={{
        position: "relative", width: 30, height: 30, borderRadius: "50%",
        border: "2px dashed var(--muted)", display: "flex", alignItems: "center",
        justifyContent: "center", overflow: "hidden", cursor: "pointer",
        outline: !PALETTE.includes(value) ? `3px solid ${value}` : "3px solid transparent",
        outlineOffset: 2,
        transform: !PALETTE.includes(value) ? "scale(1.15)" : "scale(1)",
        transition: "transform 0.12s, outline 0.12s",
      }}
      title="Custom color"
    >
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ position: "absolute", opacity: 0, width: "200%", height: "200%", cursor: "pointer", top: -10, left: -10 }}
      />
      <IcPlus size={14} />
    </div>
  </div>
);

export default ColorPicker;
