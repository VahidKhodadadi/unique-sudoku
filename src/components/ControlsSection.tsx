import { SelectedCell } from "../types";

interface ControlsSectionProps {
  onNewGame: () => void;
  onClearCell: () => void;
  selectedCell: SelectedCell;
}

export default function ControlsSection({ onNewGame, onClearCell, selectedCell }: ControlsSectionProps) {
  return (
    <section className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto]">
      <div className="grid gap-3 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg sm:grid-cols-[1fr_1fr]">
        <button
          type="button"
          onClick={onNewGame}
          className="rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Restart game
        </button>
        <button
          type="button"
          onClick={onClearCell}
          className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
        >
          Clear selected cell
        </button>
      </div>
      <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-lg">
        <p className="text-sm font-semibold text-slate-900">Selected cell</p>
        <p className="mt-2 text-lg text-slate-500">
          {selectedCell ? `${selectedCell.row + 1}, ${selectedCell.col + 1}` : "Pick a cell"}
        </p>
      </div>
    </section>
  );
}
