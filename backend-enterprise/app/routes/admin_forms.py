from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.lead import LeadCreate, LeadResponse
from app.controllers.lead import (
    crear_lead,
    listar_leads,
    obtener_lead,
    actualizar_estado_lead
)

router = APIRouter(prefix="/admin/leads", tags=["Admin - Leads"])

@router.post("/", response_model=LeadResponse)
def crear_lead_route(data: LeadCreate, db: Session = Depends(get_db)):
    return crear_lead(db, data.dict())

@router.get("/", response_model=list[LeadResponse])
def listar_leads_route(db: Session = Depends(get_db)):
    return listar_leads(db)

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
