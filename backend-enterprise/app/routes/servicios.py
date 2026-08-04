from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.service import ServiceCreate, ServiceResponse
from app.controllers.service import (
    crear_servicio,
    listar_servicios,
    obtener_servicio,
    eliminar_servicio
)

router = APIRouter(prefix="/servicios", tags=["Servicios"])

@router.post("/", response_model=ServiceResponse)
def crear_servicio_route(data: ServiceCreate, db: Session = Depends(get_db)):
    return crear_servicio(db, data.dict())

@router.get("/", response_model=list[ServiceResponse])
def listar_servicios_route(db: Session = Depends(get_db)):
    return listar_servicios(db)

@router.get("/{servicio_id}", response_model=ServiceResponse)
def obtener_servicio_route(servicio_id: int, db: Session = Depends(get_db)):
    servicio = obtener_servicio(db, servicio_id)
    if not servicio:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    return servicio

@router.delete("/{servicio_id}")
def eliminar_servicio_route(servicio_id: int, db: Session = Depends(get_db)):
    servicio = eliminar_servicio(db, servicio_id)
    if not servicio:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    return {"mensaje": "Servicio eliminado"}
