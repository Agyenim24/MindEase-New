-- ================================================================
-- MindEase Program Enrollment & Activity Progress Schema
-- Supabase PostgreSQL DDL with Row Level Security (RLS)
-- ================================================================

-- 1. PROGRAM ENROLLMENTS TABLE
CREATE TABLE IF NOT EXISTS program_enrollments (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  program_id          TEXT NOT NULL,
  status              TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed')),
  current_activity    INTEGER NOT NULL DEFAULT 1,
  progress_percentage INTEGER NOT NULL DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  enrolled_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at        TIMESTAMPTZ,
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_user_program UNIQUE (user_id, program_id)
);

-- 2. PROGRAM ACTIVITY PROGRESS TABLE
CREATE TABLE IF NOT EXISTS program_activity_progress (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  program_id   TEXT NOT NULL,
  activity_id  TEXT NOT NULL,
  completed    BOOLEAN NOT NULL DEFAULT TRUE,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_user_activity UNIQUE (user_id, activity_id)
);

-- Enable RLS
ALTER TABLE program_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_activity_progress ENABLE ROW LEVEL SECURITY;

-- 3. RLS POLICIES FOR PROGRAM ENROLLMENTS
CREATE POLICY "Users can view own program enrollments"
  ON program_enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own program enrollments"
  ON program_enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own program enrollments"
  ON program_enrollments FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own program enrollments"
  ON program_enrollments FOR DELETE
  USING (auth.uid() = user_id);

-- 4. RLS POLICIES FOR PROGRAM ACTIVITY PROGRESS
CREATE POLICY "Users can view own activity progress"
  ON program_activity_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity progress"
  ON program_activity_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own activity progress"
  ON program_activity_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own activity progress"
  ON program_activity_progress FOR DELETE
  USING (auth.uid() = user_id);
