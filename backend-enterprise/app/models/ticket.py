from app.database import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from sqlalchemy.orm import relationship
class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    
    cliente_id = Column(Integer, ForeignKey("clientes.id", ondelete="CASCADE"), nullable=False)
    tecnico_id = Column(Integer, ForeignKey("tecnicos.id", ondelete="SET NULL"), nullable=True)     # FK manual hacia Technician
    
    tipo = Column(String, nullable=False)            # tipo de ticket
    descripcion = Column(String, nullable=False)
    estado = Column(String, default="pendiente")     # pendiente / en_proceso / resuelto
    creado_en = Column(DateTime, default=datetime.utcnow)

    cliente = relationship("Cliente", back_populates="tickets")
    tecnico = relationship("Tecnico", back_populates="tickets")
    
    