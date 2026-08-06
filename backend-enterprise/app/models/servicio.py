from app.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class Servicio(Base):
    __tablename__ = "servicios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)         
    descripcion = Column(String, nullable=True)    
    cliente_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)

    cliente = relationship("User", back_populates="servicios")

