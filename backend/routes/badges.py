from flask import Blueprint, request, jsonify
from models import db, Badge, UserBadge
from utils.security import token_required

badges_bp = Blueprint("badges", __name__, url_prefix="/api/badges")


@badges_bp.route("", methods=["GET"])
@token_required
def get_badges():
    user_id = request.user_id
    all_badges = Badge.query.all()
    user_badges = {ub.badge_id: ub for ub in UserBadge.query.filter_by(user_id=user_id).all()}

    result = []
    for b in all_badges:
        ub = user_badges.get(b.id)
        result.append(b.to_dict(earned=bool(ub), earned_at=ub.earned_at if ub else None))

    return jsonify({"badges": result}), 200
