-- ================================================================
-- Supabase Migration: Daily Mood Check-ins & Streak Table
-- ================================================================

CREATE TABLE IF NOT EXISTS public.daily_mood_checkins (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood          TEXT NOT NULL,
  note          TEXT DEFAULT '',
  check_in_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_user_checkin_date UNIQUE (user_id, check_in_date)
);

-- Index for fast user_id and date lookup
CREATE INDEX IF NOT EXISTS idx_daily_mood_checkins_user_date 
  ON public.daily_mood_checkins(user_id, check_in_date DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.daily_mood_checkins ENABLE ROW LEVEL SECURITY;

-- RLS Policy: SELECT own check-ins
DROP POLICY IF EXISTS "Users select own daily mood checkins" ON public.daily_mood_checkins;
CREATE POLICY "Users select own daily mood checkins"
  ON public.daily_mood_checkins FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policy: INSERT own check-ins
DROP POLICY IF EXISTS "Users insert own daily mood checkins" ON public.daily_mood_checkins;
CREATE POLICY "Users insert own daily mood checkins"
  ON public.daily_mood_checkins FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: UPDATE own check-ins (when editing today's check-in)
DROP POLICY IF EXISTS "Users update own daily mood checkins" ON public.daily_mood_checkins;
CREATE POLICY "Users update own daily mood checkins"
  ON public.daily_mood_checkins FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: DELETE own check-ins
DROP POLICY IF EXISTS "Users delete own daily mood checkins" ON public.daily_mood_checkins;
CREATE POLICY "Users delete own daily mood checkins"
  ON public.daily_mood_checkins FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Development fallback policies for anon role (if required for local dev without auth JWT)
DROP POLICY IF EXISTS "Anon select daily mood checkins" ON public.daily_mood_checkins;
CREATE POLICY "Anon select daily mood checkins" ON public.daily_mood_checkins FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Anon insert daily mood checkins" ON public.daily_mood_checkins;
CREATE POLICY "Anon insert daily mood checkins" ON public.daily_mood_checkins FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Anon update daily mood checkins" ON public.daily_mood_checkins;
CREATE POLICY "Anon update daily mood checkins" ON public.daily_mood_checkins FOR UPDATE TO anon USING (true);
