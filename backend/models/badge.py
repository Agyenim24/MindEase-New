import uuid
from datetime import datetime
from . import db


def generate_uuid():
    return str(uuid.uuid4())


class Badge(db.Model):
    __tablename__ = "badges"

    id          = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    name        = db.Column(db.Text, unique=True, nullable=False)
    description = db.Column(db.Text, default="")
    icon        = db.Column(db.Text, default="star")
    color       = db.Column(db.Text, default="text-amber-500 bg-amber-500/10")
    condition   = db.Column(db.Text, default="")
    created_at  = db.Column(db.DateTime, default=datetime.utcnow)

    user_badges = db.relationship("UserBadge", backref="badge", lazy=True, cascade="all, delete-orphan")

    def to_dict(self, earned=False, earned_at=None):
        return {
            "id":          self.id,
            "name":        self.name,
            "description": self.description,
            "icon":        self.icon,
            "color":       self.color,
            "condition":   self.condition,
            "earned":      earned,
            "earned_at":   earned_at.isoformat() if earned_at else None,
        }


class UserBadge(db.Model):
    __tablename__ = "user_badges"

    id        = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    user_id   = db.Column(db.String(36), db.ForeignKey("users.id",  ondelete="CASCADE"), nullable=False)
    badge_id  = db.Column(db.String(36), db.ForeignKey("badges.id", ondelete="CASCADE"), nullable=False)
    earned_at = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (db.UniqueConstraint("user_id", "badge_id"),)
