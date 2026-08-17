from flask import Blueprint, request, jsonify
from models import db, CommunityPost, PostComment, PostLike, ContentReport, User
from utils.security import token_required
from utils.supabase_client import supabase_insert

community_bp = Blueprint("community", __name__, url_prefix="/api/community")


@community_bp.route("/posts", methods=["GET"])
def get_posts():
    user_id = None
    auth_header = request.headers.get("Authorization")
    if auth_header:
        parts = auth_header.split()
        if len(parts) == 2 and parts[0].lower() == "bearer":
            from utils.security import decode_token
            user_id = decode_token(parts[1]) or parts[1]

    posts = (
        CommunityPost.query
        .order_by(CommunityPost.created_at.desc())
        .all()
    )
    return jsonify({"posts": [p.to_dict(current_user_id=user_id) for p in posts]}), 200


@community_bp.route("/posts", methods=["POST"])
@token_required
def create_post():
    data = request.get_json() or {}
    title = data.get("title", "").strip()
    content = data.get("content", "").strip()
    category = data.get("category", "").strip() or data.get("tag", "General").strip()
    is_anonymous = bool(data.get("is_anonymous", False))

    if not content:
        return jsonify({"error": "Content cannot be empty"}), 400

    if len(content) > 1000:
        return jsonify({"error": "Content exceeds 1000 character limit"}), 400

    if not title:
        title = content[:40] + ("..." if len(content) > 40 else "")

    author_name = data.get("author", "").strip() or data.get("author_display", "").strip() or data.get("name", "").strip()

    valid_user_id = request.user_id
    if valid_user_id:
        user_exists = User.query.get(valid_user_id)
        if not user_exists:
            first_user = User.query.first()
            valid_user_id = first_user.id if first_user else None

    post = CommunityPost(
        user_id=valid_user_id,
        author_name=author_name if author_name else None,
        title=title,
        content=content,
        category=category,
        tag=category,
        is_anonymous=is_anonymous
    )
    db.session.add(post)
    db.session.commit()

    # Sync to Supabase PostgreSQL table
    try:
        supabase_insert("community_posts", {
            "id": post.id,
            "user_id": post.user_id,
            "title": post.title,
            "content": post.content,
            "tag": post.category,
            "is_anonymous": post.is_anonymous,
            "created_at": post.created_at.isoformat() if post.created_at else None,
            "updated_at": post.updated_at.isoformat() if post.updated_at else None
        })
    except Exception as e:
        print(f"Supabase sync notice for post: {e}")

    return jsonify({"message": "Post created", "post": post.to_dict(current_user_id=request.user_id)}), 201


@community_bp.route("/posts/<post_id>", methods=["PUT"])
@token_required
def update_post(post_id):
    data = request.get_json() or {}
    content = data.get("content", "").strip()
    title = data.get("title", "").strip()
    category = data.get("category", "").strip() or data.get("tag", "").strip()

    if not content:
        return jsonify({"error": "Content cannot be empty"}), 400

    if len(content) > 1000:
        return jsonify({"error": "Content exceeds 1000 character limit"}), 400

    post = CommunityPost.query.get(post_id)
    if not post:
        return jsonify({"error": "Post not found"}), 404

    if str(post.user_id) != str(request.user_id):
        return jsonify({"error": "Unauthorized to edit this discussion"}), 403

    post.content = content
    if title:
        post.title = title
    if category:
        post.category = category
        post.tag = category
    if "is_anonymous" in data:
        post.is_anonymous = bool(data.get("is_anonymous"))

    db.session.commit()

    return jsonify({"message": "Post updated successfully", "post": post.to_dict(current_user_id=request.user_id)}), 200


@community_bp.route("/posts/<post_id>", methods=["DELETE"])
@token_required
def delete_post(post_id):
    post = CommunityPost.query.get(post_id)
    if not post:
        return jsonify({"error": "Post not found"}), 404

    if str(post.user_id) != str(request.user_id):
        return jsonify({"error": "Unauthorized to delete this discussion"}), 403

    db.session.delete(post)
    db.session.commit()

    try:
        from utils.supabase_client import supabase_delete
        supabase_delete("community_posts", {"id": f"eq.{post_id}"})
    except Exception as e:
        print(f"Supabase delete notice for post {post_id}: {e}")

    return jsonify({"message": "Post deleted successfully"}), 200


@community_bp.route("/posts/<post_id>/like", methods=["POST"])
@token_required
def toggle_like(post_id):
    user_id = request.user_id
    post = CommunityPost.query.get(post_id)
    if not post:
        return jsonify({"error": "Post not found"}), 404

    like = PostLike.query.filter_by(post_id=post_id, user_id=user_id).first()
    if like:
        db.session.delete(like)
        is_liked = False
    else:
        like = PostLike(post_id=post_id, user_id=user_id)
        db.session.add(like)
        is_liked = True

        try:
            supabase_insert("reactions", {
                "id": like.id,
                "post_id": post_id,
                "user_id": user_id,
                "reaction_type": "like"
            })
        except Exception as e:
            print(f"Supabase sync notice for reaction: {e}")

    db.session.commit()

    # Recalculate distinct user reactions for post
    actual_count = PostLike.query.filter_by(post_id=post_id).count()
    post.likes_count = actual_count
    db.session.commit()

    return jsonify({
        "message": "Reaction updated",
        "isLiked": is_liked,
        "is_liked": is_liked,
        "likeCount": actual_count,
        "likes": actual_count
    }), 200


@community_bp.route("/posts/<post_id>/comments", methods=["POST"])
@token_required
def add_comment(post_id):
    data = request.get_json() or {}
    content = data.get("text", "").strip() or data.get("content", "").strip()
    is_anonymous = bool(data.get("is_anonymous", False))

    if not content:
        return jsonify({"error": "Comment text cannot be empty"}), 400

    post = CommunityPost.query.get(post_id)
    if not post:
        return jsonify({"error": "Post not found"}), 404

    comment = PostComment(
        post_id=post_id,
        user_id=request.user_id,
        content=content,
        is_anonymous=is_anonymous
    )
    db.session.add(comment)
    db.session.commit()

    try:
        supabase_insert("comments", {
            "id": comment.id,
            "post_id": post_id,
            "user_id": request.user_id,
            "content": content,
            "is_anonymous": is_anonymous
        })
    except Exception as e:
        print(f"Supabase sync notice for comment: {e}")

    return jsonify({"message": "Comment added", "comment": comment.to_dict(current_user_id=request.user_id)}), 201


@community_bp.route("/comments/<comment_id>", methods=["DELETE"])
@token_required
def delete_comment(comment_id):
    comment = PostComment.query.get(comment_id)
    if not comment:
        return jsonify({"error": "Comment not found"}), 404

    if str(comment.user_id) != str(request.user_id):
        return jsonify({"error": "Unauthorized to delete this comment"}), 403

    db.session.delete(comment)
    db.session.commit()

    return jsonify({"message": "Comment deleted successfully"}), 200


@community_bp.route("/reports", methods=["POST"])
@token_required
def report_content():
    data = request.get_json() or {}
    post_id = data.get("post_id")
    comment_id = data.get("comment_id")
    reason = data.get("reason", "").strip()

    if not reason:
        return jsonify({"error": "Reason is required for submitting a report"}), 400

    report = ContentReport(
        reporter_user_id=request.user_id,
        post_id=post_id,
        comment_id=comment_id,
        reason=reason
    )
    db.session.add(report)
    db.session.commit()

    try:
        supabase_insert("reports", {
            "id": report.id,
            "reporter_user_id": request.user_id,
            "post_id": post_id,
            "comment_id": comment_id,
            "reason": reason,
            "status": "pending"
        })
    except Exception as e:
        print(f"Supabase sync notice for report: {e}")

    return jsonify({"message": "Report submitted successfully. Thank you for keeping MindEase safe."}), 201

