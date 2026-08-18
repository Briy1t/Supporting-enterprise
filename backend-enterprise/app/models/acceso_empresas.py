from sqlalchemy import Column, Integer, String, DateTime,Boolean
from datetime import datetime
from app.database import Base

class AccesoEmpresas(Base):
    __tablename__ = "acceso_empresas"

    id = Column(Integer, primary_key=True, index=True)
    empresa = Column(String, nullable=True)
    nombre = Column(String, nullable=False)
    email = Column(String, nullable=False)
    telefono = Column(String, nullable=True)
    mensaje = Column(String, nullable=False)
    tipo = Column(String, default="acceso_empresas")
    privacidad = Column(Boolean, nullable=False)
    fecha_aceptacion = Column(DateTime, default=datetime.utcnow)
    ip_usuario = Column(String, nullable=True)
    fecha = Column(DateTime, default=datetime.utcnow)
    estado = Column(String, default="pendiente")
