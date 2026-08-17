from flask import Blueprint, request, jsonify
from models import db, EmergencyContact
from utils.security import token_required

emergency_bp = Blueprint("emergency", __name__, url_prefix="/api/emergency")


@emergency_bp.route("/contacts", methods=["GET"])
@token_required
def get_contacts():
    contacts = EmergencyContact.query.filter_by(user_id=request.user_id).all()
    return jsonify({"contacts": [c.to_dict() for c in contacts]}), 200


@emergency_bp.route("/contacts", methods=["POST"])
@token_required
def add_contact():
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    phone = data.get("phone", "").strip()
    relation = data.get("relation", "").strip()

    if not name or not phone:
        return jsonify({"error": "Name and phone are required"}), 400

    contact = EmergencyContact(
        user_id=request.user_id,
        name=name,
        phone=phone,
        relation=relation
    )
    db.session.add(contact)
    db.session.commit()

    return jsonify({"message": "Emergency contact added", "contact": contact.to_dict()}), 201


@emergency_bp.route("/contacts/<contact_id>", methods=["DELETE"])
@token_required
def delete_contact(contact_id):
    contact = EmergencyContact.query.filter_by(id=contact_id, user_id=request.user_id).first()
    if not contact:
        return jsonify({"error": "Contact not found"}), 404

    db.session.delete(contact)
    db.session.commit()
    return jsonify({"message": "Emergency contact deleted"}), 200
