export class RegexEngine {
  static validatePattern(pattern: string, testString: string): boolean {
    try {
      // protect if pattern is unexpectedly empty/null
      if (!pattern) {
        console.warn('[RegexEngine] validatePattern called with empty pattern');
        return false;
      }
      // Use try/catch in case the pattern is invalid
      const regex = new RegExp(`^${pattern}$`);
      const result = regex.test(testString);
      // log for debugging — remove or reduce verbosity in production
      console.debug(`[RegexEngine] pattern: /${pattern}/, testString: "${testString}", result: ${result}`);
      return result;
    } catch (error) {
      console.error('[RegexEngine] Invalid regex pattern:', pattern, error);
      return false;
    }
  }

  static validateGrid(
    grid: string[][],
    rowPatterns: string[],
    colPatterns: string[]
  ): { rows: boolean[]; columns: boolean[]; isComplete: boolean } {
    const size = grid.length;
    const rows = new Array(size).fill(false);
    const columns = new Array(size).fill(false);

    // Sanity checks
    if (rowPatterns.length !== size) {
      console.warn(`[RegexEngine] rowPatterns.length (${rowPatterns.length}) !== grid size (${size}).`);
    }
    if (colPatterns.length !== size) {
      console.warn(`[RegexEngine] colPatterns.length (${colPatterns.length}) !== grid size (${size}).`);
    }

    // Helper: consider a cell filled only if it is not null/undefined/empty string
    const isCellFilled = (cell: any) => cell !== null && cell !== undefined && cell !== '';

    // Validate rows
    for (let i = 0; i < size; i++) {
      const row = grid[i] || [];
      const isRowFull = row.length === size && row.every(isCellFilled);
      const rowString = row.map(c => (c == null ? '' : String(c))).join('');
      if (!isRowFull) {
        console.debug(`[RegexEngine] row ${i} not full -> "${rowString}"`);
        rows[i] = false;
      } else {
        const pattern = rowPatterns[i] || '';
        rows[i] = this.validatePattern(pattern, rowString);
        if (!rows[i]) {
          console.info(`[RegexEngine] row ${i} failed pattern. pattern="${pattern}" rowString="${rowString}"`);
        }
      }
    }

    // Validate columns
    for (let j = 0; j < size; j++) {
      const colCells: string[] = [];
      for (let i = 0; i < size; i++) {
        const cell = (grid[i] && grid[i][j]) ?? '';
        colCells.push(cell);
      }
      const isColFull = colCells.length === size && colCells.every(isCellFilled);
      const colString = colCells.map(c => (c == null ? '' : String(c))).join('');
      if (!isColFull) {
        console.debug(`[RegexEngine] col ${j} not full -> "${colString}"`);
        columns[j] = false;
      } else {
        const pattern = colPatterns[j] || '';
        columns[j] = this.validatePattern(pattern, colString);
        if (!columns[j]) {
          console.info(`[RegexEngine] col ${j} failed pattern. pattern="${pattern}" colString="${colString}"`);
        }
      }
    }

    const isComplete = rows.every(r => r) && columns.every(c => c);
    console.debug(`[RegexEngine] validateGrid result rows=${JSON.stringify(rows)}, cols=${JSON.stringify(columns)}, isComplete=${isComplete}`);
    return { rows, columns, isComplete };
  }

  static getHint(
    grid: string[][],
    solution: string,
    level: number
  ): { row: number; col: number; hint?: string } | null {
    const size = grid.length;
    const solutionGrid = this.stringToGrid(solution, size);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        // Check for empty string OR incorrect character
        const current = grid[i] && grid[i][j];
        const expected = solutionGrid[i][j];
        if (current === '' || current === undefined || current !== expected) {
          if (level === 1) {
            return { row: i, col: j };
          } else if (level === 2) {
            return { row: i, col: j, hint: `Character type: ${this.getCharType(expected)}` };
          } else if (level >= 3) {
            return { row: i, col: j, hint: expected };
          }
        }
      }
    }

    return null;
  }

  private static getCharType(char: string): string {
    if (/[A-Z]/.test(char)) return 'Uppercase letter';
    if (/[a-z]/.test(char)) return 'Lowercase letter';
    if (/\d/.test(char)) return 'Digit';
    if (/\s/.test(char)) return 'Space';
    return 'Special character';
  }

  static stringToGrid(solution: string, size: number): string[][] {
    const grid: string[][] = [];
    for (let i = 0; i < size; i++) {
      grid.push([]);
      for (let j = 0; j < size; j++) {
        grid[i][j] = solution[i * size + j] || '';
      }
    }
    return grid;
  }

  static gridToString(grid: string[][]): string {
    return grid.map(row => row.join('')).join('');
  }

  static explainPattern(pattern: string): string {
    const explanations: { [key: string]: string } = {
      '.': 'Any character',
      '\\d': 'Any digit (0-9)',
      '\\D': 'Any non-digit',
      '\\w': 'Any word character (a-z, A-Z, 0-9, _)',
      '\\W': 'Any non-word character',
      '\\s': 'Any whitespace',
      '\\S': 'Any non-whitespace',
      '*': 'Zero or more of previous',
      '+': 'One or more of previous',
      '?': 'Zero or one of previous',
      '^': 'Start of string',
      '$': 'End of string',
    };

    let explanation = 'Pattern: ';
    for (const key in explanations) {
      if (Object.prototype.hasOwnProperty.call(explanations, key) && pattern.includes(key)) {
        explanation += `${key} (${explanations[key]}), `;
      }
    }

    return explanation.slice(0, -2) || 'Custom pattern';
  }
}
