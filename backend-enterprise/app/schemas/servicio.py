from pydantic import BaseModel, ConfigDict

class ServicioBase(BaseModel):
    nombre: str
    descripcion: str | None = None
    precio: float
    activo: bool = True

class ServicioCreate(ServicioBase):
    pass

class ServicioUpdate(BaseModel):
    nombre: str | None = None
    descripcion: str | None = None
    precio: float | None = None
    activo: bool | None = None

class ServicioResponse(ServicioBase):
    id: int

    model_config = ConfigDict(from_attributes=True)



