from pydantic import BaseModel, ConfigDict
from datetime import date, time

class DisponibilidadCreate(BaseModel):
    fecha: date
    hora_inicio: time
    hora_fin: time
    descripcion: str | None = None

class DisponibilidadResponse(BaseModel):
    id: int
    tecnico_id: int
    fecha: date
    hora_inicio: time
    hora_fin: time
    estado: str
    descripcion: str | None = None

    model_config = ConfigDict(from_attributes=True)
