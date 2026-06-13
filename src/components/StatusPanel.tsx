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
    <section className="grid gap-4 rounded-[1.25rem] border border-slate-200 bg-white/90 p-4 shadow-lg backdrop-blur-sm sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr]">
        <div className="rounded-2xl bg-slate-900/95 p-3 text-white shadow-lg flex flex-col items-center justify-center text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Timer</p>
          <p className="mt-2 text-2xl font-semibold">{formatTime(elapsedSeconds)}</p>
        </div>
        <div className="rounded-2xl bg-slate-950/95 p-3 text-white shadow-lg flex flex-col items-center justify-center text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Mistakes</p>
          <p className="mt-2 text-2xl font-semibold">{mistakes} / {mistakeThreshold}</p>
          <p className="mt-1 text-sm text-slate-400">{statusMessage}</p>
        </div>
        <div className="rounded-2xl bg-slate-950/95 p-3 text-white shadow-lg flex flex-col items-center justify-center text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Difficulty</p>
          <div className="mt-2 flex flex-wrap gap-3 justify-center">
          {(["easy", "medium", "hard"] as Difficulty[]).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => onChooseDifficulty(level)}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                difficulty === level
                  ? "bg-emerald-400 text-slate-950"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
