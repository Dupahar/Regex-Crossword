export const initialPuzzles = [
  {
    title: 'Hello Regex',
    description: 'Learn the basics of regex with simple letter matching',
    difficulty: 'beginner' as const,
    size: 3,
    grid_data: {
      rows: ['[CAT]', '[ART]', '[TIP]'],
      columns: ['[CAT]', '[RAP]', '[TIP]']
    },
    solution: 'CATART',
    category: 'tutorial',
    is_official: true
  },
  {
    title: 'Number Patterns',
    description: 'Match digits and numbers',
    difficulty: 'beginner' as const,
    size: 3,
    grid_data: {
      rows: ['[A-Z]+', '\\d+', '[A-Z]\\d'],
      columns: ['[A-Z]\\d', '[0-9A-Z]+', '[A-Z0-9]']
    },
    solution: 'AB123C4',
    category: 'numbers',
    is_official: true
  },
  {
    title: 'Vowels & Consonants',
    description: 'Practice with character classes',
    difficulty: 'intermediate' as const,
    size: 4,
    grid_data: {
      rows: ['[AEIOU]+', '[^AEIOU]+', '[AEIOU]{2}', '[A-Z]{4}'],
      columns: ['[A-Z]{4}', '[AEIOU]{2}', '[^AEIOU]{2}', '[A-Z]{4}']
    },
    solution: 'AEIOUXYZQAEIOUEFGH',
    category: 'letters',
    is_official: true
  },
  {
    title: 'Mixed Challenge',
    description: 'Combine letters, numbers, and special patterns',
    difficulty: 'intermediate' as const,
    size: 4,
    grid_data: {
      rows: ['[A-Z]\\d[A-Z]\\d', '\\d[A-Z]\\d[A-Z]', '[A-Z\\d]{4}', '\\d{2}[A-Z]{2}'],
      columns: ['[A-Z\\d]{4}', '[\\dA-Z]{4}', '[A-Z\\d]{4}', '[\\d]{2}[A-Z]{2}']
    },
    solution: 'A1B23C4D12EF',
    category: 'mixed',
    is_official: true
  },
  {
    title: 'Advanced Quantifiers',
    description: 'Master quantifiers and repetition',
    difficulty: 'advanced' as const,
    size: 5,
    grid_data: {
      rows: ['[ABC]{5}', '[A-C]{2,3}', '[ABC]+', '[A-Z]{3,}', '[A-Z]*'],
      columns: ['[ABC]{5}', '[A-Z]{4,}', '[A-C]{3}', '[ABC]{2,}', '[A-Z]{3}']
    },
    solution: 'ABCABCABCACBAAAAB',
    category: 'advanced',
    is_official: true
  },
  {
    title: 'Hex Colors',
    description: 'Match hexadecimal color codes',
    difficulty: 'advanced' as const,
    size: 4,
    grid_data: {
      rows: ['[0-9A-F]{4}', '[0-9A-F]{4}', '[A-F0-9]{4}', '[0-F]{4}'],
      columns: ['[A-F0-9]{4}', '[0-9A-F]{4}', '[0-9A-F]{4}', '[A-F0-9]{4}']
    },
    solution: 'A1B2C3D4E5F60123',
    category: 'hex',
    is_official: true
  }
];
