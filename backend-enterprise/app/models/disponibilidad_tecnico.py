from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class DisponibilidadTecnico(Base):
    __tablename__ = "disponibilidad_tecnico"

    id = Column(Integer, primary_key=True, index=True)
    tecnico_id = Column(Integer, ForeignKey("tecnicos.id"), nullable=False)

    fecha = Column(Date, nullable=False)
    hora_inicio = Column(Time, nullable=False)
    hora_fin = Column(Time, nullable=False)

    estado = Column(String, default="libre")  
    descripcion = Column(String, nullable=True)

    cita = relationship("CitaTecnico", back_populates="slot", uselist=False)
    tecnico = relationship("Tecnico", back_populates="disponibilidad")
