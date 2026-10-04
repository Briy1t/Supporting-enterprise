from pydantic import BaseModel, ConfigDict
from datetime import date, datetime

class DisponibilidadCreate(BaseModel):
    fecha: date
    hora_inicio: datetime
    hora_fin: datetime
    tipo_turno: str
    es_descanso: bool = False
    descripcion: str | None = None

class DisponibilidadResponse(BaseModel):
    id: int
    tecnico_id: int
    fecha: date
    hora_inicio: datetime
    hora_fin: datetime
    estado: str
    tipo_turno: str
    es_descanso: bool
    descripcion: str | None

    model_config = ConfigDict(from_attributes=True)
