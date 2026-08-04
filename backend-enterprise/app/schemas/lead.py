from pydantic import BaseModel
from datetime import datetime

class LeadBase(BaseModel):
    origen: str
    nombre: str
    email: str
    mensaje: str

class LeadCreate(LeadBase):
    pass

class LeadResponse(LeadBase):
    id: int
    fecha: datetime
    estado: str

    class Config:
        orm_mode = True
