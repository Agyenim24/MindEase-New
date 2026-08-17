import uuid
from datetime import datetime
from . import db


def generate_uuid():
    return str(uuid.uuid4())


class EmergencyContact(db.Model):
    __tablename__ = "emergency_contacts"

    id         = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    user_id    = db.Column(db.String(36), db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name       = db.Column(db.Text, nullable=False)
    phone      = db.Column(db.Text, nullable=False)
    relation   = db.Column(db.Text, default="")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id":         self.id,
            "name":       self.name,
            "phone":      self.phone,
            "relation":   self.relation,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
