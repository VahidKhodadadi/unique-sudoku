import { Cell, Difficulty, PuzzleState } from "./types";

export const solution: Cell[][] = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const hiddenCounts: Record<Difficulty, number> = {
  easy: 30,
  medium: 40,
  hard: 50,
};

export function cloneGrid(grid: Cell[][]): Cell[][] {
  return grid.map((row) => [...row]);
}

export function initializePuzzle(difficulty: Difficulty): PuzzleState {
  const puzzle = cloneGrid(solution);
  const fixed: boolean[][] = Array.from({ length: 9 }, () => Array(9).fill(true));
  const totalHidden = hiddenCounts[difficulty];
  const hidden = new Set<string>();

  while (hidden.size < totalHidden) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    const key = `${row}-${col}`;
    if (!hidden.has(key)) {
      hidden.add(key);
      puzzle[row][col] = 0;
      fixed[row][col] = false;
    }
  }

  return { puzzle, fixed };
}

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}
