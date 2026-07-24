from flask import Blueprint, request, jsonify
from models import get_db
from services.chat_service import handle_message, get_chat_history, log_mood_summary
from utils.validators import validate_session_id, validate_message
from datetime import datetime

chat_bp = Blueprint("chat", __name__, url_prefix="/api/chat")


def get_or_create_session(session_id: str, language: str = "en"):
    """Get existing session or create a new one."""
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