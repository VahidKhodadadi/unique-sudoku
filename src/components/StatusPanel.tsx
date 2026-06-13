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
    <section className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-lg backdrop-blur-sm sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr]">
      <div className="rounded-3xl bg-slate-900/95 p-5 text-white shadow-lg">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Timer</p>
        <p className="mt-3 text-3xl font-semibold">{formatTime(elapsedSeconds)}</p>
      </div>
      <div className="rounded-3xl bg-slate-950/95 p-5 text-white shadow-lg">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Mistakes</p>
        <p className="mt-3 text-3xl font-semibold">{mistakes} / {mistakeThreshold}</p>
        <p className="mt-2 text-sm text-slate-400">{statusMessage}</p>
      </div>
      <div className="rounded-3xl bg-slate-950/95 p-5 text-white shadow-lg">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Difficulty</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {(["easy", "medium", "hard"] as Difficulty[]).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => onChooseDifficulty(level)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
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
