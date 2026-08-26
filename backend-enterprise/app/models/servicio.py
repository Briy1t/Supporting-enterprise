from sqlalchemy import Column, Integer, String, Float, Boolean
from app.database import Base

class Servicio(Base):
    __tablename__ = "servicios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    descripcion = Column(String, nullable=True)
    precio = Column(Float, nullable=False)
    activo = Column(Boolean, default=True)
