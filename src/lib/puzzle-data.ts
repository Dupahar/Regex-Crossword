export const initialPuzzles = [
  {
    title: 'Hello Regex',
    description: 'Learn the basics of regex with simple letter matching',
    difficulty: 'beginner' as const,
    size: 3,
    grid_data: {
      // Simple, solvable literal patterns (these are valid regexes)
      rows: ['CAT', 'ONE', 'PIN'],
      columns: ['COP', 'ANI', 'TEN']
    },
    // Grid:
    // C A T
    // O N E
    // P I N
    solution: 'CATONEPIN',
    category: 'tutorial',
    is_official: true
  },
  {
    title: 'Number Patterns',
    description: 'Match digits and numbers',
    difficulty: 'beginner' as const,
    size: 3,
    grid_data: {
      // Rows expect: 3 letters / 3 digits / Letter-Digit-Letter
      rows: ['[A-Z]{3}', '\\d{3}', '[A-Z]\\d[A-Z]'],
      // Columns must be consistent with the rows/solution.
      // Col 1: Letter-Digit-Letter (T1R)
      // Col 2: Letter-Digit-Digit (O28) — fixed so O28 is valid
      // Col 3: Letter-Digit-Letter (P3S)
      columns: ['[A-Z]\\d[A-Z]', '[A-Z]\\d\\d', '[A-Z]\\d[A-Z]']
    },
    // SOL:
    // T O P
    // 1 2 3
    // R 8 S
    solution: 'TOP123R8S',
    category: 'numbers',
    is_official: true
  },
  {
    title: 'Vowels & Consonants',
    description: 'Practice with character classes',
    difficulty: 'intermediate' as const,
    size: 4,
    grid_data: {
      // Each pattern matches exactly 4 characters
      rows: ['[AEIOU]{4}', '[^AEIOU]{4}', '[AEIOU]{2}[^AEIOU]{2}', '[A-Z]{4}'],
      columns: [
        '[A-Z]{4}',
        '[AEIOU][^AEIOU][AEIOU][^AEIOU]',
        '[AEIOU][^AEIOU]{2}[AEIOU]',
        '[AEIOU][^AEIOU]{3}'
      ]
    },
    // SOL:
    // AEIO
    // XYZQ
    // EEFF
    // GHIJ
    solution: 'AEIOXYZQEEFFGHIJ',
    category: 'letters',
    is_official: true
  },
  {
    title: 'Mixed Challenge',
    description: 'Combine letters, numbers, and special patterns',
    difficulty: 'intermediate' as const,
    size: 4,
    grid_data: {
      // Rows and columns deliberately chosen to be solvable
      rows: ['[A-Z]\\d[A-Z]\\d', '\\d[A-Z]\\d[A-Z]', '\\d{2}[A-Z]{2}', '\\d{2}[A-Z]{2}'],
      columns: ['[A-Z]\\d{3}', '\\d[A-Z]\\d{2}', '[A-Z\\d]{4}', '\\d[A-Z]{3}']
    },
    // SOL:
    // A1B2
    // 3C4D
    // 56EF
    // 78GH
    solution: 'A1B23C4D56EF78GH',
    category: 'mixed',
    is_official: true
  },
  {
    title: 'Advanced Quantifiers',
    description: 'Master quantifiers and repetition',
    difficulty: 'advanced' as const,
    size: 5,
    grid_data: {
      // Patterns sized for 5-character rows/columns
      rows: ['[ABC]{5}', '[A-C]{3}[A-Z]{2}', '[ABC]{5}', '[A-Z]{5}', '[A-Z]{5}'],
      columns: ['[ABC]{5}', '[A-Z]{5}', '[A-C]{3}[A-Z]{2}', '[ABC]{2}[A-Z]{3}', '[A-Z]{5}']
    },
    // SOL (5x5):
    // ABCAB
    // BCABC
    // ABCAB
    // AAAAA
    // BBBBB
    solution: 'ABCABBCABCABCABAAAAABBBBB',
    category: 'advanced',
    is_official: true
  },
  {
    title: 'Hex Colors',
    description: 'Match hexadecimal color codes',
    difficulty: 'advanced' as const,
    size: 4,
    grid_data: {
      // Use 0-9A-F (uppercase hex) and ensure 4 characters per row/column
      rows: ['[0-9A-F]{4}', '[0-9A-F]{4}', '[A-F0-9]{4}', '[0-9A-F]{4}'],
      columns: ['[A-F0-9]{4}', '[0-9A-F]{4}', '[0-9A-F]{4}', '[A-F0-9]{4}']
    },
    // SOL (4x4):
    // A1B2
    // C3D4
    // E5F6
    // 0123
    solution: 'A1B2C3D4E5F60123',
    category: 'hex',
    is_official: true
  }
];
