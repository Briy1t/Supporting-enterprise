from sqlalchemy import Column, Integer, String, DateTime,Boolean
from datetime import datetime
from app.database import Base

class DemoGuiada(Base):
    __tablename__ = "demo_guiada"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    empresa = Column(String, nullable=True)
    email = Column(String, nullable=False)
    mensaje = Column(String, nullable=False)
    tipo = Column(String, default="demo_guiada")
    privacidad = Column(Boolean, nullable=False)
    fecha_aceptacion = Column(DateTime, default=datetime.utcnow)
    ip_usuario = Column(String, nullable=True)
    fecha = Column(DateTime, default=datetime.utcnow)
    estado = Column(String, default="pendiente")
