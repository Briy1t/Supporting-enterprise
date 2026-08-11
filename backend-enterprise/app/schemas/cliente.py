from pydantic import BaseModel, ConfigDict

class ClienteBase(BaseModel):
    nombre: str
    email: str
    telefono: str | None = None
    empresa: str | None = None
    servicio: str | None = None

class ClienteCreate(ClienteBase):
    pass

class ClienteResponse(ClienteBase):
    id: int
    estado: str

    model_config = ConfigDict(from_attributes=True)
