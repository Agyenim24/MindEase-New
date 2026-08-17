"""
streak_utils.py
Server-side helper that calculates the consecutive daily check-in streak
for a given user.  Mirrors the calculateStreak() logic in the frontend
dailyMoodService.js so both sides always agree on the count.
"""
from datetime import date, timedelta
from models import DailyCheckin


def calculate_checkin_streak(user_id: str) -> int:
    """
    Returns the number of consecutive days (ending today or yesterday)
    on which the user submitted a daily check-in.

    - If neither today nor yesterday has a check-in the streak is 0.
    - Counts backwards from the most-recent qualifying date until a gap
      is found.
    """
    checkins = (
        DailyCheckin.query
        .filter_by(user_id=user_id)
        .all()
    )

    # Build a set of unique check-in dates
    dates = set()
    for c in checkins:
        if c.checkin_date:
            dates.add(c.checkin_date)

    if not dates:
        return 0

    today     = date.today()
    yesterday = today - timedelta(days=1)

    has_today     = today     in dates
    has_yesterday = yesterday in dates

    # Streak is broken if neither today nor yesterday has a check-in
    if not has_today and not has_yesterday:
        return 0

    streak       = 0
    current_date = today if has_today else yesterday

    while current_date in dates:
        streak      += 1
        current_date -= timedelta(days=1)

    return streak
