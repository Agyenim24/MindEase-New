from flask import Blueprint, request, jsonify
from models import db, Assessment, AssessmentAnswer, User
from utils.security import token_required

assessment_bp = Blueprint("assessment", __name__, url_prefix="/api/assessment")


@assessment_bp.route("/submit", methods=["POST"])
@token_required
def submit_assessment():
    data = request.get_json() or {}
    answers_data = data.get("answers", {})  # step_index -> option_dict
    result_data = data.get("result", {})

    user = User.query.get(request.user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    score = result_data.get("score", 0)
    level = result_data.get("level", "Mild Stress")
    recommendation = result_data.get("recommendation", "")

    # Extract goals/preferences from step answers if passed
    opt0 = answers_data.get("0") or answers_data.get(0) or {}
    opt1 = answers_data.get("1") or answers_data.get(1) or {}
    opt2 = answers_data.get("2") or answers_data.get(2) or {}
    opt3 = answers_data.get("3") or answers_data.get(3) or {}

    assessment = Assessment(
        user_id=user.id,
        score=score,
        level=level,
        recommendation=recommendation,
        primary_goal=opt0.get("id"),
        primary_goal_title=opt0.get("title"),
        emotional_state=opt1.get("id"),
        emotional_state_title=opt1.get("title"),
        sleep_quality=opt2.get("id"),
        sleep_quality_title=opt2.get("title"),
        support_preference=opt3.get("id"),
        support_preference_title=opt3.get("title"),
    )
    db.session.add(assessment)
    db.session.flush()

    for idx_str, opt in answers_data.items():
        if isinstance(opt, dict) and "id" in opt:
            answer = AssessmentAnswer(
                assessment_id=assessment.id,
                step_index=int(idx_str),
                option_id=opt.get("id", ""),
                option_title=opt.get("title", ""),
                points=opt.get("points", 0)
            )
            db.session.add(answer)

    db.session.commit()
    return jsonify({
        "message": "Assessment submitted successfully",
        "assessment": assessment.to_dict()
    }), 201


@assessment_bp.route("/history", methods=["GET"])
@token_required
def get_history():
    assessments = (
        Assessment.query
        .filter_by(user_id=request.user_id)
        .order_by(Assessment.taken_at.desc())
        .all()
    )
    return jsonify({"history": [a.to_dict() for a in assessments]}), 200


@assessment_bp.route("/latest", methods=["GET"])
@token_required
def get_latest():
    assessment = (
        Assessment.query
        .filter_by(user_id=request.user_id)
        .order_by(Assessment.taken_at.desc())
        .first()
    )
    if not assessment:
        return jsonify({"assessment": None}), 200
    return jsonify({"assessment": assessment.to_dict()}), 200
