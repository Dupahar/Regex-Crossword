export class RegexEngine {
  static validatePattern(pattern: string, testString: string): boolean {
    try {
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(testString);
    } catch (error) {
      console.error('Invalid regex pattern:', error);
      return false;
    }
  }

  static validateGrid(grid: string[][], rowPatterns: string[], colPatterns: string[]): {
    rows: boolean[];
    columns: boolean[];
    isComplete: boolean;
  } {
    const size = grid.length;
    const rows = new Array(size).fill(false);
    const columns = new Array(size).fill(false);

    for (let i = 0; i < size; i++) {
      const rowString = grid[i].join('');
      if (rowString.length === size && !rowString.includes('')) {
        rows[i] = this.validatePattern(rowPatterns[i], rowString);
      }
    }

    for (let j = 0; j < size; j++) {
      const colString = grid.map(row => row[j] || '').join('');
      if (colString.length === size && !colString.includes('')) {
        columns[j] = this.validatePattern(colPatterns[j], colString);
      }
    }

    const isComplete = rows.every(r => r) && columns.every(c => c);

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
        if (!grid[i][j] || grid[i][j] !== solutionGrid[i][j]) {
          if (level === 1) {
            return { row: i, col: j };
          } else if (level === 2) {
            return { row: i, col: j, hint: `Character type: ${this.getCharType(solutionGrid[i][j])}` };
          } else if (level >= 3) {
            return { row: i, col: j, hint: solutionGrid[i][j] };
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
      if (pattern.includes(key)) {
        explanation += `${key} (${explanations[key]}), `;
      }
    }

    return explanation.slice(0, -2) || 'Custom pattern';
  }
}
