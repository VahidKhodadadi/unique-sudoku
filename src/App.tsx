import { useEffect, useMemo, useState } from "react";
import { Difficulty, SelectedCell, GameStatus, Cell } from "./types";
import { initializePuzzle, cloneGrid, solution } from "./game";
import TopBar from "./components/TopBar";
import DrawerMenu from "./components/DrawerMenu";
import StatusPanel from "./components/StatusPanel";
import SudokuBoard from "./components/SudokuBoard";
import ControlsSection from "./components/ControlsSection";
import NumberPicker from "./components/NumberPicker";

const mistakeThreshold = 3;

export default function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [mistakes, setMistakes] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [selectedCell, setSelectedCell] = useState<SelectedCell>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [initialPuzzle] = useState(() => initializePuzzle("easy"));
  const [grid, setGrid] = useState<Cell[][]>(() => initialPuzzle.puzzle);
  const [fixedGrid, setFixedGrid] = useState<boolean[][]>(() => initialPuzzle.fixed);
  const [startTime, setStartTime] = useState(Date.now());

  const statusMessage = useMemo(() => {
    if (gameStatus === "won") return "You won!";
    if (gameStatus === "lost") return "Too many mistakes.";
    return "Keep going.";
  }, [gameStatus]);

  useEffect(() => {
    if (gameStatus !== "playing") return;
    const timer = window.setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [gameStatus, startTime]);

  useEffect(() => {
    if (gameStatus !== "won" && gameStatus !== "lost") return;

    const promptText = gameStatus === "won" ? "You solved the Sudoku!" : "You reached the mistake limit.";
    if (window.confirm(`${promptText} Start a new game?`)) {
      startNewGame(difficulty);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus]);

  function startNewGame(level: Difficulty) {
    const { puzzle, fixed } = initializePuzzle(level);
    setDifficulty(level);
    setGrid(puzzle);
    setFixedGrid(fixed);
    setMistakes(0);
    setElapsedSeconds(0);
    setStartTime(Date.now());
    setSelectedCell(null);
    setGameStatus("playing");
  }

  function requestNewGame(level: Difficulty = difficulty) {
    const isActiveGame = gameStatus === "playing";
    const promptText =
      level === difficulty
        ? "Restart the current game? This will reset your progress."
        : `Start a new ${level} game? This will reset your progress.`;

    if (!isActiveGame || window.confirm(promptText)) {
      startNewGame(level);
    }
  }

  function handleChooseDifficulty(level: Difficulty) {
    requestNewGame(level);
  }

  function handleFillValue(value: number) {
    if (gameStatus !== "playing" || !selectedCell) return;
    const { row, col } = selectedCell;
    if (fixedGrid[row][col]) return;

    setGrid((currentGrid) => {
      const nextGrid = cloneGrid(currentGrid);
      const currentValue = nextGrid[row][col];
      if (currentValue === value) return currentGrid;

      nextGrid[row][col] = value;
      if (value !== solution[row][col]) {
        setMistakes((prev) => {
          const nextMistakes = prev + 1;
          if (nextMistakes >= mistakeThreshold) {
            setGameStatus("lost");
          }
          return nextMistakes;
        });
      }

      const allFilled = nextGrid.flat().every((cell) => cell !== 0);
      const isCorrect = nextGrid.flat().every((cell, index) => cell === solution[Math.floor(index / 9)][index % 9]);
      if (allFilled && isCorrect) {
        setGameStatus("won");
      }

      return nextGrid;
    });
  }

  function handleClearCell() {
    if (!selectedCell || gameStatus !== "playing") return;
    const { row, col } = selectedCell;
    if (fixedGrid[row][col]) return;
    setGrid((currentGrid) => {
      const nextGrid = cloneGrid(currentGrid);
      nextGrid[row][col] = 0;
      return nextGrid;
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="relative overflow-hidden">
        <TopBar onNewGame={requestNewGame} />
        {/* <DrawerMenu
          open={drawerOpen}
          difficulty={difficulty}
          onClose={() => setDrawerOpen(false)}
          onNewGame={requestNewGame}
          onChooseDifficulty={handleChooseDifficulty}
        /> */}
      </div>

      <main className="mx-auto max-w-6xl px-4 py-6 lg:px-8">
        <StatusPanel
          elapsedSeconds={elapsedSeconds}
          mistakes={mistakes}
          mistakeThreshold={mistakeThreshold}
          statusMessage={statusMessage}
          difficulty={difficulty}
          onChooseDifficulty={handleChooseDifficulty}
        />

        <SudokuBoard
          grid={grid}
          fixedGrid={fixedGrid}
          selectedCell={selectedCell}
          onSelectCell={(row, col) => setSelectedCell({ row, col })}
        />

        <NumberPicker onFillValue={handleFillValue} />

        <ControlsSection onNewGame={requestNewGame} onClearCell={handleClearCell} selectedCell={selectedCell} />
      </main>
    </div>
  );
}
