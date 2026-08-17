from flask import Blueprint, request, jsonify
from models import db, UserSettings
from utils.security import token_required

settings_bp = Blueprint("settings", __name__, url_prefix="/api/settings")


@settings_bp.route("", methods=["GET"])
@token_required
def get_settings():
    settings = UserSettings.query.filter_by(user_id=request.user_id).first()
    if not settings:
        settings = UserSettings(user_id=request.user_id)
        db.session.add(settings)
        db.session.commit()
    return jsonify({"settings": settings.to_dict()}), 200


@settings_bp.route("", methods=["PATCH", "PUT"])
@token_required
def update_settings():
    settings = UserSettings.query.filter_by(user_id=request.user_id).first()
    if not settings:
        settings = UserSettings(user_id=request.user_id)
        db.session.add(settings)

    data = request.get_json() or {}
    if "emailNotifications" in data:
        settings.email_notifications = bool(data["emailNotifications"])
    if "smsReminders" in data:
        settings.sms_reminders = bool(data["smsReminders"])
    if "dailyCheckinReminder" in data:
        settings.daily_checkin_reminder = bool(data["dailyCheckinReminder"])
    if "soundEffects" in data:
        settings.sound_effects = bool(data["soundEffects"])
    if "analyticsOptIn" in data:
        settings.analytics_opt_in = bool(data["analyticsOptIn"])
    if "privacyLevel" in data:
        settings.privacy_level = str(data["privacyLevel"])
    if "darkMode" in data:
        settings.dark_mode = bool(data["darkMode"])
    if "language" in data:
        settings.language = str(data["language"])

    db.session.commit()
    return jsonify({"message": "Settings updated", "settings": settings.to_dict()}), 200
