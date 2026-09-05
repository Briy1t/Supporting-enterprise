from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.disponibilidad_tecnico import DisponibilidadTecnico
from app.models.cita_tecnico import CitaTecnico

router = APIRouter(prefix="/tecnicos", tags=["Calendario Técnico"])

@router.get("/{tecnico_id}/calendario")
def calendario_admin(tecnico_id: int, db: Session = Depends(get_db)):
    disponibilidad = db.query(DisponibilidadTecnico).filter(
        DisponibilidadTecnico.tecnico_id == tecnico_id
    ).all()

    citas = db.query(CitaTecnico).filter(
        CitaTecnico.tecnico_id == tecnico_id
    ).all()

    eventos = []

    # Disponibilidad
    for slot in disponibilidad:
        eventos.append({
            "id": slot.id,
            "tipo": "slot",
            "titulo": "Disponibilidad",
            "descripcion": slot.descripcion or "Slot disponible",
            "fecha": str(slot.fecha),
            "cliente_id": None
        })

    # Citas
    for cita in citas:
        eventos.append({
            "id": cita.id,
            "tipo": "cita",
            "titulo": "Cita programada",
            "descripcion": cita.motivo or "Sin descripción",
            "fecha": str(cita.fecha),
            "cliente_id": cita.cliente_id
        })

    return eventos
