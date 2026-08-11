from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.lead import LeadCreate, LeadResponse
from app.schemas.auth_user import AuthCreate, AuthResponse

from app.models.lead import Lead
from app.controllers.lead import (
    crear_lead,
    listar_leads,
    obtener_lead,
    actualizar_estado_lead
)

from app.controllers.cliente import crear_cliente
from app.controllers.auth_controller import crear_usuario

router = APIRouter(prefix="/admin/forms", tags=["Admin - Formularios"])


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



@router.post("/{lead_id}/convertir")
def convertir_lead_route(
    lead_id: int,
    telefono: str | None = None,
    empresa: str | None = None,
    servicio: str | None = None,
    db: Session = Depends(get_db)
):
    # 1) Obtener lead
    lead = obtener_lead(db, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")

    # 2) Crear cliente
    cliente_data = {
        "nombre": lead.contacto,
        "email": lead.correo,
        "telefono": telefono,
        "empresa": empresa or lead.empresa,
        "servicio": servicio
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


    actualizar_estado_lead(db, lead_id, "convertido")

    # 5) Respuesta final
    return {
        "mensaje": "Lead convertido correctamente",
        "cliente": cliente,
        "usuario": usuario
    }


@router.post("/{lead_id}/descartar")
def descartar_lead_route(lead_id: int, db: Session = Depends(get_db)):
    lead = actualizar_estado_lead(db, lead_id, "descartado")
    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")
    return {"mensaje": "Lead descartado"}
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
        origen=nuevo_lead.origen,
        fecha=nuevo_lead.fecha,
    )
