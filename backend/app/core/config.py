"""
EduNexus AI — Core Configuration Module
Handles environment-based application settings.
"""

import os
from pathlib import Path
from typing import List, Union
from pydantic import BaseModel, Field
from dotenv import load_dotenv

# Load local .env from backend directory if present (avoid searching outside workspace)
_backend_env = Path(__file__).resolve().parent.parent.parent / ".env"
if _backend_env.is_file():
    load_dotenv(dotenv_path=_backend_env)


class Settings(BaseModel):
    """Application settings with robust fallback defaults."""

    PROJECT_NAME: str = Field(
        default_factory=lambda: os.getenv("PROJECT_NAME", "EduNexus AI")
    )
    VERSION: str = "0.1.0"
    DESCRIPTION: str = (
        "Student Success & Journey Intelligence Platform API — KPMG India Prototype"
    )
    API_V1_STR: str = Field(
        default_factory=lambda: os.getenv("API_V1_STR", "/api/v1")
    )
    ENVIRONMENT: str = Field(
        default_factory=lambda: os.getenv("ENVIRONMENT", "development")
    )
    DEBUG: bool = Field(
        default_factory=lambda: os.getenv("DEBUG", "true").lower() in ("true", "1", "yes")
    )

    # CORS Allowed Origins
    ALLOWED_ORIGINS: List[str] = Field(
        default_factory=lambda: [
            origin.strip()
            for origin in os.getenv(
                "ALLOWED_ORIGINS",
                "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,http://localhost:4173",
            ).split(",")
            if origin.strip()
        ]
    )

    # Supabase credentials (populated in Stage 2)
    SUPABASE_URL: str = Field(
        default_factory=lambda: os.getenv("SUPABASE_URL", "")
    )
    # Prefer the current Supabase server-side secret key. Keep the legacy
    # service-role variable as a backwards-compatible fallback.
    SUPABASE_SECRET_KEY: str = Field(
        default_factory=lambda: os.getenv("SUPABASE_SECRET_KEY", "")
    )
    SUPABASE_SERVICE_ROLE_KEY: str = Field(
        default_factory=lambda: os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
    )
    SUPABASE_JWT_SECRET: str = Field(
        default_factory=lambda: os.getenv("SUPABASE_JWT_SECRET", "")
    )
    SUPABASE_JWT_ISSUER: str = Field(default_factory=lambda: os.getenv("SUPABASE_JWT_ISSUER", ""))

    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT.lower() in ("production", "prod")


settings = Settings()
