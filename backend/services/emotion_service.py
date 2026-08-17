from flask import current_app

_classifier = None

def get_classifier():
    global _classifier
    if _classifier is None:
        try:
            from transformers import pipeline
            import torch
            _classifier = pipeline(
                "text-classification",
                model="j-hartmann/emotion-english-distilroberta-base",
                top_k=None,
                device=0 if torch.cuda.is_available() else -1
            )
        except Exception as e:
            print(f"Transformers unavailable, fallback mode enabled: {e}")
            _classifier = "fallback"
    return _classifier


def _fallback_emotion(text: str) -> dict:
    t = text.lower()
    if any(w in t for w in ["anxious", "panic", "worry", "worried", "scared", "fear", "nervous", "overwhelmed"]):
        return {"emotion": "anxiety", "score": 0.85, "all_scores": {"anxiety": 0.85}}
    if any(w in t for w in ["stress", "stressed", "burnout", "pressure", "exhausted", "tired"]):
        return {"emotion": "stress", "score": 0.80, "all_scores": {"stress": 0.80}}
    if any(w in t for w in ["sad", "depressed", "lonely", "hopeless", "down", "cry"]):
        return {"emotion": "depression", "score": 0.82, "all_scores": {"depression": 0.82}}
    if any(w in t for w in ["happy", "good", "great", "calm", "relax", "peace", "glad", "awesome"]):
        return {"emotion": "positive", "score": 0.90, "all_scores": {"positive": 0.90}}
    return {"emotion": "neutral", "score": 0.70, "all_scores": {"neutral": 0.70}}


def detect_emotion(text: str) -> dict:
    """
    Detect emotion from user text.
    Returns: { emotion: str, score: float, all_scores: dict }
    """
    try:
        classifier = get_classifier()
        if classifier == "fallback" or classifier is None:
            return _fallback_emotion(text)

        results = classifier(text[:512])[0]
        label_map = {
            "joy":      "positive",
            "neutral":  "neutral",
            "anger":    "stress",
            "fear":     "anxiety",
            "sadness":  "depression",
            "disgust":  "stress",
            "surprise": "neutral"
        }

        results.sort(key=lambda x: x["score"], reverse=True)
        top        = results[0]
        emotion    = label_map.get(top["label"].lower(), "neutral")
        score      = round(top["score"], 4)
        all_scores = {
            label_map.get(r["label"].lower(), r["label"]): round(r["score"], 4)
            for r in results
        }

        return {
            "emotion":    emotion,
            "score":      score,
            "all_scores": all_scores
        }

    except Exception as e:
        if current_app:
            current_app.logger.error(f"Emotion detection error: {e}")
        return _fallback_emotion(text)