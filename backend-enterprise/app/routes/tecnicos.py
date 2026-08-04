from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.technician import TechnicianCreate, TechnicianResponse
from app.controllers.technician import (
    crear_tecnico,
    listar_tecnicos,
    obtener_tecnico,
    actualizar_disponibilidad,
    eliminar_tecnico
)

router = APIRouter(prefix="/tecnicos", tags=["Tecnicos"])

@router.post("/", response_model=TechnicianResponse)
def crear_tecnico_route(data: TechnicianCreate, db: Session = Depends(get_db)):
    return crear_tecnico(db, data.dict())

@router.get("/", response_model=list[TechnicianResponse])
def listar_tecnicos_route(db: Session = Depends(get_db)):
    return listar_tecnicos(db)

@router.get("/{tecnico_id}", response_model=TechnicianResponse)
def obtener_tecnico_route(tecnico_id: int, db: Session = Depends(get_db)):
    tecnico = obtener_tecnico(db, tecnico_id)
    if not tecnico:
        raise HTTPException(status_code=404, detail="Técnico no encontrado")
    return tecnico

@router.patch("/{tecnico_id}/disponibilidad")
def actualizar_disponibilidad_route(tecnico_id: int, disponibilidad: str, db: Session = Depends(get_db)):
    tecnico = actualizar_disponibilidad(db, tecnico_id, disponibilidad)
    if not tecnico:
        raise HTTPException(status_code=404, detail="Técnico no encontrado")
    return {"mensaje": "Disponibilidad actualizada", "tecnico": tecnico}

@router.delete("/{tecnico_id}")
def eliminar_tecnico_route(tecnico_id: int, db: Session = Depends(get_db)):
    tecnico = eliminar_tecnico(db, tecnico_id)
    if not tecnico:
        raise HTTPException(status_code=404, detail="Técnico no encontrado")
    return {"mensaje": "Técnico eliminado"}
