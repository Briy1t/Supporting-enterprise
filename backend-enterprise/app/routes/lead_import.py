from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.lead import Lead
from app.schemas.lead import LeadCreate, LeadResponse

router = APIRouter(prefix="/admin/forms", tags=["Admin - Formularios"])

@router.post("/importar", response_model=LeadResponse)
def importar_lead_route(data: LeadCreate, db: Session = Depends(get_db)):
    lead_existente = db.query(Lead).filter(
        Lead.correo == data.correo,
        Lead.empresa == data.empresa,
        Lead.contacto == data.contacto
    ).first()

    if lead_existente:
        raise HTTPException(
            status_code=400,
            detail="Este lead ya existe en la plataforma"
        )


    nuevo_lead = Lead(
        empresa=data.empresa,
        contacto=data.contacto,
        correo=data.correo,
        mensaje=data.mensaje,
        origen=data.origen
    )

    db.add(nuevo_lead)
    db.commit()
    db.refresh(nuevo_lead)

    return LeadResponse(
        id=nuevo_lead.id,
        empresa=nuevo_lead.empresa,
        contacto=nuevo_lead.contacto,
        correo=nuevo_lead.correo,
        mensaje=nuevo_lead.mensaje,
        estado=nuevo_lead.estado,
        origen=nuevo_lead.origen
    )
