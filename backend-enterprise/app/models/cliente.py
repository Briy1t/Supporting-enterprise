from app.database import Base
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship

class Cliente(Base):
    __tablename__ = "clientes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String,unique=True, nullable=False)
    email = Column(String,unique=True, nullable=False)
    telefono = Column(String,unique=True, nullable=False)
    empresa = Column(String, nullable=True)
    servicio = Column(String, nullable=True)
    estado = Column(String, default="activo")
    lead_id = Column(Integer, nullable=True) 
    preferencia = Column(String, nullable=True)

    servicios = relationship("Servicio", back_populates="cliente")
    contrato = relationship("Contrato", back_populates="cliente", uselist=False)
