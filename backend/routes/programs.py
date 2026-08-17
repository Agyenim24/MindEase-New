from flask import Blueprint, request, jsonify
from models import db, Program, ProgramModule, UserEnrollment, ModuleCompletion, User
from utils.security import token_required
from datetime import datetime

programs_bp = Blueprint("programs", __name__, url_prefix="/api/programs")


DEFAULT_PROGRAMS = [
    {
        "id": "prog-1",
        "title": "Anxiety Relief Blueprint",
        "category": "Anxiety",
        "instructor": "Dr. Aris Thorne",
        "duration": "4 Weeks",
        "level": "Beginner",
        "description": "A comprehensive guide to understanding anxiety triggers, regulating nervous system responses, and building practical cognitive strategies."
    },
    {
        "id": "prog-2",
        "title": "Mindful Sleep Essentials",
        "category": "Sleep",
        "instructor": "Sarah Jenkins, M.Sc.",
        "duration": "2 Weeks",
        "level": "All Levels",
        "description": "Reset your circadian rhythm, soothe racing nighttime thoughts, and establish deeply restorative sleep hygiene routines."
    },
    {
        "id": "prog-3",
        "title": "Overcoming Burnout & Overwhelm",
        "category": "Stress",
        "instructor": "Elena Rostova",
        "duration": "3 Weeks",
        "level": "Intermediate",
        "description": "Reclaim your energy, set healthy boundaries at work and home, and build emotional resilience against chronic exhaustion."
    },
    {
        "id": "prog-4",
        "title": "CBT Skills for Daily Stress",
        "category": "CBT",
        "instructor": "Dr. Michael Chang",
        "duration": "5 Weeks",
        "level": "Intermediate",
        "description": "Master practical Cognitive Behavioral Therapy techniques to reframe catastrophic thoughts and tackle everyday stress."
    },
    {
        "id": "prog-5",
        "title": "7-Day Stress Relief Program",
        "category": "Stress",
        "instructor": "Dr. Aris Thorne",
        "duration": "1 Week",
        "level": "Beginner",
        "description": "A focused 7-day programme combining breathwork, mindfulness, and psychoeducation to dramatically reduce stress in just one week."
    }
]


def seed_programs():
    try:
        for p_item in DEFAULT_PROGRAMS:
            existing = Program.query.get(p_item["id"]) or Program.query.filter_by(title=p_item["title"]).first()
            if not existing:
                p = Program(
                    id=p_item["id"],
                    title=p_item["title"],
                    category=p_item["category"],
                    instructor=p_item["instructor"],
                    duration=p_item["duration"],
                    level=p_item["level"],
                    description=p_item["description"],
                    is_active=True
                )
                db.session.add(p)
        db.session.commit()
    except Exception as e:
        print(f"Seed programs notice: {e}")


@programs_bp.route("", methods=["GET"])
@token_required
def get_programs():
    seed_programs()
    user_id = request.user_id
    programs = Program.query.filter_by(is_active=True).all()

    user_enrollments = {e.program_id: e for e in UserEnrollment.query.filter_by(user_id=user_id).all()}

    result = []
    for p in programs:
        enrollment = user_enrollments.get(p.id)
        result.append(p.to_dict(include_modules=True, user_enrollment=enrollment))

    return jsonify({"programs": result}), 200


@programs_bp.route("/<program_id>", methods=["GET"])
@token_required
def get_program_details(program_id):
    p = Program.query.get(program_id)
    if not p:
        return jsonify({"error": "Program not found"}), 404

    user_id = request.user_id
    enrollment = UserEnrollment.query.filter_by(user_id=user_id, program_id=program_id).first()

    # Get completions for user
    completions = {c.module_id: c for c in ModuleCompletion.query.filter_by(user_id=user_id).all()}

    modules_data = []
    for m in sorted(p.modules, key=lambda x: x.sort_order):
        c = completions.get(m.id)
        modules_data.append(m.to_dict(completion=c))

    p_dict = p.to_dict(include_modules=False, user_enrollment=enrollment)
    p_dict["modules"] = modules_data
    return jsonify({"program": p_dict}), 200


@programs_bp.route("/<program_id>/enroll", methods=["POST"])
@token_required
def toggle_enroll(program_id):
    user_id = request.user_id
    p = Program.query.get(program_id)
    if not p:
        return jsonify({"error": "Program not found"}), 404

    enrollment = UserEnrollment.query.filter_by(user_id=user_id, program_id=program_id).first()
    if enrollment:
        db.session.delete(enrollment)
        enrolled = False
        progress = 0
    else:
        enrollment = UserEnrollment(user_id=user_id, program_id=program_id, progress=10)
        db.session.add(enrollment)
        enrolled = True
        progress = 10

    from routes.users import get_or_create_stats
    from utils.supabase_client import supabase_insert
    from datetime import timedelta

    stats = get_or_create_stats(user_id)
    today = datetime.utcnow().date()
    yesterday = today - timedelta(days=1)

    if enrolled:
        if stats.last_activity_date is None:
            stats.activity_streak = 1
        elif stats.last_activity_date == today:
            pass
        elif stats.last_activity_date == yesterday:
            stats.activity_streak += 1
        else:
            stats.activity_streak = 1

        stats.last_activity_date = today
        stats.programs_completed = (stats.programs_completed or 0) + 1

        user = User.query.get(user_id)
        if user:
            user.streak = stats.activity_streak
            user.total_sessions = (stats.exercises_completed + stats.programs_completed + stats.mood_entries)

    db.session.commit()

    try:
        supabase_insert("activity_stats", stats.to_dict())
    except Exception as e:
        print(f"Supabase activity stats sync notice: {e}")

    return jsonify({"message": "Enrollment status updated", "enrolled": enrolled, "progress": progress}), 200


@programs_bp.route("/<program_id>/modules/<module_id>/complete", methods=["POST"])
@token_required
def toggle_module_complete(program_id, module_id):
    user_id = request.user_id
    module = ProgramModule.query.get(module_id)
    if not module or module.program_id != program_id:
        return jsonify({"error": "Module not found in this program"}), 404

    completion = ModuleCompletion.query.filter_by(user_id=user_id, module_id=module_id).first()
    if completion:
        db.session.delete(completion)
        completed = False
    else:
        data = request.get_json() or {}
        completion = ModuleCompletion(
            user_id=user_id,
            module_id=module_id,
            mood_before=data.get("mood_before"),
            mood_after=data.get("mood_after")
        )
        db.session.add(completion)
        completed = True

    # Recalculate enrollment progress
    p_modules = ProgramModule.query.filter_by(program_id=program_id).all()
    all_module_ids = [m.id for m in p_modules]
    user_completions_count = ModuleCompletion.query.filter(
        ModuleCompletion.user_id == user_id,
        ModuleCompletion.module_id.in_(all_module_ids)
    ).count()

    progress = round((user_completions_count / len(all_module_ids)) * 100) if all_module_ids else 0

    if completed:
        from routes.users import get_or_create_stats
        from utils.supabase_client import supabase_insert
        from datetime import timedelta

        stats = get_or_create_stats(user_id)
        today = datetime.utcnow().date()
        yesterday = today - timedelta(days=1)

        if stats.last_activity_date is None:
            stats.activity_streak = 1
        elif stats.last_activity_date == today:
            pass
        elif stats.last_activity_date == yesterday:
            stats.activity_streak += 1
        else:
            stats.activity_streak = 1

        stats.last_activity_date = today
        stats.exercises_completed = (stats.exercises_completed or 0) + 1

        user = User.query.get(user_id)
        if user:
            user.streak = stats.activity_streak
            user.total_sessions = (stats.exercises_completed + stats.programs_completed + stats.mood_entries)

        try:
            supabase_insert("activity_stats", stats.to_dict())
        except Exception as e:
            print(f"Supabase activity stats sync notice: {e}")

    db.session.commit()
    return jsonify({"message": "Module completion toggled", "completed": completed, "progress": progress}), 200
