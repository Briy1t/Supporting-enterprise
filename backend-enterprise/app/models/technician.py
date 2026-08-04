from sqlalchemy import Column, Integer, String
from app.database import Base

class Technician(Base):
    __tablename__ = "tecnicos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    especialidad = Column(String, nullable=False)
    disponibilidad = Column(String, default="disponible")  # disponible / ocupado
