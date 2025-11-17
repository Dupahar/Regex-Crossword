import { Trophy, Clock, Star } from 'lucide-react';

interface PuzzleCardProps {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'master';
  size: number;
  playCount: number;
  rating: number;
  isCompleted?: boolean;
  onClick: () => void;
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  intermediate: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  advanced: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  expert: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  master: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
};

export function PuzzleCard({
  title,
  description,
  difficulty,
  size,
  playCount,
  rating,
  isCompleted,
  onClick,
}: PuzzleCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer p-6 border border-gray-200 dark:border-gray-700 hover:scale-105"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        {isCompleted && (
          <Trophy className="w-6 h-6 text-yellow-500" />
        )}
      </div>

      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[difficulty]}`}>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          {size}x{size}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{playCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}
