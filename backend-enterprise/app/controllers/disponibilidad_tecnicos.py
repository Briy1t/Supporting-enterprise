from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.disponibilidad_tecnico import DisponibilidadTecnico
from app.models.tecnico import Tecnico
from app.schemas.disponibilidad_tecnico import (
    DisponibilidadCreate,
    DisponibilidadResponse
)

router = APIRouter(prefix="/tecnicos", tags=["Disponibilidad"])

@router.post("/{tecnico_id}/disponibilidad", response_model=DisponibilidadResponse)
def crear_slot(tecnico_id: int, data: DisponibilidadCreate, db: Session = Depends(get_db)):
    tecnico = db.query(Tecnico).filter(Tecnico.id == tecnico_id).first()
    if not tecnico:
        raise HTTPException(404, "Técnico no encontrado")

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


@router.get("/{tecnico_id}/disponibilidad", response_model=list[DisponibilidadResponse])
def listar_slots(tecnico_id: int, db: Session = Depends(get_db)):
    return db.query(DisponibilidadTecnico).filter(
        DisponibilidadTecnico.tecnico_id == tecnico_id
    ).all()
