from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.lead import Lead
from app.schemas.lead import LeadCreate, LeadResponse
from app.schemas.auth_user import AuthCreate

from app.controllers.cliente import crear_cliente
from app.controllers.auth_controller import crear_usuario


router = APIRouter(prefix="/admin/forms", tags=["Admin - Formularios"])



@router.post("/importar", response_model=LeadResponse)
def importar_lead_route(data: LeadCreate, db: Session = Depends(get_db)):
    lead_existente = db.query(Lead).filter(
        Lead.contacto == data.contacto,
        Lead.correo == data.correo,
        Lead.telefono == data.telefono
    ).first()

    if lead_existente:
        raise HTTPException(
            status_code=400,
            detail="Este contacto ya envió una solicitud"
        )

    nuevo_lead = Lead(
        contacto=data.contacto,
        correo=data.correo,
        telefono=data.telefono,
        mensaje=data.mensaje,
        estado="pendiente"
    )

    db.add(nuevo_lead)
    db.commit()
    db.refresh(nuevo_lead)

    return nuevo_lead


# ============================
# LISTAR TODOS LOS LEADS
# ============================

@router.get("/", response_model=list[LeadResponse])
def listar_leads_route(db: Session = Depends(get_db)):
    return db.query(Lead).order_by(Lead.id.desc()).all()


# ============================
# OBTENER LEAD
# ============================

@router.get("/{lead_id}", response_model=LeadResponse)
def obtener_lead_route(lead_id: int, db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")
    return lead


# ============================
# CAMBIAR ESTADO
# ============================

@router.patch("/{lead_id}/estado")
def actualizar_estado_route(lead_id: int, estado: str, db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")

    lead.estado = estado
    db.commit()
    return {"mensaje": "Estado actualizado", "lead": lead}


# ============================
# CONVERTIR LEAD EN CLIENTE
# ============================

@router.post("/{lead_id}/convertir")
def convertir_lead_route(
    lead_id: int,
    telefono: str,
    empresa: str | None = None,
    servicio: str | None = None,
    db: Session = Depends(get_db)
):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")

    cliente_data = {
        "contacto": lead.contacto,
        "correo": lead.correo,
        "telefono": telefono or lead.telefono,
        "empresa": empresa or lead.empresa,
        "mensaje": lead.mensaje,
        "lead_id": lead.id,
        "form_id": lead.id,
        "form_tipo": "lead"
    }

    cliente = crear_cliente(db, cliente_data)

    usuario_data = AuthCreate(
        usuario=lead.contacto.replace(" ", "").lower(),
        email=lead.correo,
        password="Temporal123!",
        rol="cliente",
        empresa=empresa or lead.empresa
    )

    usuario = crear_usuario(db, usuario_data)

    lead.estado = "convertido"
    db.commit()

    return {
        "mensaje": "Lead convertido",
        "cliente": cliente,
        "usuario": usuario
    }


# ============================
# DESCARTAR (ELIMINAR)
# ============================

@router.post("/{lead_id}/descartar")
def descartar_lead_route(lead_id: int, db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")

    db.delete(lead)
    db.commit()

    return {"mensaje": "Lead eliminado permanentemente"}
