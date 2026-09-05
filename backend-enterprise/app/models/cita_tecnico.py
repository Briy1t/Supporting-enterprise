from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class CitaTecnico(Base):
    __tablename__ = "citas_tecnico"

    id = Column(Integer, primary_key=True, index=True)
    tecnico_id = Column(Integer, ForeignKey("tecnicos.id"), nullable=False)
    cliente_id = Column(Integer, ForeignKey("clientes.id"), nullable=False)

    fecha = Column(Date, nullable=False)
    hora_inicio = Column(Time, nullable=False)
    hora_fin = Column(Time, nullable=False)

    estado = Column(String, default="pendiente")
    motivo = Column(String, nullable=True)

    ticket_id = Column(Integer, ForeignKey("tickets.id"), nullable=True)

    slot_id = Column(Integer, ForeignKey("disponibilidad_tecnico.id", ondelete="SET NULL"))

    tecnico = relationship("Tecnico", back_populates="citas")
    cliente = relationship("Cliente", back_populates="citas")
    ticket = relationship("Ticket", back_populates="cita", uselist=False)
    slot = relationship("DisponibilidadTecnico", back_populates="cita", uselist=False)