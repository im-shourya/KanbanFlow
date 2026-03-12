import { FC, useState, DragEvent } from "react";
import { Column, Task } from "../../types/kanban";
import { IcPlus, IcDots } from "./Icons";
import TaskCard from "./TaskCard";

interface KanbanColumnProps {
  col: Column;
  tasks: Task[];
  allColumns: Column[];
  draggingId: string | null;
  onAddTask: (colId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onMoveTask: (taskId: string, colId: string) => void;
  onEditCol: (col: Column) => void;
  onDragStart: (e: DragEvent<HTMLDivElement>, taskId: string) => void;
  onDragEnd: () => void;
  onDrop: (colId: string) => void;
}

const KanbanColumn: FC<KanbanColumnProps> = ({
  col, tasks, allColumns, draggingId,
  onAddTask, onEditTask, onDeleteTask, onMoveTask,
  onEditCol, onDragStart, onDragEnd, onDrop,
}) => {
  const [over, setOver] = useState<boolean>(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setOver(true); };
  const handleDragLeave = () => setOver(false);
  const handleDrop = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setOver(false); onDrop(col.id); };

  return (
    <div className="col-wrap" style={{ minWidth: 278, width: 278, display: "flex", flexDirection: "column", gap: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px 10px 14px", marginBottom: 6 }}>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: col.color, flexShrink: 0, boxShadow: `0 0 8px ${col.color}99` }} />
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--text)", flex: 1 }}>
          {col.title}
        </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: col.color, background: `${col.color}18`, borderRadius: 99, padding: "2px 8px", fontFamily: "'DM Sans', sans-serif" }}>
          {tasks.length}
        </span>
        <button className="btn-icon" style={{ padding: 5, borderRadius: 7 }} title="Add task" onClick={() => onAddTask(col.id)}>
          <IcPlus size={14} />
        </button>
        <button className="btn-icon" style={{ padding: 5, borderRadius: 7 }} title="Column settings" onClick={() => onEditCol(col)}>
          <IcDots />
        </button>
      </div>

      <div
        className={over ? "drop-active" : ""}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          background: "var(--surface)",
          border: `1.5px solid ${over ? "var(--accent)" : "var(--border)"}`,
          borderRadius: 12, padding: 8, minHeight: 110, flex: 1,
          display: "flex", flexDirection: "column", gap: 7,
          transition: "all 0.18s",
        }}
      >
        {tasks.length === 0 && (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: "32px 16px", flex: 1, gap: 10,
            opacity: 0.6, userSelect: "none"
          }}>
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
              <path d="M10 14l2 2 4-4"></path>
            </svg>
            <span style={{ color: "var(--muted)", fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
              All caught up!
            </span>
          </div>
        )}
        {tasks.map((t) => (
          <TaskCard
            key={t.id} task={t} columns={allColumns}
            isDragging={draggingId === t.id}
            onEdit={onEditTask} onDelete={onDeleteTask} onMove={onMoveTask}
            onDragStart={onDragStart} onDragEnd={onDragEnd}
          />
        ))}

        <button className="btn-dashed" style={{ marginTop: 2, justifyContent: "flex-start" }} onClick={() => onAddTask(col.id)}>
          <IcPlus size={12} /> Add task
        </button>
      </div>
    </div>
  );
};

export default KanbanColumn;
