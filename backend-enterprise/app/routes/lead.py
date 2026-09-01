from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi import UploadFile, File


from app.database import get_db
from app.models.lead import Lead
from app.schemas.lead import LeadCreate, LeadResponse
from app.schemas.contrato import ContratoCreate

router = APIRouter(prefix="/admin/forms", tags=["Admin - Formularios"])

# ============================
# IMPORTAR LEAD
# ============================

@router.post("/importar", response_model=LeadResponse)
async def importar_lead_route(data: LeadCreate, db: Session = Depends(get_db)):
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
        correo=data.correo or "",
        telefono=data.telefono or "",
        mensaje=data.mensaje or "",
        origen=data.origen or "contacto_general",
        estado="pendiente"
    )

    db.add(nuevo_lead)
    db.commit()
    db.refresh(nuevo_lead)
    
    lead_dict = {
        "id": nuevo_lead.id,
        "contacto": nuevo_lead.contacto,
        "correo": nuevo_lead.correo,
        "telefono": nuevo_lead.telefono,
        "empresa": nuevo_lead.empresa,
        "mensaje": nuevo_lead.mensaje,
        "estado": nuevo_lead.estado
    }
    
    await manager.broadcast({"event": "NUEVO_LEAD", "data": lead_dict})

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


@router.get("/lead/{lead_id}", response_model=LeadResponse)
def obtener_lead(lead_id: int, db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    return lead


@router.post("/contratos/generar/{lead_id}")
def generar_contrato(lead_id: int, data: ContratoCreate, db: Session = Depends(get_db)):
    contrato = Contrato(
        lead_id=lead_id,
        servicios=data.servicios,
        duracion=data.duracion,
        politicas=data.politicas,
        estado="generado"
    )
    db.add(contrato)
    db.commit()

    historial = HistorialContrato(lead_id=lead_id, accion="Contrato generado")
    db.add(historial)
    db.commit()

    return {"status": "ok"}

@router.post("/contratos/enviar/{lead_id}")
def enviar_contrato(lead_id: int, db: Session = Depends(get_db)):
    historial = HistorialContrato(lead_id=lead_id, accion="Contrato enviado")
    db.add(historial)
    db.commit()
    return {"status": "ok"}

@router.post("/contratos/firmado/{lead_id}")
def contrato_firmado(
    lead_id: int,
    archivo: UploadFile,
    db: Session = Depends(get_db)):
    ruta = f"contratos_firmados/{lead_id}.pdf"
    with open(ruta, "wb") as f:
        f.write(archivo.file.read())

    contrato = db.query(Contrato).filter(Contrato.lead_id == lead_id).first()
    contrato.archivo_pdf = ruta
    contrato.estado = "firmado"
    db.commit()

    historial = HistorialContrato(lead_id=lead_id, accion="Contrato firmado")
    db.add(historial)
    db.commit()

    return {"status": "ok"}

@router.get("/contratos/{lead_id}")
def obtener_contrato(lead_id: int, db: Session = Depends(get_db)):
    contrato = db.query(Contrato).filter(Contrato.lead_id == lead_id).first()
    historial = db.query(HistorialContrato).filter(HistorialContrato.lead_id == lead_id).all()
    return {"contrato": contrato, "historial": historial}


@router.post("/{lead_id}/descartar")
def descartar_lead(lead_id: int, db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()

    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")

    db.delete(lead)
    db.commit()

    return {"mensaje": "Lead eliminado permanentemente"}
