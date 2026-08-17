from datetime import date, datetime
from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError
from models import db, DailyCheckin
from utils.security import token_required

daily_checkins_bp = Blueprint("daily_checkins", __name__, url_prefix="/api/daily-checkins")

# Valid mood values accepted by the frontend
VALID_MOODS = {
    "Very Happy", "Happy", "Okay", "Sad",
    "Anxious", "Stressed", "Tired", "Angry"
}


@daily_checkins_bp.route("", methods=["GET"])
@token_required
def get_checkins():
    """
    Return all daily check-ins for the currently authenticated user.
    Flask reads the user_id from the JWT — the frontend never supplies it.
    Results are ordered newest-first so the frontend can calculate
    the streak via calculateStreak() without extra sorting.
    """
    checkins = (
        DailyCheckin.query
        .filter_by(user_id=request.user_id)
        .order_by(DailyCheckin.checkin_date.desc())
        .all()
    )
    return jsonify({"checkins": [c.to_dict() for c in checkins]}), 200


@daily_checkins_bp.route("", methods=["POST"])
@token_required
def save_checkin():
    """
    Save or update today's daily check-in for the authenticated user.

    - user_id is taken from the Flask JWT — NEVER from the request body.
    - One check-in per calendar day is enforced at the DB level
      via UNIQUE(user_id, checkin_date).
    - If the user already checked in today, the record is updated (upsert).
    - On database failure, no state is changed and an error is returned.
    """
    data = request.get_json() or {}
    mood = (data.get("mood") or "").strip()
    note = (data.get("note") or "").strip()

    if not mood:
        return jsonify({"error": "Mood is required"}), 400

    if mood not in VALID_MOODS:
        return jsonify({"error": f"Invalid mood value: {mood}"}), 400

    today = date.today()
    user_id = request.user_id  # from Flask JWT — not from request body

    # Check if the user already has a check-in for today
    existing = DailyCheckin.query.filter_by(
        user_id=user_id,
        checkin_date=today
    ).first()

    try:
        if existing:
            # Update today's existing check-in
            existing.mood = mood
            existing.note = note
            existing.updated_at = datetime.utcnow()
            db.session.commit()
            return jsonify({
                "message": "Check-in updated successfully",
                "checkin": existing.to_dict()
            }), 200
        else:
            # Insert a new check-in for today
            checkin = DailyCheckin(
                user_id=user_id,
                mood=mood,
                note=note,
                checkin_date=today,
            )
            db.session.add(checkin)
            db.session.commit()
            return jsonify({
                "message": "Check-in saved successfully",
                "checkin": checkin.to_dict()
            }), 201

    except IntegrityError:
        db.session.rollback()
        # Race condition: another request inserted for today between our check and insert
        # Retry by fetching the now-existing record and updating it
        existing = DailyCheckin.query.filter_by(
            user_id=user_id,
            checkin_date=today
        ).first()
        if existing:
            existing.mood = mood
            existing.note = note
            existing.updated_at = datetime.utcnow()
            db.session.commit()
            return jsonify({
                "message": "Check-in updated successfully",
                "checkin": existing.to_dict()
            }), 200
        return jsonify({"error": "Could not save check-in due to a conflict"}), 409

    except Exception as e:
        db.session.rollback()
        print(f"DailyCheckin save error: {e}")
        return jsonify({"error": "Failed to save check-in. Please try again."}), 500
