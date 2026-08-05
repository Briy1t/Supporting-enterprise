import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DB_HOST: str = os.getenv("DB_HOST", "localhost")
    DB_PORT: str = os.getenv("DB_PORT", "5432")
    DB_USER: str = os.getenv("DB_USER", "supporting_user")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD", "supporting_pass")
    DB_NAME: str = os.getenv("DB_NAME", "supporting_db")

settings = Settings()
