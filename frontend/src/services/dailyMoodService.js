const FLASK_API = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
  ? import.meta.env.VITE_API_URL
  : 'http://127.0.0.1:5000/api';


/**
 * Format Date object to local YYYY-MM-DD calendar date string,
 * avoiding UTC timezone shifts.
 */
export function getLocalDateString(dateObj = new Date()) {
  const d = new Date(dateObj);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Standard Mood Options for MindEase Daily Check-in
 */
export const MOOD_OPTIONS = [
  { id: 'Very Happy', label: 'Very Happy', emoji: '😊', color: 'bg-amber-500/10 text-amber-600 border-amber-500/30' },
  { id: 'Happy', label: 'Happy', emoji: '🙂', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30' },
  { id: 'Okay', label: 'Okay', emoji: '😐', color: 'bg-slate-500/10 text-slate-600 border-slate-500/30' },
  { id: 'Sad', label: 'Sad', emoji: '😔', color: 'bg-blue-500/10 text-blue-600 border-blue-500/30' },
  { id: 'Anxious', label: 'Anxious', emoji: '😟', color: 'bg-rose-500/10 text-rose-600 border-rose-500/30' },
  { id: 'Stressed', label: 'Stressed', emoji: '😣', color: 'bg-orange-500/10 text-orange-600 border-orange-500/30' },
  { id: 'Tired', label: 'Tired', emoji: '😴', color: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/30' },
  { id: 'Angry', label: 'Angry', emoji: '😡', color: 'bg-red-500/10 text-red-600 border-red-500/30' },
];

// ---------------------------------------------------------------------------
// localStorage cache helpers
// Cache key is scoped to the user's ID so User A never sees User B's cache.
// The cache is purely a read-through optimisation — the Flask DB is the truth.
// ---------------------------------------------------------------------------
function getCacheKey(userId) {
  const cleanKey = (userId || 'guest').replace(/[^a-zA-Z0-9_@.-]/g, '_');
  return `mindease_daily_checkins_${cleanKey}`;
}

function readCache(userId) {
  try {
    const raw = localStorage.getItem(getCacheKey(userId));
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return [];
}

function writeCache(userId, checkins) {
  try {
    localStorage.setItem(getCacheKey(userId), JSON.stringify(checkins));
  } catch (e) {}
}

function clearCache(userId) {
  try {
    localStorage.removeItem(getCacheKey(userId));
  } catch (e) {}
}

// ---------------------------------------------------------------------------
// fetchDailyMoodCheckins
//
// PRIMARY:  GET /api/daily-checkins  (Flask — identifies user via JWT)
// FALLBACK: localStorage cache       (used only when Flask is unreachable)
//
// The userIdHint parameter is the Flask user.id from the login response.
// It is used solely to scope the localStorage cache key — Flask still
// determines the actual user from the JWT; we never send it to Flask.
// ---------------------------------------------------------------------------
export async function fetchDailyMoodCheckins(userIdHint = null) {
  const token = localStorage.getItem('mindease_auth_token');

  if (token) {
    try {
      const response = await fetch(`${FLASK_API}/daily-checkins`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        const checkins = (data.checkins || []).map(normaliseCheckin);
        // Sort newest-first (Flask already does this, but be safe)
        checkins.sort((a, b) => (b.check_in_date || '').localeCompare(a.check_in_date || ''));
        // Write to cache so UI can show stale data while offline
        writeCache(userIdHint, checkins);
        return checkins;
      }

      if (response.status === 401) {
        // Token expired — clear cache so we don't show stale data from a previous user
        clearCache(userIdHint);
        return [];
      }
    } catch (networkErr) {
      console.warn('Daily check-ins: Flask unreachable, using localStorage cache:', networkErr.message);
    }
  }

  // Fallback: return cached data while offline / backend down
  return readCache(userIdHint);
}

// ---------------------------------------------------------------------------
// saveDailyMoodCheckin
//
// PRIMARY:  POST /api/daily-checkins  (Flask — identifies user via JWT)
// The Flask backend enforces UNIQUE(user_id, checkin_date) at the DB level.
// localStorage is updated ONLY after Flask confirms success OR as a local
// fallback when the Flask server is temporarily unreachable (network error).
// Server-side validation errors (400/500) are thrown so the UI can display them.
// ---------------------------------------------------------------------------
export async function saveDailyMoodCheckin(moodLabel, note = '', userIdHint = null) {
  const token = localStorage.getItem('mindease_auth_token');

  if (!token) {
    throw new Error('You must be logged in to save a daily check-in.');
  }

  const todayStr = getLocalDateString(new Date());

  try {
    const response = await fetch(`${FLASK_API}/daily-checkins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ mood: moodLabel, note: (note || '').trim() }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Server returned an error (400 bad mood, 401 auth, 500 db error, etc.)
      throw new Error(data.error || 'Failed to save check-in. Please try again.');
    }

    // Flask confirmed success — update cache with the authoritative DB record
    const savedRecord = normaliseCheckin(data.checkin);
    let cached = readCache(userIdHint);
    const todayIdx = cached.findIndex(c => c.check_in_date === todayStr);
    if (todayIdx >= 0) {
      cached[todayIdx] = savedRecord;
    } else {
      cached.unshift(savedRecord);
    }
    writeCache(userIdHint, cached);

    return {
      record: savedRecord,
      allCheckins: cached,
      streak: calculateStreak(cached),
    };

  } catch (err) {
    // Network error (Flask server not running / unreachable)
    if (err.name === 'TypeError' || err.message === 'Failed to fetch' || err.message?.includes('fetch')) {
      console.warn('Daily check-in: Flask unreachable, saving to localStorage cache only.');

      // Save locally so the UI still updates — will sync to DB on next successful fetch
      const localRecord = {
        id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `checkin-${Date.now()}`,
        user_id: userIdHint || 'local',
        mood: moodLabel,
        note: (note || '').trim(),
        check_in_date: todayStr,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      let cached = readCache(userIdHint);
      const todayIdx = cached.findIndex(c => c.check_in_date === todayStr);
      if (todayIdx >= 0) {
        cached[todayIdx] = localRecord;
      } else {
        cached.unshift(localRecord);
      }
      writeCache(userIdHint, cached);

      return {
        record: localRecord,
        allCheckins: cached,
        streak: calculateStreak(cached),
      };
    }

    // Re-throw server-side errors (bad mood, auth failure, etc.)
    throw err;
  }
}

/**
 * Normalise a raw Flask checkin record into the shape calculateStreak() expects.
 */
function normaliseCheckin(raw) {
  if (!raw) return raw;
  return {
    id:            raw.id,
    user_id:       raw.user_id,
    mood:          raw.mood || 'Okay',
    note:          raw.note || '',
    check_in_date: raw.check_in_date || raw.checkin_date || null,
    created_at:    raw.created_at || null,
    updated_at:    raw.updated_at || null,
  };
}

// ---------------------------------------------------------------------------
// calculateStreak — PRESERVED VERBATIM.
// ---------------------------------------------------------------------------

/**
 * Calculate current consecutive streak based strictly on completed check-in dates.
 * A new user with 0 check-ins has a 0-day streak.
 */
export function calculateStreak(checkinsList = []) {
  if (!checkinsList || !Array.isArray(checkinsList) || checkinsList.length === 0) {
    return 0;
  }

  // Extract unique sorted date strings YYYY-MM-DD in descending order
  const uniqueDates = Array.from(
    new Set(checkinsList.map(c => c.check_in_date).filter(Boolean))
  ).sort().reverse();

  if (uniqueDates.length === 0) return 0;

  const todayStr = getLocalDateString(new Date());

  const yesterdayObj = new Date();
  yesterdayObj.setDate(yesterdayObj.getDate() - 1);
  const yesterdayStr = getLocalDateString(yesterdayObj);

  const hasToday = uniqueDates.includes(todayStr);
  const hasYesterday = uniqueDates.includes(yesterdayStr);

  // If neither today nor yesterday has a check-in, the streak is broken (0)
  if (!hasToday && !hasYesterday) {
    return 0;
  }

  let streak = 0;
  let currentDate = hasToday ? new Date() : yesterdayObj;

  while (true) {
    const dStr = getLocalDateString(currentDate);
    if (uniqueDates.includes(dStr)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Build Weekly Mood View for Mon-Sun of the current week.
 */
export function getWeeklyMoodView(checkinsList = []) {
  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const distanceToMon = (currentDay === 0 ? 6 : currentDay - 1);

  const monday = new Date(now);
  monday.setDate(now.getDate() - distanceToMon);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const todayStr = getLocalDateString(now);

  return daysOfWeek.map((dayLabel, index) => {
    const dayObj = new Date(monday);
    dayObj.setDate(monday.getDate() + index);
    const dateStr = getLocalDateString(dayObj);

    const checkin = (checkinsList || []).find(c => c.check_in_date === dateStr);
    const moodMeta = checkin ? MOOD_OPTIONS.find(m => m.label === checkin.mood) : null;

    return {
      dayLabel,
      dateStr,
      isToday: dateStr === todayStr,
      isFuture: dayObj > now && dateStr !== todayStr,
      moodLabel: checkin ? checkin.mood : null,
      emoji: moodMeta ? moodMeta.emoji : (checkin ? '🙂' : null),
      checkin: checkin || null,
    };
  });
}

/**
 * Generate simple, non-diagnostic reflection observations.
 */
export function getMoodTrendSummary(checkinsList = []) {
  if (!checkinsList || checkinsList.length === 0) {
    return "No check-ins yet. Take a moment to log how you feel today!";
  }

  const weeklyView = getWeeklyMoodView(checkinsList);
  const checkedInThisWeek = weeklyView.filter(w => w.checkin).length;

  if (checkedInThisWeek === 0) {
    return "You haven't checked in this week yet. How are you feeling today?";
  }

  if (checkedInThisWeek === 1) {
    return "You've checked in 1 day this week. Building a daily reflection habit takes one day at a time!";
  }

  const recentMoods = checkinsList.slice(0, 7).map(c => c.mood);
  const positiveCount = recentMoods.filter(m => ['Very Happy', 'Happy', 'Calm', 'Focused'].includes(m)).length;

  if (positiveCount >= recentMoods.length * 0.7) {
    return `You've checked in ${checkedInThisWeek} days this week, reflecting mostly positive and balanced moments.`;
  } else if (positiveCount === 0) {
    return `You've checked in ${checkedInThisWeek} days this week. You're giving yourself space to process difficult feelings.`;
  }

  return `You've checked in ${checkedInThisWeek} days this week, with a natural mix of positive and challenging days.`;
}
