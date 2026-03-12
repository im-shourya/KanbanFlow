import { FC, useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { Column, ColFormValues, PALETTE } from "../../types/kanban";
import { labelStyle } from "../../styles/globalCss";
import ColorPicker from "./ColorPicker";
import { IcX, IcTrash } from "./Icons";

interface ColFormProps {
  initial?: Column;
  onSave: (values: ColFormValues) => void;
  onClose: () => void;
  onDelete?: () => void;
}

const ColForm: FC<ColFormProps> = ({ initial, onSave, onClose, onDelete }) => {
  const [name, setName] = useState<string>(initial?.title ?? "");
  const [color, setColor] = useState<string>(initial?.color ?? PALETTE[0]);
  const [confirmDel, setConfirmDel] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const isEdit = Boolean(initial);

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 17, letterSpacing: 0.3, color: "var(--text)" }}>
          {isEdit ? "Column Settings" : "New Column"}
        </h2>
        <button className="btn-icon" onClick={onClose}><IcX size={15} /></button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={labelStyle}>Column Name</label>
          <input
            ref={inputRef} value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter" && name.trim()) onSave({ title: name.trim(), color });
            }}
            placeholder="e.g. Review, Blocked..."
          />
        </div>
        <div>
          <label style={labelStyle}>Color</label>
          <ColorPicker value={color} onChange={setColor} />
        </div>
      </div>

      {isEdit && (
        <div style={{ marginTop: 20, padding: "14px", background: "var(--dangerBg)", borderRadius: 10, border: "1px solid rgba(234,67,53,0.2)" }}>
          {!confirmDel ? (
            <button className="btn btn-danger" style={{ fontSize: 12 }} onClick={() => setConfirmDel(true)}>
              <IcTrash /> Delete Column
            </button>
          ) : (
            <div>
              <p style={{ fontSize: 12, color: "var(--danger)", marginBottom: 12, fontWeight: 500 }}>
                This will permanently delete this column and all its tasks. Are you sure?
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => setConfirmDel(false)}>Cancel</button>
                <button className="btn btn-danger" style={{ fontSize: 12 }} onClick={onDelete}>Yes, Delete</button>
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-accent" disabled={!name.trim()} onClick={() => onSave({ title: name.trim(), color })}>
          {isEdit ? "Save Changes" : "Add Column"}
        </button>
      </div>
    </div>
  );
};

export default ColForm;
