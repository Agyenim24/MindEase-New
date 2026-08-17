-- ================================================================
-- MindEase Full PostgreSQL Schema (Supabase)
-- ================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email          TEXT UNIQUE NOT NULL,
  password_hash  TEXT NOT NULL,
  name           TEXT NOT NULL DEFAULT '',
  avatar_url     TEXT DEFAULT '',
  bio            TEXT DEFAULT '',
  streak         INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- USER SETTINGS
CREATE TABLE IF NOT EXISTS user_settings (
  id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id                UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  email_notifications    BOOLEAN DEFAULT TRUE,
  sms_reminders          BOOLEAN DEFAULT FALSE,
  daily_checkin_reminder BOOLEAN DEFAULT TRUE,
  reminder_time          TIME DEFAULT '20:00',
  sound_effects          BOOLEAN DEFAULT TRUE,
  analytics_opt_in       BOOLEAN DEFAULT FALSE,
  privacy_level          TEXT DEFAULT 'Standard',
  dark_mode              BOOLEAN DEFAULT FALSE,
  language               TEXT DEFAULT 'en',
  created_at             TIMESTAMPTZ DEFAULT NOW(),
  updated_at             TIMESTAMPTZ DEFAULT NOW()
);

-- MOOD LOGS
CREATE TABLE IF NOT EXISTS mood_logs (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id   UUID REFERENCES users(id) ON DELETE CASCADE,
  emotion   TEXT NOT NULL,
  note      TEXT DEFAULT '',
  logged_at TIMESTAMPTZ DEFAULT NOW()
);

-- ASSESSMENTS
CREATE TABLE IF NOT EXISTS assessments (
  id                       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id                  UUID REFERENCES users(id) ON DELETE CASCADE,
  score                    INTEGER NOT NULL DEFAULT 0,
  level                    TEXT NOT NULL DEFAULT '',
  recommendation           TEXT DEFAULT '',
  primary_goal             TEXT,
  primary_goal_title       TEXT,
  emotional_state          TEXT,
  emotional_state_title    TEXT,
  sleep_quality            TEXT,
  sleep_quality_title      TEXT,
  support_preference       TEXT,
  support_preference_title TEXT,
  taken_at                 TIMESTAMPTZ DEFAULT NOW()
);

-- ASSESSMENT ANSWERS
CREATE TABLE IF NOT EXISTS assessment_answers (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
  step_index    INTEGER NOT NULL,
  option_id     TEXT NOT NULL,
  option_title  TEXT NOT NULL,
  points        INTEGER DEFAULT 0
);

-- CHAT SESSIONS
CREATE TABLE IF NOT EXISTS chat_sessions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  session_key TEXT UNIQUE NOT NULL,
  language    TEXT DEFAULT 'en',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  last_seen   TIMESTAMPTZ DEFAULT NOW()
);

-- CHAT MESSAGES
CREATE TABLE IF NOT EXISTS chat_messages (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id    UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  sender        TEXT NOT NULL CHECK (sender IN ('user', 'bot')),
  content       TEXT NOT NULL,
  emotion       TEXT,
  emotion_score FLOAT,
  is_crisis     BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- MESSAGE REACTIONS
CREATE TABLE IF NOT EXISTS message_reactions (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id UUID REFERENCES chat_messages(id) ON DELETE CASCADE,
  reaction   TEXT NOT NULL CHECK (reaction IN ('up', 'down')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROGRAMS
CREATE TABLE IF NOT EXISTS programs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           TEXT NOT NULL,
  category        TEXT NOT NULL DEFAULT '',
  instructor      TEXT NOT NULL DEFAULT '',
  duration        TEXT NOT NULL DEFAULT '',
  level           TEXT NOT NULL DEFAULT 'Beginner',
  description     TEXT DEFAULT '',
  image_url       TEXT DEFAULT '',
  recommended_for TEXT[] DEFAULT '{}',
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- PROGRAM MODULES
CREATE TABLE IF NOT EXISTS program_modules (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id   UUID REFERENCES programs(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  duration     TEXT DEFAULT '',
  type         TEXT NOT NULL DEFAULT 'article',
  sort_order   INTEGER DEFAULT 0,
  article_id   TEXT,
  breathing_id TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- USER ENROLLMENTS
CREATE TABLE IF NOT EXISTS user_enrollments (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  program_id  UUID REFERENCES programs(id) ON DELETE CASCADE,
  progress    INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, program_id)
);

-- MODULE COMPLETIONS
CREATE TABLE IF NOT EXISTS module_completions (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID REFERENCES users(id) ON DELETE CASCADE,
  module_id    UUID REFERENCES program_modules(id) ON DELETE CASCADE,
  mood_before  TEXT,
  mood_after   TEXT,
  reminder     TIME,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, module_id)
);

-- COMMUNITY POSTS
CREATE TABLE IF NOT EXISTS community_posts (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  content     TEXT NOT NULL,
  tag         TEXT DEFAULT 'General',
  likes_count INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- POST COMMENTS
CREATE TABLE IF NOT EXISTS post_comments (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id    UUID REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  content    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- POST LIKES
CREATE TABLE IF NOT EXISTS post_likes (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id    UUID REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (post_id, user_id)
);

-- RESOURCES
CREATE TABLE IF NOT EXISTS resources (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  category    TEXT NOT NULL DEFAULT '',
  tag         TEXT DEFAULT '',
  read_time   TEXT DEFAULT '',
  image_url   TEXT DEFAULT '',
  description TEXT DEFAULT '',
  content     TEXT DEFAULT '',
  type        TEXT DEFAULT 'article' CHECK (type IN ('article', 'video')),
  video_url   TEXT,
  guide       TEXT,
  duration    TEXT,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- SAVED RESOURCES
CREATE TABLE IF NOT EXISTS saved_resources (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
  saved_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, resource_id)
);

-- EMERGENCY CONTACTS
CREATE TABLE IF NOT EXISTS emergency_contacts (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  phone      TEXT NOT NULL,
  relation   TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SUPPORT TICKETS
CREATE TABLE IF NOT EXISTS support_tickets (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID REFERENCES users(id) ON DELETE SET NULL,
  ticket_ref TEXT UNIQUE NOT NULL,
  subject    TEXT NOT NULL,
  category   TEXT DEFAULT 'General',
  message    TEXT NOT NULL,
  status     TEXT DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- BADGES
CREATE TABLE IF NOT EXISTS badges (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT UNIQUE NOT NULL,
  description TEXT DEFAULT '',
  icon        TEXT DEFAULT 'star',
  color       TEXT DEFAULT 'text-amber-500 bg-amber-500/10',
  condition   TEXT DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- USER BADGES
CREATE TABLE IF NOT EXISTS user_badges (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id   UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_id  UUID REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, badge_id)
);
