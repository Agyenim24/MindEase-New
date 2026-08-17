import uuid
import jwt
import datetime
from functools import wraps
from flask import request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash


def generate_session_id() -> str:
    """Generate a new UUID v4 session ID."""
    return str(uuid.uuid4())


def hash_password(password: str) -> str:
    return generate_password_hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return check_password_hash(password_hash, password)


def create_token(user_id: str) -> str:
    payload = {
        "user_id": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=current_app.config.get("JWT_ACCESS_TOKEN_EXPIRES", 3600)),
        "iat": datetime.datetime.utcnow()
    }
    secret = current_app.config.get("JWT_SECRET_KEY", "mindease-jwt-secret")
    return jwt.encode(payload, secret, algorithm="HS256")


def decode_token(token: str):
    secret = current_app.config.get("JWT_SECRET_KEY", "mindease-jwt-secret")
    try:
        payload = jwt.decode(token, secret, algorithms=["HS256"])
        return payload.get("user_id")
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get("Authorization")
        if auth_header:
            parts = auth_header.split()
            if len(parts) == 2 and parts[0].lower() == "bearer":
                token = parts[1]
        
        # Fallback to session ID header if present
        if not token:
            token = request.headers.get("X-Session-ID") or request.headers.get("X-User-ID")

        if not token:
            return jsonify({"error": "Token or user authentication missing"}), 401

        # Attempt JWT decode
        user_id = decode_token(token)
        if not user_id:
            from models.user import User
            user = User.query.get(token)
            if user:
                user_id = user.id
            else:
                return jsonify({"error": "Invalid or expired token"}), 401

        request.user_id = user_id
        return f(*args, **kwargs)

    return decorated