import uuid
import random
from datetime import datetime
from . import db


def generate_uuid():
    return str(uuid.uuid4())


def generate_ticket_ref():
    return f"TKT-{random.randint(1000, 9999)}"


class SupportTicket(db.Model):
    __tablename__ = "support_tickets"

    id         = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    user_id    = db.Column(db.String(36), db.ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    ticket_ref = db.Column(db.Text, unique=True, nullable=False, default=generate_ticket_ref)
    subject    = db.Column(db.Text, nullable=False)
    category   = db.Column(db.Text, default="General")
    message    = db.Column(db.Text, nullable=False)
    status     = db.Column(db.Text, default="Open")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id":         self.id,
            "ticket_ref": self.ticket_ref,
            "subject":    self.subject,
            "category":   self.category,
            "message":    self.message,
            "status":     self.status,
            "created_at": self.created_at.strftime("%Y-%m-%d") if self.created_at else None,
        }
