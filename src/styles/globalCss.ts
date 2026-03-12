import { CSSProperties } from "react";

export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-text-size-adjust: 100%; }
  body { background: var(--bg); font-family: 'DM Sans', sans-serif; color: var(--text); }

  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 99px; }

  @keyframes fadein  { from { opacity: 0 } to { opacity: 1 } }
  @keyframes slideup { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
  @keyframes toastin { from { transform: translateY(12px) translateX(-50%); opacity: 0 } to { transform: translateY(0) translateX(-50%); opacity: 1 } }

  input, textarea, select {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    background: var(--bg);
    border: 1.5px solid var(--border2);
    border-radius: 8px;
    color: var(--text);
    padding: 10px 13px;
    width: 100%;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    -webkit-appearance: none;
    appearance: none;
  }
  input:focus, textarea:focus, select:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accentBg);
  }
  textarea { resize: vertical; min-height: 80px; line-height: 1.5; }
  select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239AA0A6' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 12px center; padding-right: 36px; cursor: pointer;
  }
  button { cursor: pointer; border: none; font-family: 'DM Sans', sans-serif; transition: all 0.15s; }

  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    gap: 6px; border-radius: 8px; font-size: 13px; font-weight: 500;
    padding: 8px 16px; white-space: nowrap; transition: all 0.15s;
    -webkit-tap-highlight-color: transparent;
  }
  .btn-accent { background: var(--accent); color: #fff; box-shadow: 0 1px 3px rgba(26,115,232,0.3); }
  .btn-accent:hover { filter: brightness(1.08); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(26,115,232,0.35); }
  .btn-accent:active { transform: translateY(0); }
  .btn-ghost { background: transparent; color: var(--muted); border: 1.5px solid var(--border2); }
  .btn-ghost:hover { background: var(--border); color: var(--text); }
  .btn-danger { background: var(--dangerBg); color: var(--danger); border: 1.5px solid rgba(234,67,53,0.25); }
  .btn-danger:hover { background: rgba(234,67,53,0.2); }
  .btn-icon {
    background: transparent; color: var(--muted); border-radius: 8px;
    padding: 6px; display: inline-flex; align-items: center; justify-content: center;
  }
  .btn-icon:hover { background: var(--border); color: var(--text); }
  .btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none !important; }

  .btn-dashed {
    display: flex; align-items: center; justify-content: center; gap: 6px;
    background: transparent; color: var(--muted);
    border: 1.5px dashed var(--border2); border-radius: 8px;
    font-size: 12px; font-weight: 500; cursor: pointer;
    transition: all 0.14s; width: 100%; padding: 8px 10px;
  }
  .btn-dashed:hover { border-color: var(--accent); color: var(--accent); }

  .chip {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 9px; border-radius: 99px; font-size: 11px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; white-space: nowrap;
  }
  .card-enter { animation: slideup 0.18s ease; }
  .drop-active { background: var(--accentBg) !important; border-color: var(--accent) !important; }

  @media (max-width: 700px) {
    .hide-mobile { display: none !important; }
    .board-wrap { flex-direction: column !important; overflow-x: visible !important; padding: 12px !important; gap: 12px !important; }
    .col-wrap { min-width: unset !important; width: 100% !important; }
    .toolbar-inner { flex-wrap: wrap !important; gap: 8px !important; }
    .search-wrap { flex: 1 1 100% !important; min-width: 0 !important; }
    .modal-box { margin: 12px !important; max-width: calc(100vw - 24px) !important; }
    .header-inner { padding: 0 14px !important; }
    .form-row { flex-direction: column !important; }
    .btn { min-height: 40px; }
  }
`;

export const labelStyle: CSSProperties = {
  display: "block", marginBottom: 6, fontSize: 11, fontWeight: 600,
  letterSpacing: "0.6px", textTransform: "uppercase", color: "var(--muted)",
  fontFamily: "'DM Sans', sans-serif",
};
