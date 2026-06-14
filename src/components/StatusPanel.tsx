import { Difficulty } from "../types";
import { formatTime } from "../game";

interface StatusPanelProps {
  elapsedSeconds: number;
  mistakes: number;
  mistakeThreshold: number;
  statusMessage: string;
  difficulty: Difficulty;
  onChooseDifficulty: (level: Difficulty) => void;
}

export default function StatusPanel({
  elapsedSeconds,
  mistakes,
  mistakeThreshold,
  statusMessage,
  difficulty,
  onChooseDifficulty,
}: StatusPanelProps) {
  return (
    <section className="flex flex-nowrap items-center justify-between gap-2 overflow-auto rounded-[1.25rem] border border-slate-200 bg-slate-100/80 p-2 shadow-sm backdrop-blur-sm">
      <div className="min-w-[7rem] flex-1 rounded-2xl border border-slate-200 bg-white/80 px-2 py-1.5 text-slate-700 shadow-sm">
        <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500">Mistakes</p>
        <p className="mt-1 text-base font-semibold">{mistakes} / {mistakeThreshold}</p>
        <p className="mt-1 text-[9px] text-slate-500">{statusMessage}</p>
      </div>
      <div className="min-w-[7rem] flex-1 rounded-2xl border border-slate-200 bg-white/80 px-2 py-1.5 text-slate-700 shadow-sm">
        <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500">Difficulty</p>
        <select
          value={difficulty}
          onChange={(event) => onChooseDifficulty(event.target.value as Difficulty)}
          className="mt-1 w-full rounded-full border border-slate-300 bg-slate-50 px-2 py-1 text-sm font-semibold text-slate-800 outline-none transition hover:bg-slate-100"
        >
          {(["easy", "medium", "hard"] as Difficulty[]).map((level) => (
            <option key={level} value={level} className="text-slate-900">
              {level}
            </option>
          ))}
        </select>
      </div>
      <div className="min-w-[7rem] flex-1 rounded-2xl border border-slate-200 bg-white/80 px-2 py-1.5 text-slate-700 shadow-sm">
        <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500">Timer</p>
        <p className="mt-1 text-base font-semibold">{formatTime(elapsedSeconds)}</p>
      </div>
    </section>
  );
}
