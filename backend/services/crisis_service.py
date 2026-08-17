from flask import current_app
import re

CRISIS_RESPONSE = {
    "en": (
        "🚨 **Emergency & Critical Safety Support**\n\n"
        "I hear that you are going through an immense amount of pain or a critical situation right now. Your health and safety matter deeply, and you do not have to handle this alone.\n\n"
        "🏥 **FIND NEAREST MEDICAL CARE**:\n"
        "If you require immediate medical or psychiatric assistance, please visit or call the nearest hospital or emergency clinic right away:\n"
        "• 📍 Search Nearest Hospital/Clinic: https://www.google.com/maps/search/nearest+hospital+clinic\n\n"
        "📞 **CALL EMERGENCY CONTACTS & HELPLINES**:\n"
        "Please connect with emergency services or your saved personal emergency contacts on MindEase:\n"
        "• 🇺🇸/🌐 **988 Lifeline**: Call or text **988** (Free, 24/7)\n"
        "• 💬 **Crisis Text Line**: Text **HOME to 741741**\n"
        "• 🇬🇭 **Ghana Emergency Services**: Call **112** or **193** | Helpline: **0800 111 222**\n"
        "• 🌐 **Global Helplines**: https://findahelpline.com/\n\n"
        "Please reach out to an emergency doctor, a loved one, or emergency services immediately."
    ),
    "tw": (
        "🚨 **Bɔwoho ban - Bɔ Mpae / Kɔ Ayaresabea**\n\n"
        "Me hu w'asem no mu na mehia wo. W'nkwa ho hia paa.\n"
        "Kɔ ayaresabea (hospital/clinic) a ɛbɛn wo sesei ara so:\n"
        "• 🏥 Ayaresabea a ɛbɛn wo: https://www.google.com/maps/search/nearest+hospital+clinic\n"
        "• 🇬🇭 Ghana Helpline: 0800 111 222 (Toll Free 24/7)\n"
        "• Emergency: 112 / 193"
    ),
    "fr": (
        "🚨 **Soutien d'Urgence & Sécurité Médicale**\n\n"
        "Votre sécurité et votre santé sont primordiales. Si vous êtes dans une situation critique ou d'urgence médicale:\n\n"
        "• 🏥 Trouvez l'hôpital ou la clinique la plus proche: https://www.google.com/maps/search/nearest+hospital+clinic\n"
        "• Ligne d'urgence Ghana: 0800 111 222 | Urgences: 112 / 193\n"
        "• International: https://findahelpline.com/"
    )
}


def is_crisis(text: str) -> bool:
    """Check if user message contains crisis/self-harm/medical emergency language."""
    text_lower = (text or "").lower()
    pattern = r"kill(ing)?\s*(my\s*self|myself)|end\s*(my\s*life|it\s*all)|want\s*to\s*die|suicid|self\s*harm|hurt(ing)?\s*(my\s*self|myself)|harm(ing)?\s*(my\s*self|myself)|take\s*my\s*life|no\s*reason\s*to\s*live|give\s*up\s*on\s*life|can'?t\s*breathe|chest\s*pain|heart\s*attack|critical\s*condition|need\s*a?\s*hospital|nearest\s*(hospital|clinic)|emergency\s*help|dying|passing\s*out|overdose"
    if re.search(pattern, text_lower):
        return True

    try:
        keywords = current_app.config.get("CRISIS_KEYWORDS", [])
        return any(re.search(rf"\b{re.escape(kw)}\b", text_lower) for kw in keywords if kw)
    except Exception:
        return False


def get_crisis_response(language: str = "en") -> str:
    """Return crisis response in the user's preferred language."""
    return CRISIS_RESPONSE.get(language, CRISIS_RESPONSE["en"])
