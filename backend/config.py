import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DEFAULT_DB_PATH = os.path.join(BASE_DIR, "../database/mindease.db")
os.makedirs(os.path.dirname(DEFAULT_DB_PATH), exist_ok=True)


class Config:
    # App
    APP_NAME   = "MindEase"
    DEBUG      = os.getenv("DEBUG", "true").lower() == "true"
    SECRET_KEY = os.getenv("SECRET_KEY", "mindease-dev-secret-change-me")

    # Database
    BASE_DIR = BASE_DIR
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL") or f"sqlite:///{DEFAULT_DB_PATH}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
    }

    # JWT
    JWT_SECRET_KEY              = os.getenv("JWT_SECRET_KEY", "mindease-jwt-secret-change-me")
    JWT_ACCESS_TOKEN_EXPIRES    = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES", 3600))

    # Supabase (REST API)
    SUPABASE_URL      = os.getenv("SUPABASE_URL", "https://xkakuhjwqrzkgkiremzt.supabase.co")
    SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrYWt1aGp3cXJ6a2draXJlbXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxODk3NTIsImV4cCI6MjEwMTc2NTc1Mn0.33Iu2CMqLpodbwzRNHsYHyfl7xWC0EaR86pWRlFi6qU")

    # OpenRouter API
    OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
    OPENROUTER_MODEL   = os.getenv("OPENROUTER_MODEL", "openrouter/free")

    # ML Model
    MODEL_NAME    = os.getenv("MODEL_NAME", "distilbert-base-uncased")
    MODEL_PATH    = os.path.join(BASE_DIR, "ml/model/saved_model")
    MAX_TOKEN_LEN = 128

    # Emotion Labels
    EMOTION_LABELS = ["anxiety", "stress", "depression", "neutral", "positive"]

    # Crisis Keywords
    CRISIS_KEYWORDS = [kw.strip() for kw in os.getenv(
        "CRISIS_KEYWORDS",
        "kill myself,end my life,want to die,suicide,self harm,cut myself,no reason to live,give up on life"
    ).split(",")]

    # Translation
    SUPPORTED_LANGUAGES = {"en": "English", "tw": "Twi", "fr": "French"}
    DEFAULT_LANGUAGE    = "en"

    # Report
    REPORT_OUTPUT_DIR = os.path.join(BASE_DIR, "../database/reports")

    # CORS
    raw_origins = os.getenv("CORS_ORIGINS") or os.getenv("FRONTEND_URL") or "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000"
    CORS_ORIGINS = [o.strip() for o in raw_origins.split(",") if o.strip() and o.strip() != "*"]
    if not CORS_ORIGINS:
        CORS_ORIGINS = ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://127.0.0.1:3000"]


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False


config = {
    "development": DevelopmentConfig,
    "production":  ProductionConfig,
    "default":     DevelopmentConfig,
}