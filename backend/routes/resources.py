from flask import Blueprint, request, jsonify
from models import db, Resource, SavedResource
from utils.security import token_required

resources_bp = Blueprint("resources", __name__, url_prefix="/api/resources")

DEFAULT_VIDEO_RESOURCES = [
    {
        "title": "Stress Relief & Inner Calmness",
        "category": "Stress",
        "tag": "Guided Video",
        "read_time": "10:15",
        "image_url": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
        "description": "A 10-minute guided stress relief session designed to regulate your autonomic nervous system, soothe racing thoughts, and restore emotional equilibrium.",
        "content": "Guided session by Dr. Aris Thorne",
        "type": "video",
        "video_url": "/assets/videos/streessRelief.mp4",
        "guide": "Guided by Dr. Aris Thorne",
        "duration": "10:15"
    },
    {
        "title": "Mindful Yoga & Somatic Movement",
        "category": "Mindfulness",
        "tag": "Yoga Session",
        "read_time": "18:30",
        "image_url": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80",
        "description": "An immersive mindful yoga flow combining deep diaphragmatic breathing with gentle somatic stretches to release stored physical tension.",
        "content": "Guided session by Elena Rostova",
        "type": "video",
        "video_url": "/assets/videos/yoga.mp4",
        "guide": "Guided by Elena Rostova",
        "duration": "18:30"
    },
    {
        "title": "Morning Grounding & Breathwork",
        "category": "Anxiety",
        "tag": "Morning Practice",
        "read_time": "12:00",
        "image_url": "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80",
        "description": "Gentle morning grounding and vagus nerve stimulation practice to clear morning brain fog and build resilience against daily anxiety.",
        "content": "Guided session by Sarah Jenkins, M.Sc.",
        "type": "video",
        "video_url": "/assets/videos/streessRelief.mp4",
        "guide": "Guided by Sarah Jenkins, M.Sc.",
        "duration": "12:00"
    },
    {
        "title": "Restorative Sunset Yoga & Sleep Prep",
        "category": "Sleep",
        "tag": "Evening Yoga",
        "read_time": "20:00",
        "image_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "description": "A tranquil evening yoga flow and progressive relaxation session to signal your body that it is time for deep, restful sleep.",
        "content": "Ambient Yoga Series",
        "type": "video",
        "video_url": "/assets/videos/yoga.mp4",
        "guide": "Ambient Yoga Series",
        "duration": "20:00"
    }
]


def seed_video_resources():
    try:
        for item in DEFAULT_VIDEO_RESOURCES:
            existing = Resource.query.filter_by(title=item["title"]).first()
            if not existing:
                res = Resource(
                    title=item["title"],
                    category=item["category"],
                    tag=item["tag"],
                    read_time=item["read_time"],
                    image_url=item["image_url"],
                    description=item["description"],
                    content=item["content"],
                    type=item["type"],
                    video_url=item["video_url"],
                    guide=item["guide"],
                    duration=item["duration"],
                    is_active=True
                )
                db.session.add(res)
        db.session.commit()
    except Exception as e:
        print(f"Seed video resources notice: {e}")


@resources_bp.route("", methods=["GET"])
@token_required
def get_resources():
    seed_video_resources()
    user_id = request.user_id
    category = request.args.get("category")
    res_type = request.args.get("type")

    query = Resource.query.filter_by(is_active=True)
    if category and category != "All":
        query = query.filter_by(category=category)
    if res_type:
        query = query.filter_by(type=res_type)

    resources = query.order_by(Resource.created_at.desc()).all()
    saved_ids = {s.resource_id for s in SavedResource.query.filter_by(user_id=user_id).all()}

    return jsonify({
        "resources": [r.to_dict(is_saved=(r.id in saved_ids)) for r in resources],
        "saved_ids": list(saved_ids)
    }), 200


@resources_bp.route("/<resource_id>/save", methods=["POST"])
@token_required
def toggle_save_resource(resource_id):
    user_id = request.user_id
    resource = Resource.query.get(resource_id)
    if not resource:
        return jsonify({"error": "Resource not found"}), 404

    saved_item = SavedResource.query.filter_by(user_id=user_id, resource_id=resource_id).first()
    if saved_item:
        db.session.delete(saved_item)
        saved = False
    else:
        saved_item = SavedResource(user_id=user_id, resource_id=resource_id)
        db.session.add(saved_item)
        saved = True

    db.session.commit()
    return jsonify({"message": "Bookmark status updated", "saved": saved}), 200
