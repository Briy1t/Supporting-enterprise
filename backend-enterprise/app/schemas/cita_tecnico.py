from pydantic import BaseModel, ConfigDict
from datetime import date, time, datetime

class CitaBase(BaseModel):
    fecha: date
    hora_inicio: time | None = None
    hora_fin: time | None = None
    estado: str = "pendiente"
    motivo: str | None = None

class CitaCreate(BaseModel):
    cliente_id: int
    fecha: datetime
    motivo: str
    ticket_id: int | None = None

class CitaResponse(CitaBase):
    id: int
    tecnico_id: int
    cliente_id: int
    ticket_id: int | None
    model_config = ConfigDict(from_attributes=True)
