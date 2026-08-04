from pydantic import BaseModel

class UserBase(BaseModel):
    nombre: str
    email: str
    telefono: str | None = None
    empresa: str | None = None
    servicio: str | None = None

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    activo: bool

    class Config:
        orm_mode = True
