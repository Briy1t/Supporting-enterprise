from pydantic import BaseModel

class TechnicianBase(BaseModel):
    nombre: str
    especialidad: str
    disponibilidad: str | None = "disponible"

class TechnicianCreate(TechnicianBase):
    pass

class TechnicianResponse(TechnicianBase):
    id: int

    class Config:
        orm_mode = True
