import { useState, useEffect, useRef, useCallback, DragEvent, CSSProperties } from "react";
import { ThemeKey, Column, Task, TaskFormValues, ColFormValues, load, save, uid, THEMES, DEFAULT_COLS } from "../types/kanban";
import { GLOBAL_CSS } from "../styles/globalCss";
import Header from "../components/kanban/Header";
import Toolbar from "../components/kanban/Toolbar";
import KanbanColumn from "../components/kanban/KanbanColumn";
import Modal from "../components/kanban/Modal";
import TaskForm from "../components/kanban/TaskForm";
import ColForm from "../components/kanban/ColForm";
import KFToast from "../components/kanban/Toast";
import { IcPlus } from "../components/kanban/Icons";

export default function Index(): JSX.Element {
  const [theme, setTheme] = useState<ThemeKey>(() => load<ThemeKey>("kf_theme_v2", "light"));
  const [columns, setColumns] = useState<Column[]>(() => load<Column[]>("kf_cols_v2", DEFAULT_COLS));
  const [tasks, setTasks] = useState<Task[]>(() => {
    const t = load<Task[] | null>("kf_tasks_v2", null);
    return t !== null ? t : [];
  });
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [toast, setToast] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const [addTaskModal, setAddTaskModal] = useState<string | null>(null);
  const [editTaskModal, setEditTaskModal] = useState<Task | null>(null);
  const [addColModal, setAddColModal] = useState<boolean>(false);
  const [editColModal, setEditColModal] = useState<Column | null>(null);

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { save("kf_cols_v2", columns); }, [columns]);
  useEffect(() => { save("kf_tasks_v2", tasks); }, [tasks]);
  useEffect(() => { save("kf_theme_v2", theme); }, [theme]);

  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const visibleTasks = (colId: string): Task[] =>
    tasks.filter((t) => {
      if (t.columnId !== colId) return false;
      if (filter !== "all" && t.priority !== filter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!t.title.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q)) return false;
      }
      return true;
    });

  const doneCol = columns.find((c) => c.title.toLowerCase() === "done");
  const totalTasks = tasks.length;
  const doneTasks = doneCol ? tasks.filter((t) => t.columnId === doneCol.id).length : 0;
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  // ── Task handlers ────────────────────────────────────────────────────────────
  const handleAddTask = (colId: string) => setAddTaskModal(colId);

  const handleSaveNewTask = (values: TaskFormValues) => {
    const task: Task = { id: uid(), createdAt: new Date().toISOString(), ...values };
    setTasks((prev) => [...prev, task]);
    setAddTaskModal(null);
    showToast("Task added");
  };

  const handleEditTask = (task: Task) => setEditTaskModal(task);

  const handleSaveEditTask = (values: TaskFormValues) => {
    if (!editTaskModal) return;
    setTasks((prev) => prev.map((t) => t.id === editTaskModal.id ? { ...t, ...values } : t));
    setEditTaskModal(null);
    showToast("Task updated");
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast("Task deleted");
  };

  const handleMoveTask = (taskId: string, colId: string) => {
    setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, columnId: colId } : t));
    showToast("Task moved");
  };

  // ── Column handlers ──────────────────────────────────────────────────────────
  const handleSaveNewCol = ({ title, color }: ColFormValues) => {
    setColumns((prev) => [...prev, { id: uid(), title, color }]);
    setAddColModal(false);
    showToast("Column added");
  };

  const handleSaveEditCol = ({ title, color }: ColFormValues) => {
    if (!editColModal) return;
    setColumns((prev) => prev.map((c) => c.id === editColModal.id ? { ...c, title, color } : c));
    setEditColModal(null);
    showToast("Column updated");
  };

  const handleDeleteCol = () => {
    if (!editColModal) return;
    setTasks((prev) => prev.filter((t) => t.columnId !== editColModal.id));
    setColumns((prev) => prev.filter((c) => c.id !== editColModal.id));
    setEditColModal(null);
    showToast("Column deleted");
  };

  // ── Drag & drop handlers ─────────────────────────────────────────────────────
  const handleDragStart = (e: DragEvent<HTMLDivElement>, taskId: string) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("taskId", taskId);
    setDraggingId(taskId);
  };
  const handleDragEnd = () => setDraggingId(null);
  const handleDrop = (colId: string) => {
    if (draggingId) {
      setTasks((prev) => prev.map((t) => t.id === draggingId ? { ...t, columnId: colId } : t));
      setDraggingId(null);
    }
  };

  const cssVarStyle = THEMES[theme] as CSSProperties;

  return (
    <div style={{ ...cssVarStyle, minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{GLOBAL_CSS}</style>

      <Header
        theme={theme}
        progress={progress}
        columns={columns}
        onToggleTheme={() => setTheme((t) => t === "dark" ? "light" : "dark")}
        onNewTask={() => setAddTaskModal(columns.length > 0 ? columns[0].id : "")}
      />

      <Toolbar
        search={search}
        filter={filter}
        totalTasks={totalTasks}
        doneTasks={doneTasks}
        onSearchChange={setSearch}
        onFilterChange={setFilter}
        onClear={() => { setSearch(""); setFilter("all"); }}
      />

      <div className="board-wrap" style={{ display: "flex", gap: 14, padding: 18, alignItems: "flex-start", overflowX: "auto", minHeight: "calc(100vh - 120px)" }}>
        {columns.map((col) => (
          <KanbanColumn
            key={col.id}
            col={col}
            tasks={visibleTasks(col.id)}
            allColumns={columns}
            draggingId={draggingId}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onMoveTask={handleMoveTask}
            onEditCol={setEditColModal}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
          />
        ))}

        <button
          className="btn-dashed"
          style={{ minWidth: 240, width: "auto", padding: "13px 18px", fontSize: 13, borderRadius: 12, flexShrink: 0, alignSelf: "flex-start", justifyContent: "flex-start" }}
          onClick={() => setAddColModal(true)}
        >
          <IcPlus size={14} /> New Column
        </button>
      </div>

      <div style={{ textAlign: "center", padding: "14px 18px", fontSize: 11, color: "var(--muted)", borderTop: "1px solid var(--border)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.2px" }}>
        KanbanFlow · Task Manager · Built by{" "}
        <a href="https://shouryaparashar.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>Shourya Parashar</a>
      </div>

      {addTaskModal && (
        <Modal onClose={() => setAddTaskModal(null)}>
          <TaskForm colId={addTaskModal} columns={columns} onSave={handleSaveNewTask} onClose={() => setAddTaskModal(null)} />
        </Modal>
      )}
      {editTaskModal && (
        <Modal onClose={() => setEditTaskModal(null)}>
          <TaskForm initial={editTaskModal} colId={editTaskModal.columnId} columns={columns} onSave={handleSaveEditTask} onClose={() => setEditTaskModal(null)} />
        </Modal>
      )}
      {addColModal && (
        <Modal onClose={() => setAddColModal(false)}>
          <ColForm onSave={handleSaveNewCol} onClose={() => setAddColModal(false)} />
        </Modal>
      )}
      {editColModal && (
        <Modal onClose={() => setEditColModal(null)}>
          <ColForm initial={editColModal} onSave={handleSaveEditCol} onClose={() => setEditColModal(null)} onDelete={handleDeleteCol} />
        </Modal>
      )}

      {toast && <KFToast message={toast} />}
    </div>
  );
}
