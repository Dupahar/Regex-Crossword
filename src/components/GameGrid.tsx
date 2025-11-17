import { useState, useEffect, useCallback } from 'react';
import { RegexEngine } from '../lib/regex-engine';

interface GameGridProps {
  size: number;
  rowPatterns: string[];
  columnPatterns: string[];
  solution: string;
  onComplete?: () => void;
  onHintUsed?: () => void;
}

export function GameGrid({
  size,
  rowPatterns,
  columnPatterns,
  solution,
  onComplete,
  onHintUsed,
}: GameGridProps) {
  const [grid, setGrid] = useState<string[][]>(() =>
    Array(size).fill(null).map(() => Array(size).fill(''))
  );
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number }>({ row: 0, col: 0 });
  const [validation, setValidation] = useState<{ rows: boolean[]; columns: boolean[] }>({
    rows: Array(size).fill(false),
    columns: Array(size).fill(false),
  });
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState<{ row: number; col: number; hint?: string } | null>(null);

  useEffect(() => {
    const result = RegexEngine.validateGrid(grid, rowPatterns, columnPatterns);
    setValidation({ rows: result.rows, columns: result.columns });

    if (result.isComplete && !isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [grid, rowPatterns, columnPatterns, isComplete, onComplete]);

  const handleCellChange = useCallback((row: number, col: number, value: string) => {
    const newValue = value.slice(-1).toUpperCase();
    setGrid(prev => {
      const newGrid = prev.map(r => [...r]);
      newGrid[row][col] = newValue;
      return newGrid;
    });
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, row: number, col: number) => {
    let newRow = row;
    let newCol = col;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        newRow = Math.max(0, row - 1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        newRow = Math.min(size - 1, row + 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newCol = Math.max(0, col - 1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        newCol = Math.min(size - 1, col + 1);
        break;
      case 'Backspace':
        handleCellChange(row, col, '');
        break;
      case 'Tab':
        e.preventDefault();
        if (e.shiftKey) {
          newCol = col - 1;
          if (newCol < 0) {
            newCol = size - 1;
            newRow = row - 1;
            if (newRow < 0) newRow = size - 1;
          }
        } else {
          newCol = col + 1;
          if (newCol >= size) {
            newCol = 0;
            newRow = row + 1;
            if (newRow >= size) newRow = 0;
          }
        }
        break;
      default:
        if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
          handleCellChange(row, col, e.key);
          newCol = Math.min(size - 1, col + 1);
        }
        return;
    }

    setSelectedCell({ row: newRow, col: newCol });
  }, [size, handleCellChange]);

  const handleHint = () => {
    const hint = RegexEngine.getHint(grid, solution, 3);
    if (hint) {
      setShowHint(hint);
      if (hint.hint) {
        handleCellChange(hint.row, hint.col, hint.hint);
      }
      onHintUsed?.();
      setTimeout(() => setShowHint(null), 3000);
    }
  };

  const handleClear = () => {
    setGrid(Array(size).fill(null).map(() => Array(size).fill('')));
    setIsComplete(false);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative inline-block">
        <div className="flex">
          <div style={{ width: '60px' }} />
          {columnPatterns.map((pattern, idx) => (
            <div
              key={`col-${idx}`}
              className={`w-16 h-16 flex items-center justify-center text-xs font-mono px-1 transition-colors ${
                validation.columns[idx] ? 'text-green-600 dark:text-green-400' : 'text-gray-500'
              }`}
              title={RegexEngine.explainPattern(pattern)}
            >
              <div className="text-center overflow-hidden text-ellipsis">{pattern}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          {grid.map((row, rowIdx) => (
            <div key={`row-${rowIdx}`} className="flex">
              <div
                className={`w-16 h-16 flex items-center justify-center text-xs font-mono px-1 transition-colors ${
                  validation.rows[rowIdx] ? 'text-green-600 dark:text-green-400' : 'text-gray-500'
                }`}
                title={RegexEngine.explainPattern(rowPatterns[rowIdx])}
              >
                <div className="text-center overflow-hidden text-ellipsis">{rowPatterns[rowIdx]}</div>
              </div>
              {row.map((cell, colIdx) => (
                <input
                  key={`cell-${rowIdx}-${colIdx}`}
                  type="text"
                  value={cell}
                  onChange={(e) => handleCellChange(rowIdx, colIdx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, rowIdx, colIdx)}
                  onFocus={() => setSelectedCell({ row: rowIdx, col: colIdx })}
                  className={`w-16 h-16 text-center text-2xl font-bold border-2 transition-all focus:outline-none ${
                    selectedCell.row === rowIdx && selectedCell.col === colIdx
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105 z-10'
                      : showHint?.row === rowIdx && showHint?.col === colIdx
                      ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                      : validation.rows[rowIdx] && validation.columns[colIdx]
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                  }`}
                  maxLength={1}
                  autoComplete="off"
                  spellCheck={false}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {isComplete && (
        <div className="animate-bounce text-4xl">
          🎉
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleHint}
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-colors"
        >
          💡 Hint
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
        >
          Clear
        </button>
      </div>

      {showHint && showHint.hint && (
        <div className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-500 rounded-lg text-sm">
          {showHint.hint}
        </div>
      )}
    </div>
  );
}
