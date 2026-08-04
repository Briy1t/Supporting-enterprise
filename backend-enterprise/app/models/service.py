from sqlalchemy import Column, Integer, String
from app.database import Base

class Service(Base):
    __tablename__ = "servicios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)         # nombre del servicio
    descripcion = Column(String, nullable=True)     # descripción del servicio
    cliente_id = Column(Integer, nullable=False)    # FK manual hacia User
