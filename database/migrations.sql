-- ================================================================
-- MindEase Community Social Discussion Schema (Supabase PostgreSQL)
-- ================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. POSTS TABLE
CREATE TABLE IF NOT EXISTS public.posts (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title       TEXT NOT NULL DEFAULT '',
  content     TEXT NOT NULL,
  tag         TEXT DEFAULT 'General',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. REACTIONS TABLE
CREATE TABLE IF NOT EXISTS public.reactions (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id       UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reaction_type TEXT NOT NULL DEFAULT 'like',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_post_reaction UNIQUE (post_id, user_id, reaction_type)
);

-- 3. COMMENTS TABLE
CREATE TABLE IF NOT EXISTS public.comments (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id     UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 4. REPORTS TABLE
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

-- 6. RLS POLICIES FOR POSTS
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

-- 7. RLS POLICIES FOR REACTIONS
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

-- 8. RLS POLICIES FOR COMMENTS
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

-- 9. RLS POLICIES FOR REPORTS
DROP POLICY IF EXISTS "Users can insert their own reports" ON public.reports;
CREATE POLICY "Users can insert their own reports"
  ON public.reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reporter_user_id);

DROP POLICY IF EXISTS "Users can view their own reports" ON public.reports;
CREATE POLICY "Users can view their own reports"
  ON public.reports FOR SELECT
  TO authenticated
  USING (auth.uid() = reporter_user_id);

-- 10. ANON DEVELOPMENT POLICIES
DROP POLICY IF EXISTS "Anon read posts" ON public.posts;
CREATE POLICY "Anon read posts" ON public.posts FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "Anon insert posts" ON public.posts;
CREATE POLICY "Anon insert posts" ON public.posts FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "Anon update posts" ON public.posts;
CREATE POLICY "Anon update posts" ON public.posts FOR UPDATE TO anon USING (true);
DROP POLICY IF EXISTS "Anon delete posts" ON public.posts;
CREATE POLICY "Anon delete posts" ON public.posts FOR DELETE TO anon USING (true);

DROP POLICY IF EXISTS "Anon read reactions" ON public.reactions;
CREATE POLICY "Anon read reactions" ON public.reactions FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "Anon insert reactions" ON public.reactions;
CREATE POLICY "Anon insert reactions" ON public.reactions FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "Anon delete reactions" ON public.reactions;
CREATE POLICY "Anon delete reactions" ON public.reactions FOR DELETE TO anon USING (true);

DROP POLICY IF EXISTS "Anon read comments" ON public.comments;
CREATE POLICY "Anon read comments" ON public.comments FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "Anon insert comments" ON public.comments;
CREATE POLICY "Anon insert comments" ON public.comments FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "Anon update comments" ON public.comments;
CREATE POLICY "Anon update comments" ON public.comments FOR UPDATE TO anon USING (true);
DROP POLICY IF EXISTS "Anon delete comments" ON public.comments;
CREATE POLICY "Anon delete comments" ON public.comments FOR DELETE TO anon USING (true);

DROP POLICY IF EXISTS "Anon insert reports" ON public.reports;
CREATE POLICY "Anon insert reports" ON public.reports FOR INSERT TO anon WITH CHECK (true);

-- 11. ENABLE REALTIME FOR COMMUNITY TABLES
ALTER PUBLICATION supabase_realtime ADD TABLE public.posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;

-- ================================================================
-- ChatGPT-Style Multi-Session Chat Schema & RLS Policies
-- ================================================================

-- 12. CHAT SESSIONS TABLE
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title      TEXT NOT NULL DEFAULT 'New Chat',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. CHAT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES public.chat_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id    UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  sender     TEXT NOT NULL CHECK (sender IN ('user', 'assistant', 'bot')),
  content    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. ENABLE RLS FOR CHAT TABLES
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- 15. RLS POLICIES FOR CHAT_SESSIONS
DROP POLICY IF EXISTS "Users select own sessions" ON public.chat_sessions;
CREATE POLICY "Users select own sessions" ON public.chat_sessions FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own sessions" ON public.chat_sessions;
CREATE POLICY "Users insert own sessions" ON public.chat_sessions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users update own sessions" ON public.chat_sessions;
CREATE POLICY "Users update own sessions" ON public.chat_sessions FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users delete own sessions" ON public.chat_sessions;
CREATE POLICY "Users delete own sessions" ON public.chat_sessions FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 16. RLS POLICIES FOR CHAT_MESSAGES
DROP POLICY IF EXISTS "Users select own messages" ON public.chat_messages;
CREATE POLICY "Users select own messages" ON public.chat_messages FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own messages" ON public.chat_messages;
CREATE POLICY "Users insert own messages" ON public.chat_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users update own messages" ON public.chat_messages;
CREATE POLICY "Users update own messages" ON public.chat_messages FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users delete own messages" ON public.chat_messages;
CREATE POLICY "Users delete own messages" ON public.chat_messages FOR DELETE TO authenticated USING (auth.uid() = user_id);

