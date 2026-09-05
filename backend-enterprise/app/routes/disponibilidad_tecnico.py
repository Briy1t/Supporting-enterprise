from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.disponibilidad_tecnico import DisponibilidadTecnico
from app.schemas.disponibilidad_tecnico import DisponibilidadCreate, DisponibilidadResponse

router = APIRouter(prefix="/tecnicos")

@router.post("/{tecnico_id}/disponibilidad", response_model=DisponibilidadResponse)
def crear_slot(tecnico_id: int, data: DisponibilidadCreate, db: Session = Depends(get_db)):
    slot = DisponibilidadTecnico(
        tecnico_id=tecnico_id,
        fecha=data.fecha,
        hora_inicio=data.hora_inicio,
        hora_fin=data.hora_fin,
        estado=data.estado,
        descripcion=data.descripcion
    )
    db.add(slot)
    db.commit()
    db.refresh(slot)
    return slot

@router.post("/{tecnico_id}/disponibilidad")
def crear_disponibilidad(tecnico_id: int, data: DisponibilidadCreate, db: Session = Depends(get_db)):
    slot = DisponibilidadTecnico(
        tecnico_id=tecnico_id,
        fecha=data.fecha,
        hora_inicio=data.hora_inicio,
        hora_fin=data.hora_fin,
        descripcion=data.descripcion,
        estado="libre"
    )
    db.add(slot)
    db.commit()
    db.refresh(slot)
    return slot
