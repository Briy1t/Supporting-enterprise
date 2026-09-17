from pydantic import BaseModel, ConfigDict
from datetime import datetime

class TecnicoCreate(BaseModel):
    nombre: str
    especialidad: str | None = None
    descripcion: str | None = None
    email: str
    password: str
    turno_hora_inicio: datetime | None = None
    turno_hora_fin: datetime | None = None

class TecnicoResponse(BaseModel):
    id: int
    nombre: str
    especialidad: str | None
    descripcion: str | None
    email: str
    activo: bool
    disponible: str
    turno_hora_inicio: datetime | None
    turno_hora_fin: datetime | None

    model_config = ConfigDict(from_attributes=True)
