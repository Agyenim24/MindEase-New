import os
import json
import re
import urllib.request
import logging
import time
from flask import current_app
from models import Message

logger = logging.getLogger(__name__)

def clean_ai_response(text: str) -> str:
    """
    Sanitizes AI output to strip out any hallucinated raw JSON tokens or trailing dataset fragments.
    """
    if not text:
        return ""

    # 1. Truncate if raw JSON array/role structure is leaked
    json_junk_match = re.search(r'(\["role"|\{"role"|,"role":|"content":\[|"assistant",)', text)
    if json_junk_match:
        text = text[:json_junk_match.start()].strip()

    # 2. Strip trailing quote/bracket artifacts
    text = text.rstrip('"]}\'').strip()

    return text

SYSTEM_PROMPT = """You are MindEase, a warm, natural, and empathetic conversational companion for mental wellness. You converse like an attentive, caring human friend.

==================================================
1. INTENT IDENTIFICATION & SPECIFIC RESPONSE (CRITICAL)
==================================================
Before generating your response, determine the exact meaning and intent of the LATEST user message:
- What is the user saying or communicating?
- Are they sharing an emotion, stating a goal/intention (e.g. "cutting down stress"), answering a question (e.g. "work", "my exams"), or sharing news (e.g. "I got a new job")?
- Connect your response SPECIFICALLY to what the user just said. Never output generic supportive paragraphs.

Examples:
- User: "tired" -> Acknowledge feeling drained. Ask if it was a long day or ongoing.
- User: "cutting down stress" -> Acknowledge their goal to reduce stress. Connect it to previous context (e.g., "That's a great goal, especially if you've been feeling tired lately. What tends to cause the most stress for you—work, school, or something else?")
- User: "work" -> Recognize work as the stress source: "Work seems to be taking a lot out of you. What about work has been causing the most stress?"
- User: "my exams" -> Address exam pressure: "Exam pressure can really pile up. Is it the amount of material to study or fear of the exam itself?"
- User: "I got a new job" -> Celebrate: "That's fantastic! 🎉 Congratulations! What kind of role did you get?"
- User: "I'm happy" -> Celebrate: "That's great to hear! 😊 What's been making you feel happy today?"

==================================================
2. CONVERSATION CONTINUITY & THREADING
==================================================
Use previous turns as ongoing context. Do NOT reset the conversation after every message.
Flow naturally across turns:
Example Thread:
  User: "I have worked all day." -> AI: "That sounds exhausting. How are you feeling after such a long day?"
  User: "tired" -> AI: "That makes total sense after working all day. Have you had a chance to rest yet?"
  User: "cutting down stress" -> AI: "If reducing stress is your goal, we can start with what's taking the most energy from you. Is work the biggest source of stress right now?"

==================================================
3. CONCISE RESPONSE LENGTH & NATURAL TONE
==================================================
- Keep normal responses SHORT: 1 to 3 sentences max!
- Sound like a natural human conversation, NOT a mental health article or textbook.
- DO NOT overuse generic phrases like "I hear you", "Thank you for sharing", "You're not alone", "Feel free to share", "I'm right here with you". Use them only when genuinely natural.
- Ask ONE specific follow-up question directly related to the user's latest statement.
- Do NOT force follow-up questions if the user gives a closing remark (e.g., "Thanks, I feel better").
- Do NOT automatically force breathing exercises, mindfulness, or coping techniques unless specifically requested.

Detected emotional state: {emotion}. Selected AI Tone: {tone}.
"""


def generate_openrouter_response(session_id: str, user_text: str, emotion: str = "neutral", language: str = "en", tone: str = "Empathetic", assessment: dict = None) -> str:
    """
    Generates an empathetic AI response using OpenRouter API with conversational history and assessment context.
    Falls back gracefully if the API call fails or key is unconfigured.
    """
    api_key = current_app.config.get("OPENROUTER_API_KEY") or os.getenv("OPENROUTER_API_KEY", "")
    if not api_key:
        logger.warning("OPENROUTER_API_KEY is missing. Using fallback response.")
        return None

    # Format Assessment context if available
    assessment_context = ""
    if assessment and isinstance(assessment, dict):
        goal    = assessment.get("primary_goal_title") or assessment.get("primary_goal") or "General Wellness"
        emo     = assessment.get("emotional_state_title") or assessment.get("emotional_state") or "N/A"
        sleep   = assessment.get("sleep_quality_title") or assessment.get("sleep_quality") or "N/A"
        support = assessment.get("support_preference_title") or assessment.get("support_preference") or "Conversational Support"
        level   = assessment.get("level") or "Standard"
        rec     = assessment.get("recommendation") or ""

        assessment_context = (
            f"\n\n==================================================\n"
            f"USER ASSESSMENT PROFILE & STRUCTURAL DIRECTION:\n"
            f"The user completed an assessment on MindEase with these results:\n"
            f"- Primary Goal: {goal}\n"
            f"- Emotional State: {emo}\n"
            f"- Sleep & Rest Quality: {sleep}\n"
            f"- Preferred Support Style: {support}\n"
            f"- Assessed Level: {level}\n"
            f"- Clinical Recommendation: {rec}\n\n"
            f"STRUCTURAL INSTRUCTIONS BASED ON ASSESSMENT:\n"
            f"1. Structurally align all advice, techniques, and suggestions around the Primary Goal ({goal}).\n"
            f"2. Match the user's Preferred Support Style ({support}). If CBT is preferred, offer structured exercises; if breathing/micro-sessions are preferred, offer quick guided pauses.\n"
        )

    # Fetch recent conversation history for session context (last 20 messages)
    history_messages = []
    if session_id:
        try:
            history_messages = (
                Message.query
                .filter_by(session_id=session_id)
                .order_by(Message.created_at.desc())
                .limit(20)
                .all()
            )
            history_messages.reverse()
        except Exception as e:
            logger.warning(f"Error loading chat history for OpenRouter: {e}")

    full_system_prompt = SYSTEM_PROMPT.format(emotion=emotion or "neutral", tone=tone or "Empathetic") + assessment_context

    messages_payload = [
        {
            "role": "system",
            "content": full_system_prompt
        }
    ]

    for msg in history_messages:
        role = "user" if msg.sender == "user" else "assistant"
        messages_payload.append({
            "role": role,
            "content": msg.content
        })

    # Include current user text if not already the last history item
    if not history_messages or history_messages[-1].content != user_text:
        messages_payload.append({
            "role": "user",
            "content": user_text
        })

    cfg_model = current_app.config.get("OPENROUTER_MODEL") or ""
    # Ordered list of proven free-tier models. 'openrouter/free' is NOT a valid
    # model slug – it was causing every first attempt to silently fail.
    default_free_models = [
        "google/gemma-4-26b-a4b-it:free",
        "google/gemma-4-31b-it:free",
        "liquid/lfm-2.5-2.6b:free",
        "nvidia/nemotron-3.5-lightning:free",
        "z-ai/glm-5.2:free",
    ]
    # Put the configured model first if it is set and isn't the invalid placeholder
    if cfg_model and cfg_model not in ("", "openrouter/free"):
        candidate_models = [cfg_model] + default_free_models
    else:
        candidate_models = default_free_models

    # De-duplicate candidate models while preserving order
    seen = set()
    models_to_try = [m for m in candidate_models if not (m in seen or seen.add(m))]

    url = "https://openrouter.ai/api/v1/chat/completions"

    for model in models_to_try:
        for attempt in range(2):
            try:
                payload = {
                    "model": model,
                    "messages": messages_payload,
                    "temperature": 0.7,
                    "max_tokens": 500
                }
                data_bytes = json.dumps(payload).encode("utf-8")

                req = urllib.request.Request(
                    url,
                    data=data_bytes,
                    headers={
                        "Authorization": f"Bearer {api_key}",
                        "Content-Type": "application/json",
                        "HTTP-Referer": "https://mindease.app",
                        "X-Title": "MindEase Mental Wellness Companion"
                    }
                )

                with urllib.request.urlopen(req, timeout=25) as response:
                    result = json.loads(response.read().decode("utf-8"))
                    # Log usage / errors returned by the API at the JSON level
                    if result.get("error"):
                        logger.warning(f"OpenRouter API error for model '{model}': {result['error']}")
                        break  # Try the next model
                    choices = result.get("choices", [])
                    if choices and "message" in choices[0]:
                        raw_content = (choices[0]["message"].get("content") or "").strip()
                        finish_reason = choices[0].get("finish_reason", "")
                        content = clean_ai_response(raw_content)
                        if content and finish_reason != "error":
                            logger.info(f"OpenRouter response generated using model '{model}'")
                            return content
                        elif not content:
                            logger.warning(f"Empty content from model '{model}' (finish_reason={finish_reason})")
                            break  # Try next model

            except Exception as e:
                logger.warning(f"OpenRouter call failed for model '{model}' (attempt {attempt+1}): {e}")
                if "429" in str(e):
                    time.sleep(0.8 * (attempt + 1))
                    continue
                break

    return None
