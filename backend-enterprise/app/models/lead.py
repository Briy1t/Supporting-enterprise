from app.database import Base
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    empresa = Column(String, nullable=False)
    contacto = Column(String, nullable=False)
    correo = Column(String, nullable=False)
    telefono = Column(String, nullable=True)
    mensaje = Column(String, nullable=False)
    origen = Column(String, nullable=False)
    fecha = Column(DateTime, default=datetime.utcnow)
    estado = Column(String, default="pendiente")
