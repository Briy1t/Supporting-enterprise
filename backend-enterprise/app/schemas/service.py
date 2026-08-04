from pydantic import BaseModel

class ServiceBase(BaseModel):
    nombre: str
    descripcion: str | None = None
    cliente_id: int

class ServiceCreate(ServiceBase):
    pass

class ServiceResponse(ServiceBase):
    id: int

    class Config:
        orm_mode = True
