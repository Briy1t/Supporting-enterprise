from app.database import Base
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship

class Cliente(Base):
    __tablename__ = "clientes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    email = Column(String, nullable=False)
    telefono = Column(String, nullable=True)
    empresa = Column(String, nullable=True)
    servicio = Column(String, nullable=True)
    estado = Column(String, default="activo")
    lead_id = Column(Integer, nullable=True) 

    servicios = relationship("Servicio", back_populates="cliente")
