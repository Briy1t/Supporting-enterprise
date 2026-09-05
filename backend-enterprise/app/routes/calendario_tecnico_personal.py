from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.disponibilidad_tecnico import DisponibilidadTecnico
from app.models.cita_tecnico import CitaTecnico

router = APIRouter(prefix="/tecnicos", tags=["Calendario Técnico"])

@router.get("/{tecnico_id}/mi-calendario")
def mi_calendario(tecnico_id: int, db: Session = Depends(get_db)):
    disponibilidad = db.query(DisponibilidadTecnico).filter(
        DisponibilidadTecnico.tecnico_id == tecnico_id
    ).all()

    citas = db.query(CitaTecnico).filter(
        CitaTecnico.tecnico_id == tecnico_id
    ).all()

    eventos = []

    for slot in disponibilidad:
        eventos.append({
            "id": slot.id,
            "tipo": "slot",
            "fecha": slot.fecha,
            "hora_inicio": slot.hora_inicio,
            "hora_fin": slot.hora_fin,
            "estado": slot.estado,
            "descripcion": slot.descripcion
        })

    for cita in citas:
        eventos.append({
            "id": cita.id,
            "tipo": "cita",
            "fecha": cita.fecha,
            "hora_inicio": cita.hora_inicio,
            "hora_fin": cita.hora_fin,
            "estado": cita.estado,
            "cliente_id": cita.cliente_id,
            "motivo": cita.motivo
        })

    return eventos
