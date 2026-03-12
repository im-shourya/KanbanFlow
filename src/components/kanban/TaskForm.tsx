import { FC, useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { Task, Column, TaskFormValues, PriorityValue } from "../../types/kanban";
import { labelStyle } from "../../styles/globalCss";
import PriorityPicker from "./PriorityPicker";
import { IcX } from "./Icons";

interface TaskFormProps {
  initial?: Task;
  colId: string;
  columns: Column[];
  onSave: (values: TaskFormValues) => void;
  onClose: () => void;
}

const TaskForm: FC<TaskFormProps> = ({ initial, colId, columns, onSave, onClose }) => {
  const [title, setTitle] = useState<string>(initial?.title ?? "");
  const [desc, setDesc] = useState<string>(initial?.description ?? "");
  const [prio, setPrio] = useState<PriorityValue>(initial?.priority ?? "none");
  const [due, setDue] = useState<string>(initial?.dueDate ?? "");
  const [col, setCol] = useState<string>(initial?.columnId ?? colId);

  const titleRef = useRef<HTMLInputElement>(null);
  useEffect(() => { titleRef.current?.focus(); }, []);

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && title.trim()) handleSave();
  };
  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title: title.trim(), description: desc.trim(), priority: prio, dueDate: due, columnId: col });
  };

  const isEdit = Boolean(initial);

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 17, letterSpacing: 0.3, color: "var(--text)" }}>
          {isEdit ? "Edit Task" : "New Task"}
        </h2>
        <button className="btn-icon" onClick={onClose} style={{ borderRadius: 8 }}>
          <IcX size={15} />
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <label style={labelStyle}>Title</label>
          <input
            ref={titleRef} value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Task title..."
          />
        </div>
        <div>
          <label style={labelStyle}>Description</label>
          <textarea
            value={desc}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDesc(e.target.value)}
            placeholder="Add details (optional)..."
          />
        </div>
        <div>
          <label style={labelStyle}>Priority</label>
          <PriorityPicker value={prio} onChange={setPrio} />
        </div>
        <div className="form-row" style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Due Date</label>
            <input
              type="date" value={due}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDue(e.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Column</label>
            <select value={col} onChange={(e: ChangeEvent<HTMLSelectElement>) => setCol(e.target.value)}>
              {columns.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-accent" onClick={handleSave} disabled={!title.trim()}>
          {isEdit ? "Save Changes" : "Add Task"}
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
