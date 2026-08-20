from pydantic import BaseModel, EmailStr
from datetime import datetime

class LeadCreate(BaseModel):
    contacto: str
    correo: EmailStr
    telefono: str | None = None
    mensaje: str
    origen: str = "web"


class LeadResponse(BaseModel):
    id: int
    empresa: str | None = None
    contacto: str
    correo: EmailStr
    telefono: str | None = None
    mensaje: str
    origen: str
    fecha: datetime
    estado: str

    class Config:
        from_attributes = True
