from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.lead import Lead
from app.schemas.lead import LeadCreate, LeadResponse

router = APIRouter(prefix="/admin/forms", tags=["Admin - Formularios"])

# ============================
# IMPORTAR LEAD
# ============================

@router.post("/importar", response_model=LeadResponse)
def importar_lead_route(data: LeadCreate, db: Session = Depends(get_db)):
    lead_existente = db.query(Lead).filter(
        Lead.correo == data.correo,
        Lead.telefono == data.telefono,
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
        telefono=data.telefono,
        mensaje=data.mensaje,
        origen=data.origen or "contacto_general",
        estado="pendiente"
    )

    db.add(nuevo_lead)
    db.commit()
    db.refresh(nuevo_lead)

    return nuevo_lead


# ============================
# LISTAR LEADS
# ============================

@router.get("/", response_model=list[LeadResponse])
def listar_leads(db: Session = Depends(get_db)):
    return db.query(Lead).order_by(Lead.id.desc()).all()


# ============================
# CAMBIAR ESTADO
# ============================

@router.patch("/{lead_id}/estado")
def cambiar_estado(lead_id: int, estado: str, db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()

    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")

    lead.estado = estado
    db.commit()

    return {"mensaje": "Estado actualizado", "estado": estado}


# ============================
# DESCARTAR (ELIMINAR)
# ============================

@router.post("/{lead_id}/descartar")
def descartar_lead(lead_id: int, db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()

    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")

    db.delete(lead)
    db.commit()

    return {"mensaje": "Lead eliminado permanentemente"}
