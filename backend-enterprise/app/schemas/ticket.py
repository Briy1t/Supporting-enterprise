from pydantic import BaseModel, ConfigDict
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

    model_config = ConfigDict(from_attributes=True)
