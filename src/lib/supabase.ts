import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Puzzle = {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'master';
  size: number;
  grid_data: {
    rows: string[];
    columns: string[];
  };
  solution: string;
  category: string;
  is_official: boolean;
  play_count: number;
  completion_count: number;
  average_time: number;
  rating: number;
  rating_count: number;
  created_at: string;
};

export type UserProgress = {
  id: string;
  user_id: string;
  puzzle_id: string;
  current_state: { grid: string[][] };
  is_completed: boolean;
  completion_time: number;
  hints_used: number;
  started_at: string;
  completed_at?: string;
};

export type UserProfile = {
  id: string;
  username?: string;
  display_name: string;
  total_puzzles_completed: number;
  hint_balance: number;
  current_streak: number;
  skill_level: number;
  preferences: {
    theme: 'light' | 'dark';
    showTimer: boolean;
    autoValidate: boolean;
  };
};
