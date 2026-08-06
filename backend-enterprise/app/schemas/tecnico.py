from pydantic import BaseModel, ConfigDict

class TecnicoBase(BaseModel):
    nombre: str
    especialidad: str
    disponibilidad: str | None = "disponible"

class TecnicoCreate(TecnicoBase):
    pass

class TecnicoResponse(TecnicoBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
