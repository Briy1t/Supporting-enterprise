from pydantic import BaseModel

class EventoResponse(BaseModel):
    id: int
    titulo: str
    tipo: str
    start: str
    end: str
