from pydantic import BaseModel

class ServicioBase(BaseModel):
    nombre: str
    descripcion: str | None = None
    cliente_id: int

class ServicioCreate(ServicioBase):
    pass

class ServicioResponse(ServicioBase):
    id: int

    class Config:
        orm_mode = True
