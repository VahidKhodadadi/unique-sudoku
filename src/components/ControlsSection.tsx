import { SelectedCell } from "../types";

interface ControlsSectionProps {
  selectedCell: SelectedCell;
}

export default function ControlsSection({ selectedCell }: ControlsSectionProps) {
  return (
    <section className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto]">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-lg">
        <p className="text-sm font-semibold text-slate-900">Selected cell</p>
        <p className="mt-2 text-lg text-slate-500">
          {selectedCell ? `${selectedCell.row + 1}, ${selectedCell.col + 1}` : "Pick a cell"}
        </p>
      </div>
    </section>
  );
}
