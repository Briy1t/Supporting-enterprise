from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from sqlalchemy import or_
from sqlalchemy.exc import IntegrityError
from typing import Optional, Union, List

from app.database import get_db
from app.models.lead import Lead
from app.schemas.lead import LeadCreate, LeadResponse
from app.controllers.cliente import crear_cliente
import asyncio

router = APIRouter(prefix="/admin/forms", tags=["Admin - Formularios"])

# ============================
# GESTOR DE WEBSOCKETS (Tiempo Real)
# ============================
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)

manager = ConnectionManager()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

# ============================
# IMPORTAR LEAD (Formulario Web)
# ============================

@router.post("/importar", response_model=LeadResponse)
async def importar_lead_route(data: LeadCreate, db: Session = Depends(get_db)):
    # 1. Armar filtros de búsqueda solo con campos recibidos
    condiciones = [Lead.correo == data.correo]
    if data.telefono and data.telefono.strip():
        condiciones.append(Lead.telefono == data.telefono)

    # 2. Verificar si existe un lead en estado 'pendiente'
    lead_existente = db.query(Lead).filter(
        or_(*condiciones),
        Lead.estado == "pendiente"
    ).first()

    if lead_existente:
        raise HTTPException(
            status_code=400,
            detail="Un asesor se pondrá en contacto a la brevedad."
        )

    # 3. Guardar el nuevo lead
    nuevo_lead = Lead(
        contacto=data.contacto,
        correo=data.correo,
        telefono=data.telefono,
        mensaje=data.mensaje or "",
        empresa="",
        estado="pendiente"
    )

    db.add(nuevo_lead)
    db.commit()
    db.refresh(nuevo_lead)

    # 4. Transmitir evento por WebSocket al frontend
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
# LISTAR LEADS ACTIVOS (Kanban)
# ============================
@router.get("", response_model=list[LeadResponse])
def listar_leads_route(db: Session = Depends(get_db)):
    return (
        db.query(Lead)
        .filter(Lead.estado.notin_(["convertido", "descartado"]))
        .order_by(Lead.id.desc())
        .all()
    )

# ============================
# CAMBIAR ESTADO MANUALMENTE
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
    telefono: Optional[str] = None,
    empresa: Optional[str] = None,
    servicio: Optional[str] = None,
    servicios: Optional[Union[List[int], List[str]]] = None,
    preferencia: Optional[str] = "correo",
    db: Session = Depends(get_db)
):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")

    if lead.estado == "convertido":
        raise HTTPException(status_code=400, detail="Este lead ya fue convertido en cliente previamente.")

    try:
        cliente_data = {
            "contacto": lead.contacto,
            "correo": lead.correo,
            "telefono": telefono or lead.telefono,
            "empresa": empresa or lead.empresa,
            "mensaje": lead.mensaje,
            "lead_id": lead.id,
            "servicio": servicio,      
            "servicios": servicios,    
            "preferencia": preferencia
        }
        
        res = crear_cliente(db, cliente_data)

        return {
            "mensaje": "Lead convertido exitosamente",
            "cliente": res["cliente"],
            "usuario": res["usuario"]
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Error al procesar la conversión: {str(e)}"
        )

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

# ============================
# OBTENER UN LEAD POR ID
# ============================

@router.get("/lead/{lead_id}", response_model=LeadResponse)
def obtener_lead_por_id_route(lead_id: int, db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")
    return lead