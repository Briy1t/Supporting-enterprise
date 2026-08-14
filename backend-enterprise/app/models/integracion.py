from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base

class Integracion(Base):
    __tablename__ = "integracion_personalizada"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    empresa = Column(String, nullable=True)
    email = Column(String, nullable=False)
    mensaje = Column(String, nullable=False)
    tipo = Column(String, default="integracion_personalizada")
    fecha = Column(DateTime, default=datetime.utcnow)
    estado = Column(String, default="pendiente")
