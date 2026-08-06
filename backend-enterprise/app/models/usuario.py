from app.database import Base
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    telefono = Column(String, nullable=True)
    empresa = Column(String, nullable=True)
    servicio = Column(String, nullable=True)
    activo = Column(Boolean, default=True)

    servicios = relationship("Servicio", back_populates="cliente")
