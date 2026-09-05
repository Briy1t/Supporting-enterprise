from pydantic import BaseModel, ConfigDict
from datetime import date, time


class TecnicoBase(BaseModel):
    nombre: str
    especialidad: str | None = None
    descripcion: str | None = None
    email: str
    disponible: str | None = "disponible"

class TecnicoCreate(BaseModel):
    nombre: str
    especialidad: str | None = None
    descripcion: str | None = None
    email: str
    password: str

class TecnicoResponse(TecnicoBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
