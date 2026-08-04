from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Conexión a la base de datos de SUPPORTING
SQLALCHEMY_DATABASE_URL = (
    "postgresql://supporting_user:supporting_pass@localhost:5432/supporting_db"
)

engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
