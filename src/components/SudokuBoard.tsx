import { Cell, SelectedCell } from "../types";
import { solution } from "../game";

interface SudokuBoardProps {
  grid: Cell[][];
  fixedGrid: boolean[][];
  selectedCell: SelectedCell;
  onSelectCell: (row: number, col: number) => void;
}

export default function SudokuBoard({ grid, fixedGrid, selectedCell, onSelectCell }: SudokuBoardProps) {
  return (
    <section className="mt-8 overflow-x-auto">
      <div className="inline-block rounded-[2rem] border border-slate-200 bg-white p-4 shadow-lg">
        <table className="border-separate border-spacing-0">
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => {
                  const isFixed = fixedGrid[rowIndex][colIndex];
                  const selected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                  const isIncorrect = cell !== 0 && !isFixed && cell !== solution[rowIndex][colIndex];
                  return (
                    <td
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => onSelectCell(rowIndex, colIndex)}
                      className={`h-14 w-14 cursor-pointer select-none border bg-white text-center align-middle text-lg font-semibold transition hover:bg-slate-100 sm:h-16 sm:w-16 ${
                        isFixed
                          ? "bg-slate-100 text-slate-900"
                          : isIncorrect
                          ? "bg-rose-100 text-rose-900"
                          : "bg-white text-slate-900"
                      } ${selected ? "ring-2 ring-emerald-500" : ""} ${
                        colIndex % 3 === 0 ? "border-l-2 border-slate-400" : "border-l border-slate-300"
                      } ${
                        rowIndex % 3 === 0 ? "border-t-2 border-slate-400" : "border-t border-slate-300"
                      } ${colIndex === 8 ? "border-r-2 border-slate-400" : ""} ${rowIndex === 8 ? "border-b-2 border-slate-400" : ""}`}
                    >
                      {cell || ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
