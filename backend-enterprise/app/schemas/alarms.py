from pydantic import BaseModel
from datetime import datetime

class AlarmBase(BaseModel):
    tipo: str
    descripcion: str
    cliente_id: int | None = None

class AlarmCreate(AlarmBase):
    pass

class AlarmResponse(AlarmBase):
    id: int
    estado: str
    fecha: datetime

    class Config:
        orm_mode = True
