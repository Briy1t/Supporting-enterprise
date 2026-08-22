from sqlalchemy import Column, Integer, String, DateTime, Boolean
from datetime import datetime
from app.database import Base

class Contactos(Base):
    __tablename__ = "contactos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String,unique=True, nullable=False)
    email = Column(String,unique=True, nullable=False)
    telefono = Column(String,unique=True, nullable=False)
    mensaje = Column(String, nullable=False)
    tipo = Column(String, default="general")
    privacidad = Column(Boolean, nullable=False)
    fecha_aceptacion = Column(DateTime, default=datetime.utcnow)
    ip_usuario = Column(String, nullable=True)
    fecha = Column(DateTime, default=datetime.utcnow)
    estado = Column(String, default="pendiente")
