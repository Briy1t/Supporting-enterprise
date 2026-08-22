from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base

class Contrato(Base):
    __tablename__ = "contratos"

    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer, ForeignKey("clientes.id"))
    archivo = Column(String, nullable=True)
    estado = Column(String, default="sin_enviar")
    fecha_envio = Column(DateTime, nullable=True)
    fecha_firma = Column(DateTime, nullable=True)

    cliente = relationship("Cliente", back_populates="contrato")


class HistorialContrato(Base):
    __tablename__ = "historial_contratos"

    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer)
    accion = Column(String)
    fecha = Column(DateTime, default=datetime.utcnow)
