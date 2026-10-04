from app.database import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from sqlalchemy.orm import relationship
class Alarma(Base):
    __tablename__ = "alarmas"

    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer, ForeignKey("clientes.id", ondelete="CASCADE"), nullable=True)    
    tipo = Column(String, nullable=False)         
    estado = Column(String, default="pendiente")    
    fecha = Column(DateTime, default=datetime.utcnow)

    cliente = relationship("Cliente", back_populates="alarmas")