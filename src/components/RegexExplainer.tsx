import { Info } from 'lucide-react';

interface RegexExplainerProps {
  pattern: string;
}

const regexPatterns: { pattern: string; name: string; description: string; example: string }[] = [
  { pattern: '.', name: 'Dot', description: 'Matches any single character', example: 'a, 1, @' },
  { pattern: '\\d', name: 'Digit', description: 'Matches any digit (0-9)', example: '0, 5, 9' },
  { pattern: '\\D', name: 'Non-digit', description: 'Matches any non-digit', example: 'a, @, _' },
  { pattern: '\\w', name: 'Word character', description: 'Matches letters, digits, underscore', example: 'a, Z, 5, _' },
  { pattern: '\\W', name: 'Non-word', description: 'Matches non-word characters', example: '@, !, space' },
  { pattern: '\\s', name: 'Whitespace', description: 'Matches spaces, tabs, newlines', example: 'space, tab' },
  { pattern: '\\S', name: 'Non-whitespace', description: 'Matches any non-whitespace', example: 'a, 1, @' },
  { pattern: '*', name: 'Zero or more', description: 'Matches 0 or more of previous', example: 'a* matches "", "a", "aaa"' },
  { pattern: '+', name: 'One or more', description: 'Matches 1 or more of previous', example: 'a+ matches "a", "aaa"' },
  { pattern: '?', name: 'Zero or one', description: 'Matches 0 or 1 of previous', example: 'a? matches "", "a"' },
  { pattern: '{n}', name: 'Exactly n', description: 'Matches exactly n times', example: 'a{3} matches "aaa"' },
  { pattern: '{n,}', name: 'n or more', description: 'Matches n or more times', example: 'a{2,} matches "aa", "aaa"' },
  { pattern: '{n,m}', name: 'Between n and m', description: 'Matches between n and m times', example: 'a{2,4} matches "aa" to "aaaa"' },
  { pattern: '[abc]', name: 'Character class', description: 'Matches any character in brackets', example: '[abc] matches a, b, or c' },
  { pattern: '[^abc]', name: 'Negated class', description: 'Matches any character NOT in brackets', example: '[^abc] matches d, e, f, etc' },
  { pattern: '[a-z]', name: 'Range', description: 'Matches any character in range', example: '[a-z] matches any lowercase letter' },
  { pattern: '^', name: 'Start anchor', description: 'Matches start of string', example: '^a matches "abc" not "bac"' },
  { pattern: '$', name: 'End anchor', description: 'Matches end of string', example: 'a$ matches "ba" not "ab"' },
  { pattern: '|', name: 'Alternation', description: 'Matches either left or right', example: 'cat|dog matches "cat" or "dog"' },
  { pattern: '()', name: 'Capture group', description: 'Groups patterns together', example: '(ab)+ matches "ab", "abab"' },
];

export function RegexExplainer({ pattern }: RegexExplainerProps) {
  const matchedPatterns = regexPatterns.filter(p => {
    const escaped = p.pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(escaped).test(pattern);
  });

  if (matchedPatterns.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="font-semibold text-blue-900 dark:text-blue-100">Pattern Breakdown</h3>
      </div>

      <div className="space-y-2">
        {matchedPatterns.map((p, idx) => (
          <div key={idx} className="text-sm">
            <div className="flex items-baseline gap-2">
              <code className="px-2 py-1 bg-white dark:bg-gray-800 rounded font-mono text-blue-600 dark:text-blue-400">
                {p.pattern}
              </code>
              <span className="font-semibold text-gray-900 dark:text-white">{p.name}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 ml-2 mt-1">{p.description}</p>
            <p className="text-gray-500 dark:text-gray-400 ml-2 text-xs italic">Example: {p.example}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
