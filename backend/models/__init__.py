from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

from .user import User
from .settings import UserSettings
from .session import Session
from .message import Message
from .mood import MoodLog
from .reaction import Reaction
from .assessment import Assessment, AssessmentAnswer
from .badge import Badge, UserBadge
from .community import CommunityPost, PostComment, PostLike, ContentReport
from .emergency import EmergencyContact
from .program import Program, ProgramModule, UserEnrollment, ModuleCompletion
from .resource import Resource, SavedResource
from .support import SupportTicket
from .activity_stats import ActivityStats
from .daily_checkin import DailyCheckin