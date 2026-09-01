from app.database import Base
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    empresa = Column(String, nullable=True)
    contacto = Column(String, nullable=False)
    correo = Column(String, nullable=False)
    telefono = Column(String, nullable=True)
    mensaje = Column(String, nullable=True)
    estado = Column(String, default="pendiente")

    contratos = relationship("Contrato", back_populates="lead", cascade="all, delete-orphan")   
    historiales = relationship("HistorialContrato", back_populates="lead", cascade="all, delete-orphan")