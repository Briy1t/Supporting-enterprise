from pydantic import BaseModel, ConfigDict
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

    model_config = ConfigDict(from_attributes=True)
