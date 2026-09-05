from pydantic import BaseModel, ConfigDict
from datetime import datetime

class EventoResponse(BaseModel):
    id: int
    titulo: str
    fecha: datetime
    tipo: str

    model_config = ConfigDict(from_attributes=True)
