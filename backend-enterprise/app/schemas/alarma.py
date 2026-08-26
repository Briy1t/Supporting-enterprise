from pydantic import BaseModel, ConfigDict
from datetime import datetime

class AlarmaBase(BaseModel):
    tipo: str
    descripcion: str
    cliente_id: int | None = None

class AlarmaCreate(AlarmaBase):
    pass

class AlarmaResponse(AlarmaBase):
    id: int
    estado: str
    fecha: datetime
    model_config = ConfigDict(from_attributes=True)
