from app.database import Base
from sqlalchemy import Column, Integer, String, Boolean, Date
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
    fecha_vencimiento = Column(Date, nullable=True) 
    
    lead_id = Column(Integer, nullable=True) 
    preferencia = Column(String, nullable=True)  
    
      
    contratos = relationship("Contrato", back_populates="cliente", uselist=False)
