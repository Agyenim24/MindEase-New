import uuid
from datetime import datetime
from . import db


def generate_uuid():
    return str(uuid.uuid4())


class UserSettings(db.Model):
    __tablename__ = "user_settings"

    id                     = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    user_id                = db.Column(db.String(36), db.ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    email_notifications    = db.Column(db.Boolean, default=True)
    sms_reminders          = db.Column(db.Boolean, default=False)
    daily_checkin_reminder = db.Column(db.Boolean, default=True)
    reminder_time          = db.Column(db.Time)
    sound_effects          = db.Column(db.Boolean, default=True)
    analytics_opt_in       = db.Column(db.Boolean, default=False)
    privacy_level          = db.Column(db.Text, default="Standard")
    dark_mode              = db.Column(db.Boolean, default=False)
    language               = db.Column(db.Text, default="en")
    created_at             = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at             = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "email_notifications":    self.email_notifications,
            "sms_reminders":          self.sms_reminders,
            "daily_checkin_reminder": self.daily_checkin_reminder,
            "reminder_time":          str(self.reminder_time) if self.reminder_time else "20:00",
            "sound_effects":          self.sound_effects,
            "analytics_opt_in":       self.analytics_opt_in,
            "privacy_level":          self.privacy_level,
            "dark_mode":              self.dark_mode,
            "language":               self.language,
        }
