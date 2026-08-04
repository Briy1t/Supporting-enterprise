from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer, nullable=False)     # FK manual hacia User
    tecnico_id = Column(Integer, nullable=True)      # FK manual hacia Technician
    tipo = Column(String, nullable=False)            # tipo de ticket
    descripcion = Column(String, nullable=False)
    estado = Column(String, default="pendiente")     # pendiente / en_proceso / resuelto
    creado_en = Column(DateTime, default=datetime.utcnow)
