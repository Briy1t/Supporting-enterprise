from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from fastapi.responses import FileResponse

import os
import shutil
import time

from datetime import datetime
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication

from app.database import get_db
from app.models.contratos import Contrato, HistorialContrato
from app.models.lead import Lead
from app.routes.contratos_generar import generar_pdf_contrato
from app.utils.email import enviar_correo_contrato

router = APIRouter(prefix="/contratos", tags=["Contratos"])

class EnviarEmailSchema(BaseModel):
    correo: EmailStr

@router.get("/{lead_id}")
def obtener_contrato_por_lead(lead_id: int, db: Session = Depends(get_db)):
    contrato = db.query(Contrato).filter(Contrato.lead_id == lead_id).order_by(Contrato.id.desc()).first()
    if not contrato:
        raise HTTPException(status_code=404, detail="Contrato no encontrado")
    return contrato


@router.get("/historial/{lead_id}")
def obtener_historial_por_lead(lead_id: int, db: Session = Depends(get_db)):
    resultados = (
        db.query(HistorialContrato, Contrato)
        .outerjoin(Contrato, HistorialContrato.contrato_id == Contrato.id)
        .filter(HistorialContrato.lead_id == lead_id)
        .order_by(HistorialContrato.fecha.desc())
        .all()
    )
    
    historial_respuesta = []
    for h, c in resultados:
        historial_respuesta.append({
            "id": h.id,
            "contrato_id": h.contrato_id,
            "accion": h.accion,
            "fecha": h.fecha.strftime("%d/%m/%Y %H:%M") if h.fecha else "N/A",
            "duracion": c.duracion if c else "N/A",
            "estado": c.estado if c else "Borrador/Pendiente",
            "archivo_pdf": c.archivo_pdf if c else None
        })
    return historial_respuesta


@router.get("/descargar/{lead_id}")
def descargar_contrato(lead_id: int, db: Session = Depends(get_db)):
    contrato = db.query(Contrato).filter(Contrato.lead_id == lead_id).order_by(Contrato.id.desc()).first()
    if not contrato or not contrato.archivo_pdf:
        raise HTTPException(status_code=404, detail="Archivo PDF no encontrado")
    
    path_pdf = contrato.archivo_pdf.replace("\\", "/")
    return FileResponse(path=path_pdf, media_type='application/pdf', filename=f"contrato_lead_{lead_id}.pdf")


@router.post("/subir-firmado/{contrato_id}")
def subir_contrato_firmado(
    contrato_id: int, 
    archivo: UploadFile = File(..., alias="archivo"), 
    db: Session = Depends(get_db)
):
    contrato = db.query(Contrato).filter(Contrato.id == contrato_id).first()
    if not contrato:
        raise HTTPException(status_code=404, detail="Contrato no encontrado")

    carpeta_destino = "contratos_firmados"
    os.makedirs(carpeta_destino, exist_ok=True)

    extension = os.path.splitext(archivo.filename)[1] if archivo.filename else ".pdf"
    nombre_archivo = f"contrato_firmado_{contrato_id}{extension}"
    ruta_guardado = os.path.join(carpeta_destino, nombre_archivo).replace("\\", "/")

    with open(ruta_guardado, "wb") as buffer:
        shutil.copyfileobj(archivo.file, buffer)

    contrato.estado = "firmado"
    contrato.archivo_pdf = ruta_guardado
    contrato.fecha_firma = datetime.utcnow()

    historial = HistorialContrato(
        contrato_id=contrato.id,
        lead_id=contrato.lead_id,
        cliente_id=contrato.cliente_id,
        accion="Contrato firmado subido con éxito",
        fecha=datetime.utcnow()
    )
    db.add(historial)
    db.commit()

    return {"status": "ok", "ruta": ruta_guardado, "estado": contrato.estado}


@router.post("/renovar/{contrato_id}")
def renovar_contrato(contrato_id: int, db: Session = Depends(get_db)):
    contrato_actual = db.query(Contrato).filter(Contrato.id == contrato_id).first()
    if not contrato_actual:
        raise HTTPException(status_code=404, detail="Contrato no encontrado")

    lead = db.query(Lead).filter(Lead.id == contrato_actual.lead_id).first()
    contrato_actual.estado = "renovado"
    
    historial_antiguo = HistorialContrato(
        contrato_id=contrato_actual.id,
        lead_id=contrato_actual.lead_id,
        cliente_id=contrato_actual.cliente_id,
        accion=f"Contrato #{contrato_actual.id} finalizado por renovación",
        fecha=datetime.utcnow()
    )
    db.add(historial_antiguo)

    nuevo_contrato = Contrato(
        lead_id=contrato_actual.lead_id,
        cliente_id=contrato_actual.cliente_id,
        servicios=contrato_actual.servicios,
        duracion=contrato_actual.duracion,
        politicas=contrato_actual.politicas,
        estado="generado",
        fecha_creacion=datetime.utcnow()
    )
    db.add(nuevo_contrato)
    db.commit()
    db.refresh(nuevo_contrato)

    ruta_pdf = generar_pdf_contrato(lead, nuevo_contrato)
    nuevo_contrato.archivo_pdf = ruta_pdf

    historial_nuevo = HistorialContrato(
        contrato_id=nuevo_contrato.id,
        lead_id=nuevo_contrato.lead_id,
        cliente_id=nuevo_contrato.cliente_id,
        accion=f"Contrato renovado generado (Nuevo ID: #{nuevo_contrato.id})",
        fecha=datetime.utcnow()
    )
    db.add(historial_nuevo)
    db.commit()

    return {
        "status": "ok", 
        "mensaje": "Contrato renovado exitosamente",
        "nuevo_contrato_id": nuevo_contrato.id,
        "ruta_pdf": ruta_pdf
    }


@router.post("/enviar/{contrato_id}")
def enviar_contrato_email(contrato_id: int, data: EnviarEmailSchema, db: Session = Depends(get_db)):
    contrato = db.query(Contrato).filter(Contrato.id == contrato_id).first()
    if not contrato or not contrato.archivo_pdf:
        raise HTTPException(status_code=404, detail="Contrato o archivo PDF no encontrado")
    
    path_pdf = contrato.archivo_pdf.replace("\\", "/")
    if not os.path.exists(path_pdf):
        raise HTTPException(status_code=404, detail="El archivo PDF físicamente no existe en el servidor")

    try:
        time.sleep(1)

        # Usamos la función centralizada de utilidades de correo
        enviar_correo_contrato(email_destino=data.correo, contrato_id=contrato.id, ruta_pdf=path_pdf)

        # Actualizar estado e historial
        contrato.estado = "enviado"

        historial = HistorialContrato(
            contrato_id=contrato.id,
            lead_id=contrato.lead_id,
            cliente_id=contrato.cliente_id,
            accion=f"Contrato enviado exitosamente por correo a {data.correo}",
            fecha=datetime.utcnow()
        )
        db.add(historial)
        db.commit()

        return {"status": "ok", "mensaje": f"Contrato enviado exitosamente a {data.correo}"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error al enviar el correo: {str(e)}")
@router.get("/")
def listar_o_filtrar_contratos(lead_id: int | None = None, db: Session = Depends(get_db)):
    if lead_id:
        contrato = db.query(Contrato).filter(Contrato.lead_id == lead_id).order_by(Contrato.id.desc()).first()
        if not contrato:
            return None 
        return contrato
    
    return db.query(Contrato).all()