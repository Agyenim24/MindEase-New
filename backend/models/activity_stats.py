import uuid
from datetime import datetime
from . import db


def generate_uuid():
    return str(uuid.uuid4())


class ActivityStats(db.Model):
    __tablename__ = "activity_stats"

    id                  = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    user_id             = db.Column(db.String(36), db.ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    activity_streak     = db.Column(db.Integer, default=0)
    exercises_completed = db.Column(db.Integer, default=0)
    programs_completed  = db.Column(db.Integer, default=0)
    mood_entries        = db.Column(db.Integer, default=0)
    last_activity_date  = db.Column(db.Date, nullable=True)
    created_at          = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at          = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id":                  self.id,
            "user_id":             self.user_id,
            "activity_streak":     self.activity_streak or 0,
            "exercises_completed": self.exercises_completed or 0,
            "programs_completed":  self.programs_completed or 0,
            "mood_entries":        self.mood_entries or 0,
            "last_activity_date":  self.last_activity_date.isoformat() if self.last_activity_date else None,
            "created_at":          self.created_at.isoformat() if self.created_at else None,
            "updated_at":          self.updated_at.isoformat() if self.updated_at else None,
        }
