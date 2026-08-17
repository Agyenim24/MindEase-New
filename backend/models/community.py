import uuid
from datetime import datetime
from . import db


def generate_uuid():
    return str(uuid.uuid4())


def get_anonymous_username(user_id: str) -> str:
    if not user_id:
        return "CalmMind23"
    prefixes = ["CalmMind", "HopefulMind", "PeacefulSoul", "SereneSpirit", "GentleHeart", "MindfulSeeker", "TranquilPath", "QuietCourage"]
    char_sum = sum(ord(c) for c in str(user_id))
    idx = char_sum % len(prefixes)
    num = (char_sum * 17) % 899 + 100
    return f"{prefixes[idx]}{num}"


def get_anonymous_avatar(user_id: str) -> str:
    seed = str(user_id or "mindease")
    return f"https://api.dicebear.com/7.x/identicon/svg?seed={seed}"


class CommunityPost(db.Model):
    __tablename__ = "community_posts"

    id           = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    user_id      = db.Column(db.String(36), db.ForeignKey("users.id", ondelete="CASCADE"), nullable=True)
    title        = db.Column(db.Text, nullable=False)
    content      = db.Column(db.Text, nullable=False)
    author_name  = db.Column(db.Text, nullable=True)
    category     = db.Column(db.Text, default="General")
    tag          = db.Column(db.Text, default="General")
    is_anonymous = db.Column(db.Boolean, default=False)
    likes_count  = db.Column(db.Integer, default=0)
    created_at   = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at   = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    comments = db.relationship("PostComment", backref="post", lazy=True, cascade="all, delete-orphan")
    likes    = db.relationship("PostLike",    backref="post", lazy=True, cascade="all, delete-orphan")

    def to_dict(self, current_user_id=None):
        is_liked = False
        if current_user_id:
            is_liked = any(str(like.user_id) == str(current_user_id) for like in self.likes)

        is_owner = str(self.user_id) == str(current_user_id) if current_user_id else False

        from models.user import User
        user_obj = User.query.get(self.user_id) if self.user_id else None

        if self.is_anonymous:
            author_display = "Anonymous"
            avatar_url = ""
        else:
            if hasattr(self, 'author_name') and self.author_name and self.author_name.strip():
                author_display = self.author_name.strip()
            elif user_obj and user_obj.name and user_obj.name.strip():
                author_display = user_obj.name.strip()
            else:
                author_display = get_anonymous_username(self.user_id or self.id)

            avatar_url = (user_obj.avatar_url if user_obj and user_obj.avatar_url else get_anonymous_avatar(self.user_id or self.id))

        created_iso = self.created_at.isoformat() if self.created_at else None
        if created_iso and not created_iso.endswith("Z"):
            created_iso += "Z"

        total_likes = self.likes_count if (self.likes_count is not None and self.likes_count > 0) else len(self.likes)
        total_comments = len(self.comments) if self.comments else 0

        return {
            "id":             self.id,
            "user_id":        self.user_id if is_owner else None,
            "owner_email":    user_obj.email if (is_owner and user_obj) else None,
            "author":         author_display,
            "author_display": author_display,
            "avatar":         avatar_url,
            "avatar_url":     avatar_url,
            "title":          self.title,
            "content":        self.content,
            "category":       self.category or self.tag or "General",
            "tag":            self.category or self.tag or "General",
            "is_anonymous":   bool(self.is_anonymous),
            "likeCount":      total_likes,
            "likes":          total_likes,
            "commentCount":   total_comments,
            "isLiked":        is_liked,
            "is_liked":       is_liked,
            "is_owner":       is_owner,
            "comments":       [c.to_dict(current_user_id=current_user_id) for c in self.comments],
            "created_at":     created_iso,
            "updated_at":     self.updated_at.isoformat() if self.updated_at else None
        }


class PostComment(db.Model):
    __tablename__ = "post_comments"

    id           = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    post_id      = db.Column(db.String(36), db.ForeignKey("community_posts.id", ondelete="CASCADE"), nullable=False)
    user_id      = db.Column(db.String(36), db.ForeignKey("users.id",           ondelete="CASCADE"), nullable=True)
    content      = db.Column(db.Text, nullable=False)
    is_anonymous = db.Column(db.Boolean, default=False)
    created_at   = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at   = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self, current_user_id=None):
        is_owner = str(self.user_id) == str(current_user_id) if current_user_id else False

        if self.is_anonymous:
            author_display = "Anonymous"
            avatar_url = ""
        else:
            from models.user import User
            user_obj = User.query.get(self.user_id) if self.user_id else None
            author_display = (user_obj.name.strip() if user_obj and user_obj.name and user_obj.name.strip() else get_anonymous_username(self.user_id))
            avatar_url = (user_obj.avatar_url if user_obj and user_obj.avatar_url else get_anonymous_avatar(self.user_id))

        created_iso = self.created_at.isoformat() if self.created_at else None
        if created_iso and not created_iso.endswith("Z"):
            created_iso += "Z"

        return {
            "id":             self.id,
            "post_id":        self.post_id,
            "user_id":        self.user_id if is_owner else None,
            "author":         author_display,
            "author_display": author_display,
            "avatar":         avatar_url,
            "avatar_url":     avatar_url,
            "text":           self.content,
            "content":        self.content,
            "is_anonymous":   bool(self.is_anonymous),
            "is_owner":       is_owner,
            "created_at":     created_iso
        }


class PostLike(db.Model):
    __tablename__ = "post_likes"

    id         = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    post_id    = db.Column(db.String(36), db.ForeignKey("community_posts.id", ondelete="CASCADE"), nullable=False)
    user_id    = db.Column(db.String(36), db.ForeignKey("users.id",           ondelete="CASCADE"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (db.UniqueConstraint("post_id", "user_id"),)


class ContentReport(db.Model):
    __tablename__ = "reports"

    id               = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    reporter_user_id = db.Column(db.String(36), db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    post_id          = db.Column(db.String(36), db.ForeignKey("community_posts.id", ondelete="CASCADE"), nullable=True)
    comment_id       = db.Column(db.String(36), db.ForeignKey("post_comments.id", ondelete="CASCADE"), nullable=True)
    reason           = db.Column(db.Text, nullable=False)
    status           = db.Column(db.Text, default="pending")
    created_at       = db.Column(db.DateTime, default=datetime.utcnow)

