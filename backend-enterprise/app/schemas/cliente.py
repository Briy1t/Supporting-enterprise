from pydantic import BaseModel, ConfigDict
from pydantic import EmailStr, Field

class ClienteBase(BaseModel):
    nombre: str
    email: str
    telefono: str = Field(
        min_length=8,
        max_length=15,
        pattern=r"^\+?\d[\d\s]{7,14}$"
    )        
    empresa: str | None = None
    servicio: str | None = None
    lead_id: int | None = None


class ClienteCreate(BaseModel):
    nombre: str
    email: str
    empresa: str | None = None
    telefono: str = Field(
        min_length=8,
        max_length=15,
        pattern=r"^\+?\d[\d\s]{7,14}$"
    )         
    servicios: list[int] = []
    lead_id: int | None = None
    preferencia: str | None = None


class ClienteResponse(BaseModel):
    id: int
    nombre: str
    email: str
    telefono: str = Field(
        min_length=8,
        max_length=15,
        pattern=r"^\+?\d[\d\s]{7,14}$"
    )    
    empresa: str
    servicio: str | None = None
    estado: str
    lead_id: int | None = None
    preferencia: str | None = None

    model_config = ConfigDict(from_attributes=True)


