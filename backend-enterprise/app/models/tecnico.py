from app.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship


class Tecnico(Base):
    __tablename__ = "tecnicos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    especialidad = Column(String, nullable=True)
    descripcion = Column(String, nullable=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    activo = Column(Boolean, default=True)
    disponible = Column(String, default="disponible")  # disponible / ocupado

    tickets = relationship("Ticket", back_populates="tecnico")