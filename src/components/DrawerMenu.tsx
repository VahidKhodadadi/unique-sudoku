import { Difficulty } from "../types";

interface DrawerMenuProps {
  open: boolean;
  difficulty: Difficulty;
  onClose: () => void;
  onNewGame: () => void;
  onChooseDifficulty: (level: Difficulty) => void;
}

export default function DrawerMenu({ open, difficulty, onClose, onNewGame, onChooseDifficulty }: DrawerMenuProps) {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-72 transform bg-slate-950 p-5 text-white transition duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Game menu</h2>
        <button type="button" onClick={onClose} className="text-slate-400 hover:text-white">
          Close
        </button>
      </div>
      <div className="mt-6 space-y-4">
        <button
          type="button"
          onClick={onNewGame}
          className="w-full rounded-2xl bg-slate-800 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Restart current difficulty
        </button>

        <div className="rounded-2xl bg-slate-800 p-4">
          <h3 className="text-sm font-semibold text-slate-200">Difficulty</h3>
          <div className="mt-3 flex flex-col gap-3">
            {(["easy", "medium", "hard"] as Difficulty[]).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => {
                  onChooseDifficulty(level);
                  onClose();
                }}
                className={`rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                  difficulty === level
                    ? "bg-slate-50 text-slate-950"
                    : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-slate-800 p-4 text-sm text-slate-300">
          <p className="font-semibold text-slate-100">Hints</p>
          <p className="mt-3 leading-relaxed">
            Select a cell, then choose a number to fill it. Too many mistakes and the game ends.
          </p>
        </div>
      </div>
    </div>
  );
}
