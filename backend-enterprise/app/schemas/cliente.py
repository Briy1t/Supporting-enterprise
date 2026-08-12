from pydantic import BaseModel, ConfigDict

class ClienteBase(BaseModel):
    nombre: str
    email: str
    telefono: str | None = None
    empresa: str | None = None
    servicio: str | None = None
    lead_id: int | None = None


class ClienteCreate(BaseModel):
    empresa: str
    contacto: str
    correo: str
    mensaje: str
    lead_id: int | None = None

class ClienteResponse(ClienteBase):
    id: int
    estado: str

    model_config = ConfigDict(from_attributes=True)
