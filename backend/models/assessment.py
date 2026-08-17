import uuid
from datetime import datetime
from . import db


def generate_uuid():
    return str(uuid.uuid4())


class Assessment(db.Model):
    __tablename__ = "assessments"

    id                       = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    user_id                  = db.Column(db.String(36), db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    score                    = db.Column(db.Integer, nullable=False, default=0)
    level                    = db.Column(db.Text, nullable=False, default="")
    recommendation           = db.Column(db.Text, default="")
    primary_goal             = db.Column(db.Text)
    primary_goal_title       = db.Column(db.Text)
    emotional_state          = db.Column(db.Text)
    emotional_state_title    = db.Column(db.Text)
    sleep_quality            = db.Column(db.Text)
    sleep_quality_title      = db.Column(db.Text)
    support_preference       = db.Column(db.Text)
    support_preference_title = db.Column(db.Text)
    taken_at                 = db.Column(db.DateTime, default=datetime.utcnow)

    answers = db.relationship("AssessmentAnswer", backref="assessment", lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id":                       self.id,
            "score":                    self.score,
            "level":                    self.level,
            "recommendation":           self.recommendation,
            "primary_goal":             self.primary_goal,
            "primary_goal_title":       self.primary_goal_title,
            "emotional_state":          self.emotional_state,
            "emotional_state_title":    self.emotional_state_title,
            "sleep_quality":            self.sleep_quality,
            "sleep_quality_title":      self.sleep_quality_title,
            "support_preference":       self.support_preference,
            "support_preference_title": self.support_preference_title,
            "date":                     self.taken_at.strftime("%Y-%m-%d") if self.taken_at else None,
            "taken_at":                 self.taken_at.isoformat() if self.taken_at else None,
        }


class AssessmentAnswer(db.Model):
    __tablename__ = "assessment_answers"

    id            = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    assessment_id = db.Column(db.String(36), db.ForeignKey("assessments.id", ondelete="CASCADE"), nullable=False)
    step_index    = db.Column(db.Integer, nullable=False)
    option_id     = db.Column(db.Text, nullable=False)
    option_title  = db.Column(db.Text, nullable=False)
    points        = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            "step_index":  self.step_index,
            "option_id":   self.option_id,
            "option_title": self.option_title,
            "points":      self.points,
        }
