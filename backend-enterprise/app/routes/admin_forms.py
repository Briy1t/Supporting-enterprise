from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.lead import LeadCreate, LeadResponse
from app.schemas.usuario import UserCreate, UserResponse
from app.controllers.lead import (
    crear_lead,
    listar_leads,
    obtener_lead,
    actualizar_estado_lead
)
from app.controllers.usuario import crear_cliente

router = APIRouter(prefix="/admin/forms", tags=["Admin - Formularios"])

# Crear lead manualmente (opcional)
@router.post("/", response_model=LeadResponse)
def crear_lead_route(data: LeadCreate, db: Session = Depends(get_db)):
    return crear_lead(db, data.dict())

# Listar todos los leads
@router.get("/", response_model=list[LeadResponse])
def listar_leads_route(db: Session = Depends(get_db)):
    return listar_leads(db)

# Obtener lead individual
@router.get("/{lead_id}", response_model=LeadResponse)
def obtener_lead_route(lead_id: int, db: Session = Depends(get_db)):
    lead = obtener_lead(db, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")
    return lead


@router.patch("/{lead_id}/estado")
def actualizar_estado_route(lead_id: int, estado: str, db: Session = Depends(get_db)):
    lead = actualizar_estado_lead(db, lead_id, estado)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")
    return {"mensaje": "Estado actualizado", "lead": lead}

@router.post("/{lead_id}/convertir", response_model=UserResponse)
def convertir_lead_route(
    lead_id: int,
    telefono: str | None = None,
    empresa: str | None = None,
    servicio: str | None = None,
    db: Session = Depends(get_db)
):
    lead = obtener_lead(db, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")

    cliente_data = {
        "nombre": lead.nombre,
        "email": lead.email,
        "telefono": telefono,
        "empresa": empresa,
        "servicio": servicio
    }

    cliente = crear_cliente(db, cliente_data)

    actualizar_estado_lead(db, lead_id, "convertido")

    return cliente


@router.post("/{lead_id}/descartar")
def descartar_lead_route(lead_id: int, db: Session = Depends(get_db)):
    lead = actualizar_estado_lead(db, lead_id, "descartado")
    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")
    return {"mensaje": "Lead descartado"}
