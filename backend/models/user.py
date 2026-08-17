import uuid
from datetime import datetime
from . import db


def generate_uuid():
    return str(uuid.uuid4())


class User(db.Model):
    __tablename__ = "users"

    id             = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    email          = db.Column(db.Text, unique=True, nullable=False)
    password_hash  = db.Column(db.Text, nullable=False)
    name           = db.Column(db.Text, nullable=False, default="")
    avatar_url     = db.Column(db.Text, default="")
    bio            = db.Column(db.Text, default="")
    streak         = db.Column(db.Integer, default=0)
    total_sessions = db.Column(db.Integer, default=0)
    created_at     = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at     = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    settings          = db.relationship("UserSettings",     backref="user", uselist=False, lazy=True, cascade="all, delete-orphan")
    mood_logs         = db.relationship("MoodLog",          backref="user", lazy=True, cascade="all, delete-orphan")
    assessments       = db.relationship("Assessment",       backref="user", lazy=True, cascade="all, delete-orphan")
    enrollments       = db.relationship("UserEnrollment",   backref="user", lazy=True, cascade="all, delete-orphan")
    completions       = db.relationship("ModuleCompletion", backref="user", lazy=True, cascade="all, delete-orphan")
    community_posts   = db.relationship("CommunityPost",    backref="user", lazy=True, cascade="all, delete-orphan")
    post_comments     = db.relationship("PostComment",      backref="user", lazy=True, cascade="all, delete-orphan")
    post_likes        = db.relationship("PostLike",         backref="user", lazy=True, cascade="all, delete-orphan")
    saved_resources   = db.relationship("SavedResource",    backref="user", lazy=True, cascade="all, delete-orphan")
    emergency_contacts= db.relationship("EmergencyContact", backref="user", lazy=True, cascade="all, delete-orphan")
    support_tickets   = db.relationship("SupportTicket",    backref="user", lazy=True)
    badges            = db.relationship("UserBadge",        backref="user", lazy=True, cascade="all, delete-orphan")

    def to_dict(self, include_private=False):
        data = {
            "id":             self.id,
            "name":           self.name,
            "email":          self.email,
            "avatar_url":     self.avatar_url,
            "bio":            self.bio,
            "streak":         self.streak,
            "total_sessions": self.total_sessions,
            "created_at":     self.created_at.isoformat() if self.created_at else None,
        }
        return data