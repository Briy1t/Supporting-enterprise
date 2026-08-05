from pydantic import BaseModel

class TecnicoBase(BaseModel):
    nombre: str
    especialidad: str
    disponibilidad: str | None = "disponible"

class TecnicoCreate(TecnicoBase):
    pass

class TecnicoResponse(TecnicoBase):
    id: int

    class Config:
        orm_mode = True
