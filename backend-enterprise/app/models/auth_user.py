from app.database import Base
from sqlalchemy import Column, Integer, String, Boolean

class AuthUser(Base):
    __tablename__ = "auth_log"

    id = Column(Integer, primary_key=True, index=True)
    usuario = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    rol = Column(String, default="cliente")
    empresa = Column(String, nullable=True)
    estado = Column(String, default="activo")  # activo / inactivo
    password_reset_required = Column(Boolean, default=True)
