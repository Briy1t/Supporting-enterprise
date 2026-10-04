from sqlalchemy import Column, Integer, String, Boolean, DateTime, Time
from sqlalchemy.orm import relationship
from app.database import Base

class Tecnico(Base):
    __tablename__ = "tecnicos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    especialidad = Column(String, nullable=True)
    descripcion = Column(String, nullable=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    activo = Column(Boolean, default=True)
    disponible = Column(String, default="disponible")  

    turno_hora_inicio = Column(DateTime)
    turno_hora_fin = Column(DateTime)

    tickets = relationship("Ticket", back_populates="tecnico")
    disponibilidad = relationship("DisponibilidadTecnico", back_populates="tecnico")
    citas = relationship("CitaTecnico", back_populates="tecnico")
