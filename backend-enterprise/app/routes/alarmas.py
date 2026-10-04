from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.alarma import AlarmaCreate, AlarmaResponse
from app.controllers.alarma import (
    crear_alarma,
    listar_alarmas,
    obtener_alarma,
    actualizar_estado_alarma,
    eliminar_alarma
)

router = APIRouter(prefix="/alarmas", tags=["Alarmas"])

@router.post("/", response_model=AlarmaResponse)
def crear_alarma_route(data: AlarmaCreate, db: Session = Depends(get_db)):
    return crear_alarma(db, data.dict())

@router.get("/", response_model=list[AlarmaResponse])
def listar_alarmas_route(db: Session = Depends(get_db)):
    return listar_alarmas(db)

@router.get("/{alarma_id}", response_model=AlarmaResponse)
def obtener_alarma_route(alarma_id: int, db: Session = Depends(get_db)):
    alarma = obtener_alarma(db, alarma_id)
    if not alarma:
        raise HTTPException(status_code=404, detail="Alarma no encontrada")
    return alarma

@router.patch("/{alarma_id}/estado")
def actualizar_estado_route(alarma_id: int, estado: str, db: Session = Depends(get_db)):
    alarma = actualizar_estado_alarma(db, alarma_id, estado)
    if not alarma:
        raise HTTPException(status_code=404, detail="Alarma no encontrada")
    return {"mensaje": "Estado actualizado", "alarma": alarma}

@router.delete("/{alarma_id}")
def eliminar_alarma_route(alarma_id: int, db: Session = Depends(get_db)):
    alarma = eliminar_alarma(db, alarma_id)
    if not alarma:
        raise HTTPException(status_code=404, detail="Alarma no encontrada")
    return {"mensaje": "Alarma eliminada"}
