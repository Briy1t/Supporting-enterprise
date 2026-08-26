from pydantic import BaseModel, EmailStr, Field, ConfigDict
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
    estado: str
    
    model_config = ConfigDict(from_attributes=True)
