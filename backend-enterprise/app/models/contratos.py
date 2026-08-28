from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON, Text
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base

class Contrato(Base):
    __tablename__ = "contratos"

    id = Column(Integer, primary_key=True, index=True)

    lead_id = Column(Integer, ForeignKey("leads.id"), nullable=True)
    cliente_id = Column(Integer, ForeignKey("clientes.id"), nullable=True)

    servicios = Column(JSON, nullable=False)
    duracion = Column(String, nullable=False)
    politicas = Column(Text, nullable=False)
    
    estado = Column(String, default="generado")
    archivo_pdf = Column(String, nullable=True)
    
    fecha_creacion = Column(DateTime, default=datetime.utcnow)
    fecha_envio = Column(DateTime, nullable=True)
    fecha_firma = Column(DateTime, nullable=True)

    lead = relationship("Lead", back_populates="contratos")
    cliente = relationship("Cliente", back_populates="contratos")
    historial = relationship("HistorialContrato", back_populates="contrato")


class HistorialContrato(Base):
    __tablename__ = "historial_contratos"

    id = Column(Integer, primary_key=True, index=True)

    contrato_id = Column(Integer, ForeignKey("contratos.id"), nullable=False)
    lead_id = Column(Integer, ForeignKey("leads.id"), nullable=True)
    cliente_id = Column(Integer, ForeignKey("clientes.id"), nullable=True)

    fecha = Column(DateTime, default=datetime.utcnow)
    accion = Column(String, nullable=False)

    contrato = relationship("Contrato", back_populates="historial")
