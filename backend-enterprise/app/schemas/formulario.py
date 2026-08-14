from pydantic import BaseModel, config

class FormularioResponse(BaseModel):
    id: int
    empresa: str | None
    contacto: str | None
    correo: str | None
    mensaje: str | None
    tipo: str | None
    estado: str | None
    
    model_config = config.ConfigDict(from_attributes=True)
