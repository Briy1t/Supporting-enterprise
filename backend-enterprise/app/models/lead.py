from app.database import Base
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    origen = Column(String, nullable=False)   # contacto, demo_guiada, integracion, acceso_empresas
    nombre = Column(String, nullable=False)
    email = Column(String, nullable=False)
    mensaje = Column(String, nullable=False)
    fecha = Column(DateTime, default=datetime.utcnow)
    estado = Column(String, default="pendiente")  # pendiente / convertido / descartado
