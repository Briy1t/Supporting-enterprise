from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base

class Alarm(Base):
    __tablename__ = "alarmas"

    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer, nullable=True)      # opcional por ahora
    tipo = Column(String, nullable=False)            # CPU alta, acceso sospechoso, etc.
    descripcion = Column(String, nullable=False)
    estado = Column(String, default="pendiente")     # pendiente / en_proceso / resuelta
    fecha = Column(DateTime, default=datetime.utcnow)
