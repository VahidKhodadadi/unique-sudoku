interface TopBarProps {
  onNewGame: () => void;
}

export default function TopBar({ onNewGame }: TopBarProps) {
  return (
    <header className="flex items-center justify-between px-4 py-4 bg-white shadow-sm sticky top-0 z-20">
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
