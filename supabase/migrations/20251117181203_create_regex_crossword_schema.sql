-- Regex Crossword Game Database Schema
--
-- Overview: Complete database schema for a professional regex crossword platform
-- with user progress tracking, puzzle management, leaderboards, and social features.
--
-- Tables:
-- 1. puzzles - Stores all regex crossword puzzles with metadata
-- 2. user_progress - Tracks individual user progress on puzzles
-- 3. user_profiles - Extended user profile information
-- 4. leaderboards - Daily/weekly/all-time leaderboard entries
-- 5. achievements - Achievement definitions
-- 6. user_achievements - User achievement unlocks
-- 7. daily_challenges - Daily challenge puzzles

CREATE TABLE IF NOT EXISTS puzzles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  difficulty text NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced', 'expert', 'master')),
  size integer NOT NULL CHECK (size >= 2 AND size <= 10),
  grid_data jsonb NOT NULL,
  solution text NOT NULL,
  category text DEFAULT 'general',
  creator_id uuid,
  is_official boolean DEFAULT false,
  play_count integer DEFAULT 0,
  completion_count integer DEFAULT 0,
  average_time integer DEFAULT 0,
  rating numeric(3, 2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  rating_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  display_name text DEFAULT '',
  avatar_url text DEFAULT '',
  total_puzzles_completed integer DEFAULT 0,
  total_hints_used integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  total_playtime integer DEFAULT 0,
  skill_level integer DEFAULT 1 CHECK (skill_level >= 1 AND skill_level <= 100),
  hint_balance integer DEFAULT 10,
  preferences jsonb DEFAULT '{"theme": "dark", "showTimer": true, "autoValidate": true}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  puzzle_id uuid NOT NULL REFERENCES puzzles(id) ON DELETE CASCADE,
  current_state jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_completed boolean DEFAULT false,
  completion_time integer DEFAULT 0,
  hints_used integer DEFAULT 0,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, puzzle_id)
);

CREATE TABLE IF NOT EXISTS leaderboards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  puzzle_id uuid NOT NULL REFERENCES puzzles(id) ON DELETE CASCADE,
  completion_time integer NOT NULL,
  hints_used integer DEFAULT 0,
  score integer NOT NULL,
  leaderboard_type text NOT NULL CHECK (leaderboard_type IN ('daily', 'weekly', 'all_time')),
  rank integer,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text NOT NULL,
  icon text NOT NULL,
  category text NOT NULL,
  criteria jsonb NOT NULL,
  points integer DEFAULT 10,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id uuid NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at timestamptz DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

CREATE TABLE IF NOT EXISTS daily_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  puzzle_id uuid NOT NULL REFERENCES puzzles(id) ON DELETE CASCADE,
  challenge_date date NOT NULL UNIQUE,
  participant_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_puzzles_difficulty ON puzzles(difficulty);
CREATE INDEX IF NOT EXISTS idx_puzzles_category ON puzzles(category);
CREATE INDEX IF NOT EXISTS idx_puzzles_is_official ON puzzles(is_official);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_puzzle_id ON user_progress(puzzle_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_completed ON user_progress(is_completed);
CREATE INDEX IF NOT EXISTS idx_leaderboards_puzzle_id ON leaderboards(puzzle_id);
CREATE INDEX IF NOT EXISTS idx_leaderboards_type ON leaderboards(leaderboard_type);
CREATE INDEX IF NOT EXISTS idx_daily_challenges_date ON daily_challenges(challenge_date);

ALTER TABLE puzzles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Puzzles are publicly readable"
  ON puzzles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create puzzles"
  ON puzzles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update own puzzles"
  ON puzzles FOR UPDATE
  TO authenticated
  USING (auth.uid() = creator_id)
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Leaderboards are publicly readable"
  ON leaderboards FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert own leaderboard entries"
  ON leaderboards FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Achievements are publicly readable"
  ON achievements FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements"
  ON user_achievements FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Daily challenges are publicly readable"
  ON daily_challenges FOR SELECT
  TO public
  USING (true);