from datetime import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.disponibilidad_tecnico import DisponibilidadTecnico
from app.models.cita_tecnico import CitaTecnico

router = APIRouter(prefix="/tecnicos", tags=["Calendario Técnico"])

@router.get("/{tecnico_id}/calendario")
def calendario_tecnico(tecnico_id: int, db: Session = Depends(get_db)):
    eventos = []

    citas = db.query(CitaTecnico).filter(
        CitaTecnico.tecnico_id == tecnico_id
    ).all()

    for c in citas:
        eventos.append({
            "id": c.id,
            "titulo": c.motivo,
            "tipo": "cita",
            "start": datetime.combine(c.fecha, c.hora_inicio).isoformat(),
            "end": datetime.combine(c.fecha, c.hora_fin).isoformat()
        })

    slots = db.query(DisponibilidadTecnico).filter(
        DisponibilidadTecnico.tecnico_id == tecnico_id
    ).all()

    for s in slots:
        eventos.append({
            "id": s.id,
            "titulo": s.descripcion or s.tipo_turno,
            "tipo": "descanso" if s.es_descanso else "turno",
            "start": datetime.combine(s.fecha, s.hora_inicio).isoformat(),
            "end": datetime.combine(s.fecha, s.hora_fin).isoformat()
        })

    return eventos
