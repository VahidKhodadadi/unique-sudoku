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
    <section className="grid gap-3 rounded-[1.25rem] border border-slate-200 bg-slate-100/80 p-3 shadow-sm backdrop-blur-sm sm:grid-cols-[1fr_1fr_1fr]">
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-3 text-slate-700 shadow-sm flex flex-col items-center justify-center text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Mistakes</p>
        <p className="mt-2 text-xl font-semibold">{mistakes} / {mistakeThreshold}</p>
        <p className="mt-1 text-xs text-slate-500">{statusMessage}</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-3 text-slate-700 shadow-sm flex flex-col items-center justify-center text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Difficulty</p>
        <select
          value={difficulty}
          onChange={(event) => onChooseDifficulty(event.target.value as Difficulty)}
          className="mt-3 w-full max-w-[12rem] rounded-full border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 outline-none transition hover:bg-slate-100"
        >
          {(["easy", "medium", "hard"] as Difficulty[]).map((level) => (
            <option key={level} value={level} className="text-slate-900">
              {level}
            </option>
          ))}
        </select>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-3 text-slate-700 shadow-sm flex flex-col items-center justify-center text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Timer</p>
        <p className="mt-2 text-xl font-semibold">{formatTime(elapsedSeconds)}</p>
      </div>
    </section>
  );
}
