import { Moon, Sun, Trophy, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  hintsRemaining?: number;
  streak?: number;
}

export function Header({ hintsRemaining = 10, streak = 0 }: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white">R</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Regex Crossword
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <span className="font-semibold text-yellow-900 dark:text-yellow-100">
                {hintsRemaining} hints
              </span>
            </div>

            {streak > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Trophy className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <span className="font-semibold text-orange-900 dark:text-orange-100">
                  {streak} day streak
                </span>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
