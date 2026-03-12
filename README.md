# KanbanFlow

A lightweight, fully-featured Kanban board built with **React + Vite + TypeScript**.

## Features

- Unlimited columns and tasks
- Priority levels — High, Medium, Low, None
- Due dates with overdue highlighting
- Search and priority filtering
- Drag & drop task reordering across columns
- Move task via dropdown menu
- Light / Dark theme with localStorage persistence
- Auto-saves to `localStorage` — no backend needed
- Responsive (mobile-friendly)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── types/kanban.ts              # Types, constants & utilities
├── styles/globalCss.ts         # Runtime CSS injection
├── components/kanban/
│   ├── Icons.tsx
│   ├── Modal.tsx
│   ├── Toast.tsx
│   ├── ColorPicker.tsx
│   ├── PriorityPicker.tsx
│   ├── TaskForm.tsx
│   ├── ColForm.tsx
│   ├── MoveDropdown.tsx
│   ├── TaskCard.tsx
│   ├── KanbanColumn.tsx
│   ├── Header.tsx
│   └── Toolbar.tsx
└── pages/
    ├── Index.tsx               # Main board (orchestrator)
    └── NotFound.tsx            # 404 page
```

## Tech Stack

- [React 18](https://react.dev)
- [Vite 5](https://vitejs.dev)
- [TypeScript 5](https://www.typescriptlang.org)
- [React Router v6](https://reactrouter.com)

---

Built by [Shourya Parashar](https://shouryaparashar.in)
