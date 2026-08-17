from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify
from models import db, User, MoodLog, Assessment, UserEnrollment, ModuleCompletion, SavedResource, ActivityStats
from utils.security import token_required
from utils.supabase_client import supabase_insert, supabase_sync_user
from utils.streak_utils import calculate_checkin_streak

users_bp = Blueprint("users", __name__, url_prefix="/api/users")


def get_or_create_stats(user_id: str) -> ActivityStats:
    stats = ActivityStats.query.filter_by(user_id=user_id).first()
    if not stats:
        stats = ActivityStats(
            user_id=user_id,
            activity_streak=0,
            exercises_completed=0,
            programs_completed=0,
            mood_entries=0,
            last_activity_date=None
        )
        db.session.add(stats)
        db.session.commit()
        try:
            supabase_insert("activity_stats", stats.to_dict())
        except Exception as e:
            print(f"Supabase activity stats init notice: {e}")
    return stats


@users_bp.route("/profile", methods=["GET"])
@token_required
def get_profile():
    user = User.query.get(request.user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"profile": user.to_dict()}), 200


@users_bp.route("/dashboard", methods=["GET"])
@token_required
def get_dashboard_data():
    user = User.query.get(request.user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    stats = get_or_create_stats(user.id)

    # Evaluate consecutive daily streak based on last_activity_date
    today = datetime.utcnow().date()
    yesterday = today - timedelta(days=1)

    effective_streak = stats.activity_streak
    if stats.last_activity_date:
        if stats.last_activity_date < yesterday:
            effective_streak = 0  # Missed 1+ days, streak breaks until next activity

    # Fetch user mood logs
    mood_logs = (
        MoodLog.query
        .filter_by(user_id=user.id)
        .order_by(MoodLog.logged_at.desc())
        .limit(15)
        .all()
    )

    # Fetch user assessments
    assessments = (
        Assessment.query
        .filter_by(user_id=user.id)
        .order_by(Assessment.taken_at.desc())
        .all()
    )
    latest_assessment = assessments[0].to_dict() if assessments else None

    # Fetch completed exercises count
    module_completions_count = ModuleCompletion.query.filter_by(user_id=user.id).count()
    total_exercises = max(stats.exercises_completed or 0, module_completions_count)

    # Fetch completed program count from activity stats
    completed_programs_count = stats.programs_completed or 0

    # Fetch saved resources
    saved = SavedResource.query.filter_by(user_id=user.id).all()
    saved_ids = [s.resource_id for s in saved]

    # Daily check-in streak — calculated from actual check-in records
    daily_checkin_streak = calculate_checkin_streak(user.id)

    return jsonify({
        "user": user.to_dict(),
        "activity_stats": {
            "activity_streak": effective_streak,
            "exercises_completed": total_exercises,
            "programs_completed": completed_programs_count,
            "mood_entries": stats.mood_entries,
            "last_activity_date": stats.last_activity_date.isoformat() if stats.last_activity_date else None
        },
        "streak": daily_checkin_streak,
        "daily_checkin_streak": daily_checkin_streak,
        "exercises_completed": total_exercises,
        "programs_completed": completed_programs_count,
        "mood_entries": stats.mood_entries,
        "total_sessions": user.total_sessions or 0,
        "completed_programs_count": completed_programs_count,
        "mood_logs": [log.to_dict() for log in mood_logs],
        "latest_assessment": latest_assessment,
        "assessment_history": [a.to_dict() for a in assessments],
        "saved_resource_ids": saved_ids
    }), 200


@users_bp.route("/activity", methods=["POST"])
@token_required
def record_activity():
    data = request.get_json() or {}
    activity_type = data.get("type", "exercise")  # exercise, program, mood, breathing, mindfulness

    user = User.query.get(request.user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    stats = get_or_create_stats(user.id)
    today = datetime.utcnow().date()
    yesterday = today - timedelta(days=1)

    # Streak logic
    if stats.last_activity_date is None:
        stats.activity_streak = 1
    elif stats.last_activity_date == today:
        pass  # Already completed an activity today
    elif stats.last_activity_date == yesterday:
        stats.activity_streak += 1
    else:
        stats.activity_streak = 1  # Streak reset after missing a day

    stats.last_activity_date = today

    if activity_type in ["exercise", "breathing", "mindfulness"]:
        stats.exercises_completed += 1
    elif activity_type == "program":
        stats.programs_completed += 1
    elif activity_type == "mood":
        stats.mood_entries += 1

    user.streak = stats.activity_streak
    user.total_sessions = (stats.exercises_completed + stats.programs_completed + stats.mood_entries)

    db.session.commit()

    try:
        supabase_insert("activity_stats", stats.to_dict())
    except Exception as e:
        print(f"Supabase activity stats sync notice: {e}")

    return jsonify({
        "message": "Activity recorded successfully",
        "activity_stats": stats.to_dict()
    }), 200


@users_bp.route("/profile", methods=["PATCH", "PUT"])
@token_required
def update_profile():
    user = User.query.get(request.user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json() or {}
    if "name" in data and data["name"]:
        user.name = data["name"].strip()
    if "email" in data and data["email"]:
        user.email = data["email"].strip().lower()
    if "bio" in data and data["bio"] is not None:
        user.bio = data["bio"].strip()
    if "avatar" in data and data["avatar"]:
        user.avatar_url = data["avatar"]
    if "avatar_url" in data and data["avatar_url"]:
        user.avatar_url = data["avatar_url"]

    db.session.commit()

    try:
        supabase_sync_user(user.id, user.email, user.name, user.password_hash)
        supabase_insert("users", {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "avatar_url": user.avatar_url,
            "bio": user.bio
        })
    except Exception as e:
        print(f"Supabase profile update sync notice: {e}")

    return jsonify({"message": "Profile updated", "user": user.to_dict()}), 200
