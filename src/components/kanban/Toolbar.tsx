import { FC, ChangeEvent } from "react";
import { PRIORITIES } from "../../types/kanban";
import { IcSearch, IcX } from "./Icons";

interface ToolbarProps {
  search: string;
  filter: string;
  totalTasks: number;
  doneTasks: number;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onClear: () => void;
}

const Toolbar: FC<ToolbarProps> = ({
  search, filter, totalTasks, doneTasks,
  onSearchChange, onFilterChange, onClear,
}) => {
  const isFiltered = Boolean(search || filter !== "all");

  return (
    <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "10px 18px" }}>
      <div className="toolbar-inner" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div className="search-wrap" style={{ position: "relative", maxWidth: 280, flex: "1 1 200px" }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }}>
            <IcSearch />
          </span>
          <input
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            style={{ paddingLeft: 36, paddingTop: 9, paddingBottom: 9, fontSize: 13 }}
          />
        </div>

        <select
          value={filter}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onFilterChange(e.target.value)}
          style={{ maxWidth: 160, fontSize: 13, flex: "0 1 160px" }}
        >
          <option value="all">All priorities</option>
          {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>

        {isFiltered && (
          <button className="btn btn-ghost" style={{ fontSize: 12, padding: "7px 12px", flexShrink: 0 }} onClick={onClear}>
            <IcX size={12} /> Clear
          </button>
        )}

        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--muted)", whiteSpace: "nowrap", flexShrink: 0 }}>
          {totalTasks} tasks · {doneTasks} done
        </span>
      </div>
    </div>
  );
};

export default Toolbar;
