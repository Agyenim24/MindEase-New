import uuid
from datetime import date, datetime
from . import db


def generate_uuid():
    return str(uuid.uuid4())


class DailyCheckin(db.Model):
    __tablename__ = "daily_checkins"

    id           = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    user_id      = db.Column(db.String(36), db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    mood         = db.Column(db.Text, nullable=False)
    note         = db.Column(db.Text, default="")
    checkin_date = db.Column(db.Date, nullable=False, default=date.today)
    created_at   = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at   = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Enforce one check-in per user per calendar day at the DB level
    __table_args__ = (
        db.UniqueConstraint("user_id", "checkin_date", name="uq_user_checkin_date"),
    )

    def to_dict(self):
        return {
            "id":            self.id,
            "user_id":       self.user_id,
            "mood":          self.mood,
            "note":          self.note or "",
            "check_in_date": self.checkin_date.isoformat() if self.checkin_date else None,
            "created_at":    self.created_at.isoformat() if self.created_at else None,
            "updated_at":    self.updated_at.isoformat() if self.updated_at else None,
        }
