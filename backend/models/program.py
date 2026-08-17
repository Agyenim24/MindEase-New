import uuid
from datetime import datetime
from . import db
from sqlalchemy.dialects.postgresql import ARRAY


def generate_uuid():
    return str(uuid.uuid4())


class Program(db.Model):
    __tablename__ = "programs"

    id              = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    title           = db.Column(db.Text, nullable=False)
    category        = db.Column(db.Text, nullable=False, default="")
    instructor      = db.Column(db.Text, nullable=False, default="")
    duration        = db.Column(db.Text, nullable=False, default="")
    level           = db.Column(db.Text, nullable=False, default="Beginner")
    description     = db.Column(db.Text, default="")
    image_url       = db.Column(db.Text, default="")
    recommended_for = db.Column(db.Text, default="")   # JSON-stored list as text (SQLite-safe)
    is_active       = db.Column(db.Boolean, default=True)
    created_at      = db.Column(db.DateTime, default=datetime.utcnow)

    modules     = db.relationship("ProgramModule",  backref="program", lazy=True, cascade="all, delete-orphan")
    enrollments = db.relationship("UserEnrollment", backref="program", lazy=True, cascade="all, delete-orphan")

    def to_dict(self, include_modules=False, user_enrollment=None):
        import json
        data = {
            "id":              self.id,
            "title":           self.title,
            "category":        self.category,
            "instructor":      self.instructor,
            "duration":        self.duration,
            "level":           self.level,
            "description":     self.description,
            "image_url":       self.image_url,
            "recommended_for": json.loads(self.recommended_for) if self.recommended_for else [],
            "is_active":       self.is_active,
        }
        if user_enrollment:
            data["enrolled"] = True
            data["progress"] = user_enrollment.progress
        else:
            data["enrolled"] = False
            data["progress"] = 0
        if include_modules:
            data["modules"] = [m.to_dict() for m in sorted(self.modules, key=lambda x: x.sort_order)]
        return data


class ProgramModule(db.Model):
    __tablename__ = "program_modules"

    id           = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    program_id   = db.Column(db.String(36), db.ForeignKey("programs.id", ondelete="CASCADE"), nullable=False)
    title        = db.Column(db.Text, nullable=False)
    duration     = db.Column(db.Text, default="")
    type         = db.Column(db.Text, nullable=False, default="article")
    sort_order   = db.Column(db.Integer, default=0)
    article_id   = db.Column(db.Text)
    breathing_id = db.Column(db.Text)
    created_at   = db.Column(db.DateTime, default=datetime.utcnow)

    completions  = db.relationship("ModuleCompletion", backref="module", lazy=True, cascade="all, delete-orphan")

    def to_dict(self, completion=None):
        data = {
            "id":           self.id,
            "program_id":   self.program_id,
            "title":        self.title,
            "duration":     self.duration,
            "type":         self.type,
            "sort_order":   self.sort_order,
            "article_id":   self.article_id,
            "breathing_id": self.breathing_id,
            "completed":    False,
            "mood_before":  None,
            "mood_after":   None,
            "reminder":     None,
        }
        if completion:
            data["completed"]   = True
            data["mood_before"] = completion.mood_before
            data["mood_after"]  = completion.mood_after
            data["reminder"]    = str(completion.reminder) if completion.reminder else None
        return data


class UserEnrollment(db.Model):
    __tablename__ = "user_enrollments"

    id          = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    user_id     = db.Column(db.String(36), db.ForeignKey("users.id",    ondelete="CASCADE"), nullable=False)
    program_id  = db.Column(db.String(36), db.ForeignKey("programs.id", ondelete="CASCADE"), nullable=False)
    progress    = db.Column(db.Integer, default=0)
    enrolled_at = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (db.UniqueConstraint("user_id", "program_id"),)

    def to_dict(self):
        return {
            "id":          self.id,
            "user_id":     self.user_id,
            "program_id":  self.program_id,
            "progress":    self.progress,
            "enrolled_at": self.enrolled_at.isoformat() if self.enrolled_at else None,
        }


class ModuleCompletion(db.Model):
    __tablename__ = "module_completions"

    id           = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    user_id      = db.Column(db.String(36), db.ForeignKey("users.id",          ondelete="CASCADE"), nullable=False)
    module_id    = db.Column(db.String(36), db.ForeignKey("program_modules.id", ondelete="CASCADE"), nullable=False)
    mood_before  = db.Column(db.Text)
    mood_after   = db.Column(db.Text)
    reminder     = db.Column(db.Time)
    completed_at = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (db.UniqueConstraint("user_id", "module_id"),)

    def to_dict(self):
        return {
            "id":           self.id,
            "module_id":    self.module_id,
            "mood_before":  self.mood_before,
            "mood_after":   self.mood_after,
            "reminder":     str(self.reminder) if self.reminder else None,
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
        }
