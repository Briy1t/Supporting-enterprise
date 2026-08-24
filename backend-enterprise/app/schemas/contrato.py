from pydantic import BaseModel
from typing import List, Optional

class ContratoCreate(BaseModel):
    servicios: List[str]
    duracion: str
    politicas: str
    politicas: str | None = None
    cliente_id: Optional[int] = None
