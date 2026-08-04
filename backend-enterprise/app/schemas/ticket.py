from pydantic import BaseModel
from datetime import datetime

class TicketBase(BaseModel):
    cliente_id: int
    tecnico_id: int | None = None
    tipo: str
    descripcion: str

class TicketCreate(TicketBase):
    pass

class TicketResponse(TicketBase):
    id: int
    estado: str
    creado_en: datetime

    class Config:
        orm_mode = True
