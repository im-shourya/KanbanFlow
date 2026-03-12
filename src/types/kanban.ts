// ─── Types ───────────────────────────────────────────────────────────────────

export type PriorityValue = "high" | "medium" | "low" | "none";
export type ThemeKey = "light" | "dark";

export interface PriorityOption {
  value: PriorityValue;
  label: string;
  color: string;
}

export interface Column {
  id: string;
  title: string;
  color: string;
}

export interface Task {
  id: string;
  columnId: string;
  title: string;
  description: string;
  priority: PriorityValue;
  dueDate: string;
  createdAt: string;
}

export interface TaskFormValues {
  title: string;
  description: string;
  priority: PriorityValue;
  dueDate: string;
  columnId: string;
}

export interface ColFormValues {
  title: string;
  color: string;
}

export type ThemeVars = Record<string, string>;

// ─── Utilities ────────────────────────────────────────────────────────────────

export const uid = (): string => Math.random().toString(36).slice(2, 10);

export const load = <T,>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const save = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

export const today = (): string => new Date().toISOString().split("T")[0];
export const isOverdue = (d: string): boolean => Boolean(d && d < today());

// ─── Constants ────────────────────────────────────────────────────────────────

export const PRIORITIES: PriorityOption[] = [
  { value: "high", label: "High", color: "#EA4335" },
  { value: "medium", label: "Medium", color: "#FBBC04" },
  { value: "low", label: "Low", color: "#34A853" },
  { value: "none", label: "No Priority", color: "#9AA0A6" },
];

export const PRIORITY_MAP: Record<PriorityValue, PriorityOption> = Object.fromEntries(
  PRIORITIES.map((p) => [p.value, p])
) as Record<PriorityValue, PriorityOption>;

export const PALETTE: string[] = [
  "#4285F4", "#EA4335", "#FBBC04", "#34A853",
  "#FF6D00", "#AB47BC", "#00ACC1", "#43A047",
];

export const DEFAULT_COLS: Column[] = [
  { id: "col-todo", title: "To Do", color: "#4285F4" },
  { id: "col-inprogress", title: "In Progress", color: "#FBBC04" },
  { id: "col-done", title: "Done", color: "#34A853" },
];

export const THEMES: Record<ThemeKey, ThemeVars> = {
  light: {
    "--bg": "#F8F9FA",
    "--surface": "#FFFFFF",
    "--card": "#FFFFFF",
    "--border": "#E8EAED",
    "--border2": "#DADCE0",
    "--text": "#202124",
    "--text2": "#3C4043",
    "--muted": "#80868B",
    "--accent": "#1A73E8",
    "--accentBg": "#E8F0FE",
    "--accentHover": "#1558B0",
    "--danger": "#EA4335",
    "--dangerBg": "#FCE8E6",
    "--ripple": "rgba(26,115,232,0.10)",
    "--shadow": "0 1px 3px rgba(60,64,67,0.12), 0 1px 2px rgba(60,64,67,0.08)",
    "--shadow2": "0 4px 12px rgba(60,64,67,0.16), 0 2px 6px rgba(60,64,67,0.10)",
  },
  dark: {
    "--bg": "#0F1117",
    "--surface": "#1C1F26",
    "--card": "#242833",
    "--border": "#2D3140",
    "--border2": "#3A3F50",
    "--text": "#E8EAED",
    "--text2": "#BDC1C6",
    "--muted": "#9AA0A6",
    "--accent": "#8AB4F8",
    "--accentBg": "#1A2845",
    "--accentHover": "#ADC8FF",
    "--danger": "#F28B82",
    "--dangerBg": "#3B1F1D",
    "--ripple": "rgba(138,180,248,0.12)",
    "--shadow": "0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)",
    "--shadow2": "0 4px 16px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4)",
  },
};
