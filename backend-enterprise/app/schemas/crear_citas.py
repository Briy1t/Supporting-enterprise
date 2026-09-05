from pydantic import BaseModel, ConfigDict
from datetime import datetime

class CitaCreate(BaseModel):
    cliente_id: int
    fecha: datetime
    motivo: str
    ticket_id: int | None = None

class CitaResponse(BaseModel):
    id: int
    tecnico_id: int
    cliente_id: int
    fecha: datetime
    motivo: str
    estado: str
    ticket_id: int | None

    model_config = ConfigDict(from_attributes=True)
