import random

COPING_STRATEGIES = {
    "anxiety": [
        {
            "type": "breathing",
            "title": "Box Breathing Exercise",
            "body": "Try this: Inhale for 4 seconds → Hold for 4 seconds → Exhale for 4 seconds → Hold for 4 seconds. Repeat 4 times. This calms your nervous system quickly.",
            "duration_seconds": 64
        },
        {
            "type": "grounding",
            "title": "5-4-3-2-1 Grounding",
            "body": "Look around and name: 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste. This brings you back to the present moment.",
            "duration_seconds": None
        }
    ],
    "stress": [
        {
            "type": "breathing",
            "title": "4-7-8 Breathing",
            "body": "Inhale through your nose for 4 seconds → Hold for 7 seconds → Exhale through your mouth for 8 seconds. Do this 3 times to release tension.",
            "duration_seconds": 57
        }
    ],
    "neutral": [
        {
            "type": "mindfulness",
            "title": "Mindful Moment",
            "body": "Take 60 seconds to just breathe and notice how you feel right now — without judging it. Awareness is the first step to emotional wellbeing.",
            "duration_seconds": 60
        }
    ]
}

def get_coping_response(emotion: str, user_text: str = "") -> dict:
    t = (user_text or "").lower()
    return {
        "acknowledgement": "I hear you. Take things one moment at a time.",
        "strategy": COPING_STRATEGIES.get(emotion, COPING_STRATEGIES["neutral"])[0],
        "follow_up": "How are you feeling right now?"
    }


def format_bot_message(emotion: str, user_text: str = "", session_id: str = "", tone: str = "Empathetic", assessment: dict = None) -> str:
    t = (user_text or "").strip().lower()

    # 1. Exact Short Message Handlers (Section 3 & Section 17)
    if t == "tired" or "i'm tired" in t or "feeling tired" in t or "just tired" in t:
        return "Sounds like you're feeling pretty drained. Was it a long day, or have you been feeling tired for a while?"

    if t == "calm" or "i'm calm" in t or "feeling calm" in t:
        return "It's wonderful to have a calm moment. Have you been enjoying a peaceful day or taking time to unwind?"

    if t == "happy" or "i'm happy" in t or "feeling happy" in t or "so happy" in t:
        return "That's great to hear! 😊 What's been making you feel happy today?"

    if t == "stressed" or "i'm stressed" in t or "feeling stressed" in t or "so stressed" in t:
        return "It sounds like you've got a lot on your mind. What's been causing the most stress today?"

    if t == "sad" or "i'm sad" in t or "feeling sad" in t:
        return "I'm really sorry you're feeling down. Would you like to share what's been on your mind?"

    if t in ["okay", "good", "fine", "i'm good", "i'm fine", "doing okay", "im good", "im fine"]:
        return "Glad to hear things are stable today! How has the rest of your day been going?"

    if t in ["angry", "mad", "furious"]:
        return "It sounds like something really upset you. Would you like to vent about what happened?"

    if t in ["lonely", "alone", "isolated"]:
        return "Feeling lonely can be really tough. I'm right here with you — would you like to talk about what's going on?"

    if t in ["yes", "yeah", "yep", "sure"]:
        return "Sounds good! What would you like to focus on or talk about next?"

    if t in ["no", "nope", "not really"]:
        return "No problem at all! Take all the time you need for yourself."

    if "thanks" in t or "thank you" in t:
        return "You're very welcome! I'm glad I could help. Take good care of yourself today!"

    # 2. Specific Situations & Test Sequences (Section 17)
    if "new job" in t or "got a job" in t or "job offer" in t:
        return "That's fantastic news! 🎉 Congratulations on the new job! What kind of role did you get?"

    if "worked all day" in t or "working all day" in t:
        return "Working all day can definitely leave you feeling drained. Make sure to take some time to unwind tonight. How are you holding up after such a long day?"

    if any(k in t for k in ["exam", "exm", "test", "quiz", "midterm", "final exam", "studying", "study"]):
        if "failed" in t:
            return "I'm really sorry to hear that. Failing an exam is tough, but it doesn't define your intelligence or future. How are you holding up right now?"
        return "Exam pressure can really pile up! 📚 Are you feeling stressed about the amount of material to study, or is it fear of the exam itself? I can share study tips or a quick 2-minute breathing exercise to help you focus."

    if "scared about what happens next" in t or "scared about what happens" in t or "scared about the future" in t:
        return "It's completely natural to feel scared when facing uncertainty about what comes next. Let's take it one step at a time — what's the main concern on your mind right now?"

    if any(k in t for k in ["hi", "hello", "hey", "good morning", "good evening", "greetings"]):
        return "Hello! 👋 How are you doing today?"

    if any(k in t for k in ["breathing exercise", "guide me through breathing", "box breathing"]):
        return (
            "🫁 **2-Minute Box Breathing Exercise**\n\n"
            "Let's pause and restore calm together:\n\n"
            "1. **Inhale** for **4 seconds**...\n"
            "2. **Hold** for **4 seconds**...\n"
            "3. **Exhale** for **4 seconds**...\n"
            "4. **Hold** for **4 seconds**.\n\n"
            "Repeat 4 times. Focus on your steady rhythm. How are you feeling now?"
        )

    if any(k in t for k in ["what can you do to help me", "what can you do", "how can you help"]):
        return (
            "I'm **MindEase**, your AI mental wellness companion! 🌿 Here is how I can support you:\n\n"
            "• 🫁 **Guided Relaxation**: Box and 4-7-8 breathing exercises.\n"
            "• ⚓ **Grounding Techniques**: 5-4-3-2-1 sensory grounding.\n"
            "• 💡 **Mindfulness & Coping**: Practical tips for stress and burnout.\n"
            "• 📊 **Mood Tracking**: Log daily moods to monitor your well-being.\n\n"
            "What would you like to talk about or explore right now?"
        )

    # Default fallback when OpenRouter is unreachable, tailored to emotion
    if emotion == "anxiety":
        return "It sounds like anxiety is feeling intense right now. Take a gentle breath. What's causing the most worry today?"
    elif emotion == "stress":
        return "It sounds like you're carrying a lot of pressure right now. What's been weighing on you the most?"
    elif emotion == "depression":
        return "Thank you for reaching out and sharing. I'm here with you — would you like to talk about what's been on your mind?"
    elif emotion == "positive":
        return "That's wonderful to hear! 😊 What's been making things go well for you today?"

    return "Thank you for sharing that with me. What would be most helpful for us to focus on right now?"