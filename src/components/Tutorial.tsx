import { useState } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

interface TutorialProps {
  onClose: () => void;
}

const tutorialSteps = [
  {
    title: 'Welcome to Regex Crossword!',
    content: 'Learn regular expressions through interactive puzzles. Each puzzle is a grid where rows and columns must match specific regex patterns.',
    image: '🎯',
  },
  {
    title: 'How It Works',
    content: 'Fill each cell with a letter or number. The string formed by each row must match the regex pattern on its left. The string formed by each column must match the pattern above it.',
    image: '📝',
  },
  {
    title: 'Color Feedback',
    content: 'Green means the pattern is satisfied. Gray means incomplete. Your goal is to make all rows and columns green!',
    image: '🎨',
  },
  {
    title: 'Keyboard Navigation',
    content: 'Use arrow keys to move between cells. Tab to go forward, Shift+Tab to go back. Type letters or numbers directly.',
    image: '⌨️',
  },
  {
    title: 'Need Help?',
    content: 'Click the "Hint" button to reveal a cell. Hover over regex patterns to see explanations. Start with beginner puzzles to learn the basics!',
    image: '💡',
  },
];

export function Tutorial({ onClose }: TutorialProps) {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const current = tutorialSteps[step];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{current.image}</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {current.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {current.content}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className="px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex gap-2">
            {tutorialSteps.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === step
                    ? 'bg-blue-500 w-8'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextStep}
            className="px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
          >
            {step < tutorialSteps.length - 1 ? 'Next' : 'Get Started'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
