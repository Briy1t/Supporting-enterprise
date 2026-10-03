from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.utils.security import hash_password

# Modelos (Base de datos)
from app.models.tecnico import Tecnico
from app.models.cita_tecnico import CitaTecnico
from app.models.disponibilidad_tecnico import DisponibilidadTecnico

# Esquemas (Pydantic / Validación de datos)
from app.schemas.tecnico import TecnicoCreate, TecnicoResponse
from app.schemas.cita_tecnico import CitaCreate, CitaResponse
from app.schemas.disponibilidad_tecnico import DisponibilidadCreate, DisponibilidadResponse
from app.schemas.eventos import EventoResponse

# Controladores y Lógica de negocio
from app.controllers.tecnico import (
    crear_tecnico,
    listar_tecnicos,
    obtener_tecnico,
    actualizar_disponibilidad,
    eliminar_tecnico,
)

router = APIRouter(prefix="/tecnicos", tags=["Tecnicos"])

@router.post("/", response_model=TecnicoResponse)
def crear_tecnico(data: TecnicoCreate, db: Session = Depends(get_db)):
    nuevo = Tecnico(
        nombre=data.nombre,
        especialidad=data.especialidad,
        descripcion=data.descripcion,
        email=data.email,
        password=hash_password(data.password),
        turno_hora_inicio=data.turno_hora_inicio,
        turno_hora_fin=data.turno_hora_fin,
    )
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo


@router.get("/", response_model=list[TecnicoResponse])
def listar_tecnicos_route(db: Session = Depends(get_db)):
    return listar_tecnicos(db)

@router.get("/{tecnico_id}", response_model=TecnicoResponse)
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

@router.post("/{tecnico_id}/citas", response_model=CitaResponse)
def crear_cita(tecnico_id: int, data: CitaCreate, db: Session = Depends(get_db)):

    fecha_inicio: datetime = data.fecha
    fecha_fin: datetime = fecha_inicio + timedelta(hours=1)

    slot = db.query(DisponibilidadTecnico).filter(
        DisponibilidadTecnico.tecnico_id == tecnico_id,
        DisponibilidadTecnico.hora_inicio <= fecha_inicio,
        DisponibilidadTecnico.hora_fin >= fecha_fin,
        DisponibilidadTecnico.estado == "libre"
    ).first()

    if not slot:
        raise HTTPException(
            status_code=400,
            detail="El técnico no tiene disponibilidad en ese horario"
        )

    slot.estado = "reservado"

    cita = CitaTecnico(
        tecnico_id=tecnico_id,
        cliente_id=data.cliente_id,
        fecha=fecha_inicio,
        hora_inicio=fecha_inicio,
        hora_fin=fecha_fin,
        motivo=data.motivo,
        ticket_id=data.ticket_id,
        slot_id=slot.id
    )

    db.add(cita)
    db.commit()
    db.refresh(cita)

    return cita

