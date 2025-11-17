import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { GameGrid } from './components/GameGrid';
import { PuzzleCard } from './components/PuzzleCard';
import { RegexExplainer } from './components/RegexExplainer';
import { Tutorial } from './components/Tutorial';
import { initialPuzzles } from './lib/puzzle-data';
import { Home, BookOpen } from 'lucide-react';

type View = 'home' | 'puzzle' | 'library';

function App() {
  const [view, setView] = useState<View>('home');
  const [selectedPuzzleIndex, setSelectedPuzzleIndex] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [hintsRemaining, setHintsRemaining] = useState(10);
  const [completedPuzzles, setCompletedPuzzles] = useState<Set<number>>(new Set());

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const currentPuzzle = initialPuzzles[selectedPuzzleIndex];

  const handlePuzzleSelect = (index: number) => {
    setSelectedPuzzleIndex(index);
    setView('puzzle');
  };

  const handlePuzzleComplete = () => {
    setCompletedPuzzles(prev => new Set(prev).add(selectedPuzzleIndex));
  };

  const handleHintUsed = () => {
    if (hintsRemaining > 0) {
      setHintsRemaining(prev => prev - 1);
    }
  };

  const renderHome = () => (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Master Regular Expressions Through Play
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Solve interactive regex puzzles, learn pattern matching, and become a regex expert
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={() => setView('library')}
          className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
        >
          Browse Puzzles
        </button>
        <button
          onClick={() => setShowTutorial(true)}
          className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
        >
          How to Play
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {initialPuzzles.slice(0, 3).map((puzzle, idx) => (
          <PuzzleCard
            key={idx}
            title={puzzle.title}
            description={puzzle.description}
            difficulty={puzzle.difficulty}
            size={puzzle.size}
            playCount={Math.floor(Math.random() * 1000)}
            rating={4 + Math.random()}
            isCompleted={completedPuzzles.has(idx)}
            onClick={() => handlePuzzleSelect(idx)}
          />
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to Start?</h3>
        <p className="text-lg mb-6 opacity-90">
          Start with beginner puzzles and work your way up to master level challenges
        </p>
        <button
          onClick={() => handlePuzzleSelect(0)}
          className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
        >
          Start First Puzzle
        </button>
      </div>
    </div>
  );

  const renderLibrary = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Puzzle Library</h2>
        <button
          onClick={() => setView('home')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
        >
          <Home className="w-5 h-5" />
          Home
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialPuzzles.map((puzzle, idx) => (
          <PuzzleCard
            key={idx}
            title={puzzle.title}
            description={puzzle.description}
            difficulty={puzzle.difficulty}
            size={puzzle.size}
            playCount={Math.floor(Math.random() * 1000)}
            rating={4 + Math.random()}
            isCompleted={completedPuzzles.has(idx)}
            onClick={() => handlePuzzleSelect(idx)}
          />
        ))}
      </div>
    </div>
  );

  const renderPuzzle = () => (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setView('library')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
        >
          <BookOpen className="w-5 h-5" />
          Back to Library
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => handlePuzzleSelect(Math.max(0, selectedPuzzleIndex - 1))}
            disabled={selectedPuzzleIndex === 0}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => handlePuzzleSelect(Math.min(initialPuzzles.length - 1, selectedPuzzleIndex + 1))}
            disabled={selectedPuzzleIndex === initialPuzzles.length - 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {currentPuzzle.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {currentPuzzle.description}
          </p>
          <div className="flex justify-center gap-3">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              currentPuzzle.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
              currentPuzzle.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
              currentPuzzle.difficulty === 'advanced' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
              'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
            }`}>
              {currentPuzzle.difficulty.charAt(0).toUpperCase() + currentPuzzle.difficulty.slice(1)}
            </span>
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              {currentPuzzle.size}x{currentPuzzle.size}
            </span>
          </div>
        </div>

        <GameGrid
          size={currentPuzzle.size}
          rowPatterns={currentPuzzle.grid_data.rows}
          columnPatterns={currentPuzzle.grid_data.columns}
          solution={currentPuzzle.solution}
          onComplete={handlePuzzleComplete}
          onHintUsed={handleHintUsed}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <RegexExplainer pattern={currentPuzzle.grid_data.rows.join(' ')} />
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Tips</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <li>• Start with the most restrictive patterns</li>
            <li>• Look for patterns that match fewer possibilities</li>
            <li>• Use arrow keys or Tab to navigate between cells</li>
            <li>• Hover over patterns to see explanations</li>
            <li>• Green = correct, Gray = incomplete</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header hintsRemaining={hintsRemaining} streak={completedPuzzles.size} />
        {view === 'home' && renderHome()}
        {view === 'library' && renderLibrary()}
        {view === 'puzzle' && renderPuzzle()}
      </div>

      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
    </>
  );
}

export default App;
