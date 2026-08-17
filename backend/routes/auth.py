from flask import Blueprint, request, jsonify
from models import db, User, UserSettings, CommunityPost, PostComment, PostLike, MoodLog, EmergencyContact, Assessment, UserEnrollment
from utils.security import hash_password, verify_password, create_token, token_required
from utils.supabase_client import supabase_insert, supabase_auth_signup, supabase_auth_login, supabase_sync_user, supabase_delete
from utils.streak_utils import calculate_checkin_streak

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()
    name = data.get("name", "").strip()

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    import re
    if len(password) < 8 or not re.search(r"[a-zA-Z]", password) or not re.search(r"[0-9]", password) or not re.search(r"[^a-zA-Z0-9]", password):
        return jsonify({"error": "Password must be at least 8 characters long and contain letters, numbers, and special symbols"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User with this email already exists"}), 409

    if not name:
        name = email.split("@")[0].replace(".", " ").title()

    pwd_hash = hash_password(password)
    user = User(
        email=email,
        password_hash=pwd_hash,
        name=name,
        avatar_url=f"https://api.dicebear.com/7.x/avataaars/svg?seed={email}"
    )
    db.session.add(user)
    db.session.flush()

    # Create default user settings
    settings = UserSettings(user_id=user.id)
    db.session.add(settings)

    db.session.commit()

    # Attempt Supabase Auth signup & sync directly into Supabase auth.users and public.users
    try:
        supabase_sync_user(user.id, user.email, user.name, user.password_hash)
        supabase_insert("user_settings", {
            "user_id": user.id,
            "email_notifications": True,
            "daily_checkin_reminder": True
        })
    except Exception as e:
        print(f"Supabase background sync notice: {e}")

    token = create_token(user.id)
    return jsonify({
        "message": "User registered successfully",
        "token": token,
        "user": user.to_dict(),
        "settings": settings.to_dict()
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    valid_password = False
    if user:
        if verify_password(password, user.password_hash):
            valid_password = True
        else:
            return jsonify({"error": "Invalid email or password"}), 401
    else:
        sb_ok, sb_data = supabase_auth_login(email, password)
        if sb_ok:
            valid_password = True
            pwd_hash = hash_password(password)
            name = email.split("@")[0].replace(".", " ").title()
            user = User(
                email=email,
                password_hash=pwd_hash,
                name=name,
                avatar_url=f"https://api.dicebear.com/7.x/avataaars/svg?seed={email}"
            )
            db.session.add(user)
            db.session.flush()
            settings = UserSettings(user_id=user.id)
            db.session.add(settings)
            db.session.commit()

    if not user or not valid_password:
        return jsonify({"error": "Invalid email or password"}), 401

    # Ensure user is synced to Supabase auth.users
    try:
        supabase_sync_user(user.id, user.email, user.name, user.password_hash)
    except Exception as e:
        print(f"Supabase sync notice: {e}")

    token = create_token(user.id)
    settings = user.settings or UserSettings(user_id=user.id)
    daily_streak = calculate_checkin_streak(user.id)

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": user.to_dict(),
        "settings": settings.to_dict() if settings else {},
        "daily_checkin_streak": daily_streak
    }), 200


@auth_bp.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    new_password = data.get("password", "").strip() or data.get("new_password", "").strip()

    if not email or not new_password:
        return jsonify({"error": "Email and new password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "No user found with this email"}), 404

    user.password_hash = hash_password(new_password)
    db.session.commit()

    # Sync updated user and password hash to Supabase
    try:
        supabase_sync_user(user.id, user.email, user.name, user.password_hash)
    except Exception as e:
        print(f"Supabase password sync notice: {e}")

    token = create_token(user.id)
    settings = user.settings or UserSettings(user_id=user.id)
    daily_streak = calculate_checkin_streak(user.id)

    return jsonify({
        "message": "Password updated successfully",
        "token": token,
        "user": user.to_dict(),
        "settings": settings.to_dict() if settings else {},
        "daily_checkin_streak": daily_streak
    }), 200


@auth_bp.route("/me", methods=["GET"])
@token_required
def get_current_user():
    user = User.query.get(request.user_id)
    if not user:
        return jsonify({"error": "User not found or unauthenticated"}), 401

    settings = user.settings or UserSettings(user_id=user.id)
    daily_streak = calculate_checkin_streak(user.id)
    return jsonify({
        "user": user.to_dict(),
        "settings": settings.to_dict() if settings else {},
        "daily_checkin_streak": daily_streak
    }), 200


@auth_bp.route("/account", methods=["DELETE"])
@token_required
def delete_account():
    data = request.get_json() or {}
    password = data.get("password", "").strip()

    user_id = request.user_id
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User account not found"}), 404

    # Verify user password
    if user.password_hash:
        if not password or not verify_password(password, user.password_hash):
            return jsonify({"error": "Incorrect password. Please enter your valid password to confirm account deletion."}), 400

    user_email = user.email

    try:
        # Delete user's posts, comments, likes
        CommunityPost.query.filter_by(user_id=user_id).delete(synchronize_session=False)
        PostComment.query.filter_by(user_id=user_id).delete(synchronize_session=False)
        PostLike.query.filter_by(user_id=user_id).delete(synchronize_session=False)

        # Delete user's mood logs, emergency contacts, assessments, settings
        MoodLog.query.filter_by(user_id=user_id).delete(synchronize_session=False)
        EmergencyContact.query.filter_by(user_id=user_id).delete(synchronize_session=False)
        Assessment.query.filter_by(user_id=user_id).delete(synchronize_session=False)
        UserEnrollment.query.filter_by(user_id=user_id).delete(synchronize_session=False)
        UserSettings.query.filter_by(user_id=user_id).delete(synchronize_session=False)

        # Delete user record from database
        db.session.delete(user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Database error deleting user account: {e}")
        return jsonify({"error": "Failed to delete account from database"}), 500

    # Sync account deletion to Supabase PostgreSQL & Auth
    try:
        supabase_delete("community_posts", {"user_id": f"eq.{user_id}"})
        supabase_delete("post_comments", {"user_id": f"eq.{user_id}"})
        supabase_delete("users", {"id": f"eq.{user_id}"})
        supabase_delete("users", {"email": f"eq.{user_email}"})
    except Exception as e:
        print(f"Supabase user deletion sync notice: {e}")

    return jsonify({"message": "User account permanently deleted"}), 200