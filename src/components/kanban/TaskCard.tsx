import { FC, useState, CSSProperties, DragEvent } from "react";
import { Task, Column, PRIORITY_MAP } from "../../types/kanban";
import { isOverdue } from "../../types/kanban";
import { IcCalendar, IcMove, IcEdit, IcTrash } from "./Icons";
import MoveDropdown from "./MoveDropdown";

interface TaskCardProps {
  task: Task;
  columns: Column[];
  isDragging: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onMove: (taskId: string, colId: string) => void;
  onDragStart: (e: DragEvent<HTMLDivElement>, taskId: string) => void;
  onDragEnd: () => void;
}

const TaskCard: FC<TaskCardProps> = ({ task, columns, isDragging, onEdit, onDelete, onMove, onDragStart, onDragEnd }) => {
  const [showMove, setShowMove] = useState<boolean>(false);
  const prio = PRIORITY_MAP[task.priority] ?? PRIORITY_MAP.none;
  const overdue = isOverdue(task.dueDate);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      className="card-enter"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderLeft: `3.5px solid ${prio.color}`,
        borderRadius: 14,
        padding: "13px 13px 0 13px",
        opacity: isDragging ? 0.35 : 1,
        transform: isDragging ? "rotate(1.5deg) scale(0.97)" : undefined,
        cursor: isDragging ? "grabbing" : "grab",
        transition: "transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.18s ease, opacity 0.15s",
        userSelect: "none",
        position: "relative",
        WebkitTapHighlightColor: "transparent",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (!isDragging) {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px) scale(1.01)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow2)";
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "";
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: task.description ? 7 : 0 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: prio.color, marginTop: 5, flexShrink: 0 }} />
        <span style={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.45, color: "var(--text)", fontFamily: "'DM Sans', sans-serif" }}>
          {task.title}
        </span>
      </div>

      {task.description && (
        <p style={{
          fontSize: 12, color: "var(--muted)", lineHeight: 1.5,
          marginLeft: 14, marginBottom: 7,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        } as CSSProperties}>
          {task.description}
        </p>
      )}

      {task.dueDate && (
        <div style={{
          display: "flex", alignItems: "center", gap: 4, marginLeft: 14, marginBottom: 8,
          fontSize: 11, fontWeight: overdue ? 600 : 400,
          color: overdue ? "var(--danger)" : "var(--muted)",
        }}>
          <IcCalendar />
          {overdue ? "Overdue — " : ""}{task.dueDate}
        </div>
      )}

      {task.priority !== "none" && (
        <div style={{ marginLeft: 14, marginBottom: 9 }}>
          <span className="chip" style={{ background: `${prio.color}18`, color: prio.color }}>
            {prio.label}
          </span>
        </div>
      )}

      <div style={{ borderTop: "1px solid var(--border)", margin: "0 -12px" }} />

      <div style={{ display: "flex", alignItems: "center", gap: 2, padding: "4px 0" }}>
        <div style={{ position: "relative" }}>
          <button
            className="btn-icon"
            title="Move to column"
            style={{ fontSize: 11, gap: 4, padding: "5px 7px", borderRadius: 7 }}
            onClick={() => setShowMove((v) => !v)}
          >
            <IcMove />
            <span style={{ fontSize: 11, color: "var(--muted)" }}>Move</span>
          </button>
          {showMove && (
            <MoveDropdown
              columns={columns}
              currentColId={task.columnId}
              onMove={(colId) => onMove(task.id, colId)}
              onClose={() => setShowMove(false)}
            />
          )}
        </div>
        <button className="btn-icon" style={{ padding: "5px 7px", borderRadius: 7 }} title="Edit" onClick={() => onEdit(task)}>
          <IcEdit />
          <span style={{ fontSize: 11, color: "var(--muted)" }}>Edit</span>
        </button>
        <button
          className="btn-icon"
          style={{ padding: "5px 7px", borderRadius: 7, color: "var(--danger)" }}
          title="Delete"
          onClick={() => onDelete(task.id)}
        >
          <IcTrash />
          <span style={{ fontSize: 11, color: "inherit" }}>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
