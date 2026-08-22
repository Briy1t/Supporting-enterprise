from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

class LeadCreate(BaseModel):
    contacto: str
    correo: EmailStr
    telefono: str = Field(
        min_length=8,
        max_length=15,
        pattern=r"^\+?\d[\d\s]{7,14}$"
    )    
    mensaje: str
    origen: str = "web"


class LeadResponse(BaseModel):
    id: int
    contacto: str
    correo: EmailStr
    telefono: str = Field(
        min_length=8,
        max_length=15,
        pattern=r"^\+?\d[\d\s]{7,14}$"
    )    
    mensaje: str
    origen: str
    fecha: datetime
    estado: str

    class Config:
        from_attributes = True
