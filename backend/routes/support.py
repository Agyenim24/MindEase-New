from flask import Blueprint, request, jsonify
from models import db, SupportTicket
from utils.security import token_required

support_bp = Blueprint("support", __name__, url_prefix="/api/support")


@support_bp.route("/tickets", methods=["POST"])
@token_required
def create_ticket():
    data = request.get_json() or {}
    subject = data.get("subject", "").strip()
    category = data.get("category", "General").strip()
    message = data.get("message", "").strip()

    if not subject or not message:
        return jsonify({"error": "Subject and message are required"}), 400

    ticket = SupportTicket(
        user_id=request.user_id,
        subject=subject,
        category=category,
        message=message
    )
    db.session.add(ticket)
    db.session.commit()

    return jsonify({"message": "Support ticket created", "ticket": ticket.to_dict()}), 201


@support_bp.route("/tickets", methods=["GET"])
@token_required
def get_tickets():
    tickets = (
        SupportTicket.query
        .filter_by(user_id=request.user_id)
        .order_by(SupportTicket.created_at.desc())
        .all()
    )
    return jsonify({"tickets": [t.to_dict() for t in tickets]}), 200
