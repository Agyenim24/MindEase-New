-- ================================================================
-- MindEase Complete Community Discussion SQL Schema & RLS Policies
-- ================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. DISCUSSIONS / POSTS TABLE
CREATE TABLE IF NOT EXISTS public.posts (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title        TEXT NOT NULL DEFAULT '',
  content      TEXT NOT NULL,
  category     TEXT DEFAULT 'General',
  tag          TEXT DEFAULT 'General',
  is_anonymous BOOLEAN DEFAULT FALSE,
  likes_count  INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure category and is_anonymous columns exist if table was previously created
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'General';
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS is_anonymous BOOLEAN DEFAULT FALSE;

-- 2. DISCUSSION REACTIONS TABLE
CREATE TABLE IF NOT EXISTS public.reactions (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id       UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reaction_type TEXT NOT NULL DEFAULT 'like',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_user_post_reaction UNIQUE (post_id, user_id, reaction_type)
);

-- 3. DISCUSSION COMMENTS TABLE
CREATE TABLE IF NOT EXISTS public.comments (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id      UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  user_id      UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content      TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure is_anonymous column exists on comments
ALTER TABLE public.comments ADD COLUMN IF NOT EXISTS is_anonymous BOOLEAN DEFAULT FALSE;

-- 4. CONTENT REPORTS TABLE
CREATE TABLE IF NOT EXISTS public.reports (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  post_id          UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  comment_id       UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  reason           TEXT NOT NULL,
  status           TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'dismissed', 'actioned')),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- 6. STRICT RLS POLICIES FOR POSTS / DISCUSSIONS
DROP POLICY IF EXISTS "Authenticated users can read posts" ON public.posts;
CREATE POLICY "Authenticated users can read posts"
  ON public.posts FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own posts" ON public.posts;
CREATE POLICY "Users can insert their own posts"
  ON public.posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own posts" ON public.posts;
CREATE POLICY "Users can update their own posts"
  ON public.posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own posts" ON public.posts;
CREATE POLICY "Users can delete their own posts"
  ON public.posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 7. STRICT RLS POLICIES FOR REACTIONS
DROP POLICY IF EXISTS "Authenticated users can read reactions" ON public.reactions;
CREATE POLICY "Authenticated users can read reactions"
  ON public.reactions FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own reactions" ON public.reactions;
CREATE POLICY "Users can insert their own reactions"
  ON public.reactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own reactions" ON public.reactions;
CREATE POLICY "Users can delete their own reactions"
  ON public.reactions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 8. STRICT RLS POLICIES FOR COMMENTS
DROP POLICY IF EXISTS "Authenticated users can read comments" ON public.comments;
CREATE POLICY "Authenticated users can read comments"
  ON public.comments FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own comments" ON public.comments;
CREATE POLICY "Users can insert their own comments"
  ON public.comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own comments" ON public.comments;
CREATE POLICY "Users can update their own comments"
  ON public.comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own comments" ON public.comments;
CREATE POLICY "Users can delete their own comments"
  ON public.comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 9. STRICT RLS POLICIES FOR REPORTS
DROP POLICY IF EXISTS "Users can insert their own reports" ON public.reports;
CREATE POLICY "Users can insert their own reports"
  ON public.reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reporter_user_id);

-- 10. REALTIME PUBLICATION SETUP
ALTER PUBLICATION supabase_realtime ADD TABLE public.posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;
