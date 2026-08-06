from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


SQLALCHEMY_DATABASE_URL = "postgresql://supporting_user:supporting_pass@localhost:5432/supporting_db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

from app.models.usuario import User
from app.models.lead import Lead
from app.models.servicio import Servicio
from app.models.tecnico import Tecnico
from app.models.ticket import Ticket
from app.models.alarma import Alarma

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

Base.metadata.create_all(bind=engine)

