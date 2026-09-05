from datetime import datetime
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
        password=hash_password(data.password)
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

@router.post("/{tecnico_id}/citas")
def crear_cita(tecnico_id: int, data: CitaCreate, db: Session = Depends(get_db)):
    cita = CitaTecnico(
        tecnico_id=tecnico_id,
        cliente_id=data.cliente_id,
        fecha=data.fecha,
        motivo=data.motivo
    )
    db.add(cita)
    db.commit()
    db.refresh(cita)
    return cita

@router.get("/{tecnico_id}/calendario", response_model=list[EventoResponse])
def calendario_tecnico(tecnico_id: int, db: Session = Depends(get_db)):
    disponibilidad = db.query(DisponibilidadTecnico).filter(
        DisponibilidadTecnico.tecnico_id == tecnico_id
    ).all()

    citas = db.query(CitaTecnico).filter(
        CitaTecnico.tecnico_id == tecnico_id
    ).all()

    eventos = []

    # Disponibilidad / Turnos
    for d in disponibilidad:
        fecha_completa = datetime.combine(d.fecha, d.hora_inicio)
        eventos.append({
            "id": d.id,
            "titulo": d.descripcion or "Turno",
            "fecha": fecha_completa,
            "tipo": "turno"
        })

    # Citas
    for c in citas:
        eventos.append({
            "id": c.id,
            "titulo": c.motivo,
            "fecha": c.fecha,
            "tipo": "cita"
        })

    return eventos
