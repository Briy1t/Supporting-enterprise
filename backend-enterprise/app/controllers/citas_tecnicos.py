from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.cita_tecnico import CitaTecnico
from app.models.disponibilidad_tecnico import DisponibilidadTecnico
from app.models.tecnico import Tecnico
from app.models.cliente import Cliente
from app.schemas.cita_tecnico import (
    CitaCreate,
    CitaResponse
)

router = APIRouter(prefix="/tecnicos", tags=["Citas"])

@router.post("/{tecnico_id}/citas", response_model=CitaResponse)
def crear_cita(tecnico_id: int, data: CitaCreate, db: Session = Depends(get_db)):
    tecnico = db.query(Tecnico).filter(Tecnico.id == tecnico_id).first()
    if not tecnico:
        raise HTTPException(404, "Técnico no encontrado")

    cliente = db.query(Cliente).filter(Cliente.id == data.cliente_id).first()
    if not cliente:
        raise HTTPException(404, "Cliente no encontrado")

    slot = db.query(DisponibilidadTecnico).filter(
        DisponibilidadTecnico.tecnico_id == tecnico_id,
        DisponibilidadTecnico.fecha == data.fecha,
        DisponibilidadTecnico.hora_inicio == data.hora_inicio,
        DisponibilidadTecnico.estado == "libre"
    ).first()

    if not slot:
        raise HTTPException(400, "El técnico no tiene disponibilidad en ese horario")

    slot.estado = "reservado"

    cita = CitaTecnico(
        tecnico_id=tecnico_id,
        cliente_id=data.cliente_id,
        fecha=data.fecha,
        hora_inicio=data.hora_inicio,
        hora_fin=data.hora_fin,
        motivo=data.motivo,
        ticket_id=data.ticket_id,
        slot_id=slot.id
    )

    db.add(cita)
    db.commit()
    db.refresh(cita)
    return cita


@router.get("/{tecnico_id}/citas", response_model=list[CitaResponse])
def listar_citas(tecnico_id: int, db: Session = Depends(get_db)):
    return db.query(CitaTecnico).filter(
        CitaTecnico.tecnico_id == tecnico_id
    ).all()
