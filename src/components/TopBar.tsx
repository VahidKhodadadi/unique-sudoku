interface TopBarProps {
  drawerOpen: boolean;
  onToggleDrawer: () => void;
  onNewGame: () => void;
}

export default function TopBar({ drawerOpen, onToggleDrawer, onNewGame }: TopBarProps) {
  return (
    <header className="flex items-center justify-between px-4 py-4 bg-white shadow-sm sticky top-0 z-20">
      <button
        type="button"
        onClick={onToggleDrawer}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-200"
      >
        <span className="h-3 w-3 rounded-full bg-slate-800" />
        Menu
      </button>

      <h1 className="text-lg font-semibold text-slate-900">Unique Sudoku</h1>

      <button
        type="button"
        onClick={onNewGame}
        className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        New Game
      </button>
    </header>
  );
}
