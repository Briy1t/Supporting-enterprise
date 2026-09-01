from app.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship


class Tecnico(Base):
    __tablename__ = "tecnicos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    especialidad = Column(String, nullable=False)
    disponibilidad = Column(String, default="disponible")  # disponible / ocupado

    tickets = relationship("Ticket", back_populates="tecnico")