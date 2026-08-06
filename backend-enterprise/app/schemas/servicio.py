from pydantic import BaseModel, ConfigDict

class ServicioBase(BaseModel):
    nombre: str
    descripcion: str | None = None
    cliente_id: int

class ServicioCreate(ServicioBase):
    pass

class ServicioResponse(ServicioBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
