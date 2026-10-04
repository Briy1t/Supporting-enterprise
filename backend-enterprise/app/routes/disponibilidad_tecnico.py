from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.disponibilidad_tecnico import DisponibilidadTecnico
from app.schemas.disponibilidad_tecnico import DisponibilidadCreate, DisponibilidadResponse

router = APIRouter(prefix="/tecnicos")

@router.post("/{tecnico_id}/disponibilidad")
def crear_disponibilidad(tecnico_id: int, data: DisponibilidadCreate, db: Session = Depends(get_db)):
    slot = DisponibilidadTecnico(
        tecnico_id=tecnico_id,
        fecha=data.fecha,
        hora_inicio=data.hora_inicio,
        hora_fin=data.hora_fin,
        tipo_turno=data.tipo_turno,
        es_descanso=data.es_descanso,                            
        descripcion=data.descripcion,
        estado="libre"
    )
    db.add(slot)
    db.commit()
    db.refresh(slot)
    return slot
