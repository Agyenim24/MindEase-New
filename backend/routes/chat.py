from flask import Blueprint, request, jsonify
from models import get_db
from services.chat_service import handle_message, get_chat_history, log_mood_summary
from utils.validators import validate_session_id, validate_message
from datetime import datetime

chat_bp = Blueprint("chat", __name__, url_prefix="/api/chat")


def get_or_create_session(session_id: str, language: str = "en"):
    """Get existing session or create a new one in MongoDB."""
    db = get_db()
    session = db.sessions.find_one({"session_id": session_id})
    if not session:
        db.sessions.insert_one({
            "session_id": session_id,
            "language":   language,
            "created_at": datetime.utcnow().isoformat(),
            "last_seen":  datetime.utcnow().isoformat()
        })
    else:
        db.sessions.update_one(
            {"session_id": session_id},
            {"$set": {"last_seen": datetime.utcnow().isoformat()}}
        )


@chat_bp.route("/message", methods=["POST"])
def send_message():
    data       = request.get_json()
    session_id = data.get("session_id", "").strip()
    message    = data.get("message", "").strip()
    language   = data.get("language", "en")

    if not validate_session_id(session_id):
        return jsonify({"error": "Invalid or missing session_id"}), 400
    if not validate_message(message):
        return jsonify({"error": "Message cannot be empty"}), 400

    get_or_create_session(session_id, language)
    result = handle_message(session_id, message, language)
    return jsonify(result), 200


@chat_bp.route("/history/<session_id>", methods=["GET"])
def get_history(session_id):
    if not validate_session_id(session_id):
        return jsonify({"error": "Invalid session_id"}), 400

    limit    = request.args.get("limit", 50, type=int)
    messages = get_chat_history(session_id, limit)
    return jsonify({"messages": messages}), 200


@chat_bp.route("/end", methods=["POST"])
def end_session():
    data       = request.get_json()
    session_id = data.get("session_id", "").strip()

    if not validate_session_id(session_id):
        return jsonify({"error": "Invalid session_id"}), 400

    log_mood_summary(session_id)
    return jsonify({"message": "Session ended and mood logged"}), 200


@chat_bp.route("/reaction", methods=["POST"])
def add_reaction():
    data       = request.get_json()
    message_id = data.get("message_id")
    reaction   = data.get("reaction")

    if reaction not in ("up", "down"):
        return jsonify({"error": "Reaction must be 'up' or 'down'"}), 400

    db  = get_db()
    msg = db.messages.find_one({"_id": message_id})
    if not msg:
        return jsonify({"error": "Message not found"}), 404

    db.reactions.insert_one({
        "message_id": message_id,
        "reaction":   reaction,
        "created_at": datetime.utcnow().isoformat()
    })
    return jsonify({"message": "Reaction saved"}), 201