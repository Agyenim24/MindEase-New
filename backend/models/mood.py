import uuid
from datetime import datetime
from . import db


def generate_uuid():
    return str(uuid.uuid4())


class MoodLog(db.Model):
    __tablename__ = "mood_logs"

    id        = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    user_id   = db.Column(db.String(36), db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    emotion   = db.Column(db.Text, nullable=False)
    note      = db.Column(db.Text, default="")
    logged_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id":        self.id,
            "user_id":   self.user_id,
            "emotion":   self.emotion,
            "note":      self.note,
            "date":      self.logged_at.strftime("%Y-%m-%d") if self.logged_at else None,
            "logged_at": self.logged_at.isoformat() if self.logged_at else None,
        }