import { FC } from "react";
import { Column, ThemeKey } from "../../types/kanban";
import { IcSun, IcMoon, IcPlus } from "./Icons";

interface HeaderProps {
  theme: ThemeKey;
  progress: number;
  columns: Column[];
  onToggleTheme: () => void;
  onNewTask: () => void;
}

const Header: FC<HeaderProps> = ({ theme, progress, columns, onToggleTheme, onNewTask }) => (
  <header style={{
    position: "sticky", top: 0, zIndex: 100,
    background: "var(--surface)", borderBottom: "1px solid var(--border)",
    boxShadow: "var(--shadow)", height: 58,
  }}>
    <div className="header-inner" style={{ height: "100%", display: "flex", alignItems: "center", padding: "0 18px", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, flexShrink: 0 }}>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <rect x="0" y="0" width="11" height="11" rx="3" fill="#4285F4" />
          <rect x="15" y="0" width="11" height="11" rx="3" fill="#EA4335" />
          <rect x="0" y="15" width="11" height="11" rx="3" fill="#34A853" />
          <rect x="15" y="15" width="11" height="11" rx="3" fill="#FBBC04" />
        </svg>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--text)" }}>
          KANBANFLOW
        </span>
      </div>

      <div className="hide-mobile" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 12, width: "100%", maxWidth: 300 }}>
        <div style={{ flex: 1, height: 6, background: "var(--border)", borderRadius: 99, overflow: "hidden", position: "relative" }}>
          <div style={{
            height: "100%",
            borderRadius: 99,
            width: `${progress}%`,
            background: "linear-gradient(90deg, #7FAAF7, #F07E73, #FCD05C, #71C686)",
            backgroundSize: "300px 100%",
            transition: "width 0.6s cubic-bezier(0.25, 1, 0.5, 1)"
          }} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", width: 36, textAlign: "right", fontFamily: "'Space Grotesk', sans-serif" }}>{progress}%</span>
      </div>

      <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
        <button
          className="btn btn-ghost"
          style={{ gap: 6, padding: "7px 12px", fontSize: 12 }}
          onClick={onToggleTheme}
        >
          {theme === "dark" ? <IcSun /> : <IcMoon />}
          <span className="hide-mobile">{theme === "dark" ? "Light" : "Dark"}</span>
        </button>
        <button
          className="btn btn-accent"
          style={{ padding: "7px 14px", fontSize: 12 }}
          onClick={onNewTask}
          disabled={columns.length === 0}
        >
          <IcPlus /> <span className="hide-mobile">Task</span>
        </button>
      </div>
    </div>
  </header>
);

export default Header;
