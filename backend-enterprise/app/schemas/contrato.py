from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class ContratoCreate(BaseModel):
    servicios: List[int]              
    duracion: str                     
    politicas: Optional[str] = None   
    correo_envio: Optional[str] = None 
    cliente_id: Optional[int] = None   

    model_config = ConfigDict(from_attributes=True)
