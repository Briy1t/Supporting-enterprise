from pydantic import BaseModel, EmailStr
from datetime import datetime

class LeadCreate(BaseModel):
    empresa: str
    contacto: str
    correo: EmailStr
    mensaje: str
    origen: str = "web"

class LeadResponse(BaseModel):
    id: int
    empresa: str
    contacto: str
    correo: EmailStr
    mensaje: str
    origen: str
    fecha: datetime
    estado: str

    class Config:
        from_attributes = True
