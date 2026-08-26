from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class ContratoCreate(BaseModel):
    servicios: List[int]               # IDs de servicios
    duracion: str                      # "12 meses", "24 meses", etc.
    politicas: Optional[str] = None    # se usa default
    correo_envio: Optional[str] = None # correo alternativo
    cliente_id: Optional[int] = None   # si el lead ya es cliente

    model_config = ConfigDict(from_attributes=True)
