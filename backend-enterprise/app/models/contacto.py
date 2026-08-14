from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base

class Contact(Base):
    __tablename__ = "contactos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    email = Column(String, nullable=False)
    mensaje = Column(String, nullable=False)
    tipo = Column(String, default="general")
    fecha = Column(DateTime, default=datetime.utcnow)
    estado = Column(String, default="pendiente")
