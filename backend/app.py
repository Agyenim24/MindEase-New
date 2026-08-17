import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
from config import config
from models import db

socketio = SocketIO()


def create_app(env: str = "default") -> Flask:
    app = Flask(__name__)

    # Load Config
    app.config.from_object(config[env])

    # Extensions
    db.init_app(app)
    CORS(app, origins=app.config.get("CORS_ORIGINS", "*"), supports_credentials=True)

    # Create DB Tables
    with app.app_context():
        import models  # registers all 11 models with SQLAlchemy metadata
        db.create_all()

    socketio.init_app(
        app,
        cors_allowed_origins="*",
        async_mode="eventlet" if not app.config["DEBUG"] else "threading",
        logger=False,
        engineio_logger=False
    )

    # Register Blueprints
    from routes.auth       import auth_bp
    from routes.users      import users_bp
    from routes.chat       import chat_bp
    from routes.mood       import mood_bp
    from routes.assessment import assessment_bp
    from routes.programs   import programs_bp
    from routes.community  import community_bp
    from routes.resources  import resources_bp
    from routes.emergency  import emergency_bp
    from routes.support    import support_bp
    from routes.settings   import settings_bp
    from routes.badges     import badges_bp
    from routes.report     import report_bp
    from routes.call       import call_bp
    from routes.daily_checkins import daily_checkins_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(users_bp)
    app.register_blueprint(chat_bp)
    app.register_blueprint(mood_bp)
    app.register_blueprint(assessment_bp)
    app.register_blueprint(programs_bp)
    app.register_blueprint(community_bp)
    app.register_blueprint(resources_bp)
    app.register_blueprint(emergency_bp)
    app.register_blueprint(support_bp)
    app.register_blueprint(settings_bp)
    app.register_blueprint(badges_bp)
    app.register_blueprint(report_bp)
    app.register_blueprint(call_bp)
    app.register_blueprint(daily_checkins_bp)

    # Register Socket Events
    try:
        from socket_events.call_events      import register_call_events
        from socket_events.volunteer_events import register_volunteer_events
        register_call_events(socketio)
        register_volunteer_events(socketio)
    except Exception as e:
        app.logger.warning(f"Socket events registration skipped/failed: {e}")

    # Root & Health Check
    @app.route("/")
    def index():
        return jsonify({
            "status": "ok",
            "app": "MindEase API",
            "message": "MindEase Backend API Service is running.",
            "health": "/api/health"
        }), 200

    @app.route("/api/health")
    def health():
        return jsonify({
            "status": "ok",
            "app": "MindEase",
            "database": "Supabase PostgreSQL"
        }), 200

    # 404 Handler
    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "Endpoint not found"}), 404

    # 500 Handler
    @app.errorhandler(500)
    def server_error(e):
        return jsonify({"error": "Internal server error"}), 500

    return app


if __name__ == "__main__":
    env = os.getenv("FLASK_ENV", "development")
    app = create_app(env)
    socketio.run(app, host="0.0.0.0", port=5000, debug=app.config["DEBUG"], allow_unsafe_werkzeug=True)