from flask import Blueprint, request, jsonify
from models import db, MoodLog, User
from utils.security import token_required
from utils.supabase_client import supabase_insert
from collections import Counter
from datetime import datetime, timedelta

mood_bp = Blueprint("mood", __name__, url_prefix="/api/mood")


@mood_bp.route("/log", methods=["POST"])
@token_required
def log_mood():
    data = request.get_json() or {}
    emotion = data.get("emotion", "").strip()
    note = data.get("note", "").strip()

    if not emotion:
        return jsonify({"error": "Emotion is required"}), 400

    user = User.query.get(request.user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    log = MoodLog(
        user_id=user.id,
        emotion=emotion,
        note=note
    )
    db.session.add(log)

    from routes.users import get_or_create_stats
    stats = get_or_create_stats(user.id)
    today = datetime.utcnow().date()
    yesterday = today - timedelta(days=1)

    if stats.last_activity_date is None:
        stats.activity_streak = 1
    elif stats.last_activity_date == today:
        pass
    elif stats.last_activity_date == yesterday:
        stats.activity_streak += 1
    else:
        stats.activity_streak = 1

    stats.last_activity_date = today
    stats.mood_entries += 1
    user.streak = stats.activity_streak
    user.total_sessions = (stats.exercises_completed + stats.programs_completed + stats.mood_entries)

    db.session.commit()

    try:
        supabase_insert("activity_stats", stats.to_dict())
        supabase_insert("mood_logs", log.to_dict())
    except Exception as e:
        print(f"Supabase sync notice: {e}")

    return jsonify({"message": "Mood logged successfully", "mood_log": log.to_dict(), "streak": stats.activity_streak}), 201


@mood_bp.route("/history", methods=["GET"])
@token_required
def mood_history():
    logs = (
        MoodLog.query
        .filter_by(user_id=request.user_id)
        .order_by(MoodLog.logged_at.desc())
        .all()
    )
    return jsonify({"mood_logs": [log.to_dict() for log in logs]}), 200


@mood_bp.route("/summary", methods=["GET"])
@token_required
def mood_summary():
    logs = MoodLog.query.filter_by(user_id=request.user_id).all()
    counter = Counter(log.emotion for log in logs)

    dominant = counter.most_common(1)[0][0] if counter else None

    return jsonify({
        "total_logs": len(logs),
        "emotion_totals": dict(counter),
        "dominant_overall": dominant
    }), 200