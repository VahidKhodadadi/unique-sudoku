export type Difficulty = "easy" | "medium" | "hard";
export type Cell = number;

export type SelectedCell = { row: number; col: number } | null;
export type GameStatus = "playing" | "won" | "lost";

export type PuzzleState = {
  puzzle: Cell[][];
  fixed: boolean[][];
};
