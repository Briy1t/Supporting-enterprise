from pydantic import BaseModel, ConfigDict
from datetime import datetime

class CitaCreate(BaseModel):
    cliente_id: int
    fecha: datetime
    motivo: str
    ticket_id: int | None = None

