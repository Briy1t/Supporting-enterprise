from sqlalchemy import Column, Integer, String, DateTime
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
    fecha = Column(DateTime, default=datetime.utcnow)
    estado = Column(String, default="pendiente")
