from pydantic import BaseModel, EmailStr

class AuthCreate(BaseModel):
    usuario: str
    email: EmailStr
    password: str
    rol: str = "cliente"
    empresa: str | None = None

class AuthLogin(BaseModel):
    email: EmailStr
    password: str

class AuthResponse(BaseModel):
    id: int
    usuario: str
    email: EmailStr
    rol: str
    empresa: str | None
    estado: str
