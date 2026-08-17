import uuid
from datetime import datetime
from . import db


def generate_uuid():
    return str(uuid.uuid4())


class Resource(db.Model):
    __tablename__ = "resources"

    id          = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    title       = db.Column(db.Text, nullable=False)
    category    = db.Column(db.Text, nullable=False, default="")
    tag         = db.Column(db.Text, default="")
    read_time   = db.Column(db.Text, default="")
    image_url   = db.Column(db.Text, default="")
    description = db.Column(db.Text, default="")
    content     = db.Column(db.Text, default="")
    type        = db.Column(db.Text, default="article")   # 'article' | 'video'
    video_url   = db.Column(db.Text)
    guide       = db.Column(db.Text)
    duration    = db.Column(db.Text)
    is_active   = db.Column(db.Boolean, default=True)
    created_at  = db.Column(db.DateTime, default=datetime.utcnow)

    saved_by = db.relationship("SavedResource", backref="resource", lazy=True, cascade="all, delete-orphan")

    def to_dict(self, is_saved=False):
        return {
            "id":          self.id,
            "title":       self.title,
            "category":    self.category,
            "tag":         self.tag,
            "read_time":   self.read_time,
            "image_url":   self.image_url,
            "bg_url":      self.image_url,   # alias for frontend compat
            "description": self.description,
            "content":     self.content,
            "type":        self.type,
            "video_url":   self.video_url,
            "guide":       self.guide,
            "duration":    self.duration,
            "saved":       is_saved,
        }


class SavedResource(db.Model):
    __tablename__ = "saved_resources"

    id          = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    user_id     = db.Column(db.String(36), db.ForeignKey("users.id",    ondelete="CASCADE"), nullable=False)
    resource_id = db.Column(db.String(36), db.ForeignKey("resources.id", ondelete="CASCADE"), nullable=False)
    saved_at    = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (db.UniqueConstraint("user_id", "resource_id"),)
