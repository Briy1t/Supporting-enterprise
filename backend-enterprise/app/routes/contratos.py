import os
import shutil
import time

from datetime import datetime
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
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

router = APIRouter(prefix="/contratos", tags=["Contratos"])

class EnviarEmailSchema(BaseModel):
    correo: EmailStr
    
SMTP_SERVER = "smtp.ethereal.email"
SMTP_PORT = 587
SMTP_USER = "neha.carroll@ethereal.email"  
SMTP_PASS = "ht9vTSfyFmNA46TTYS"  

SENDER_EMAIL = "SUPPORTING <soporte@supporting.com>"

@router.get("/lead/{lead_id}")
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
        # Pausa preventiva de 1 segundo para no sobrepasar la cuota/segundo de Mailtrap
        time.sleep(1)

        # 1. Crear el mensaje
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = data.correo
        msg['Subject'] = f"Contrato de Prestación de Servicios #{contrato.id:04d} - SUPPORTING"

        cuerpo = f"""\
            Hola,

            Adjunto encontrarás el Contrato de Prestación de Servicios (Ref: #CTR-{contrato.id:04d}) emitido por SUPPORTING.

            Por favor, revísalo y devuélvelo firmado.

            Saludos cordiales,
            Equipo de SUPPORTING
            """
        msg.attach(MIMEText(cuerpo, 'plain'))

        # 2. Adjuntar el PDF
        with open(path_pdf, "rb") as f:
            adjunto = MIMEApplication(f.read(), _subtype="pdf")
            adjunto.add_header('Content-Disposition', 'attachment', filename=f"Contrato_{contrato.id}.pdf")
            msg.attach(adjunto)

        max_reintentos = 3
        for intento in range(max_reintentos):
            try:
                with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
                    server.starttls()
                    server.login(SMTP_USER, SMTP_PASS)
                    server.sendmail(SENDER_EMAIL, [data.correo], msg.as_string())
                break  # Si el envío fue exitoso, sale del ciclo
            except smtplib.SMTPResponseException as e:
                if e.smtp_code == 550 and intento < max_reintentos - 1:
                    time.sleep(2)  # Espera 2 segundos antes de reintentar
                else:
                    raise e
                
        # 3. Envío seguro vía Mailtrap SMTP
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SENDER_EMAIL, [data.correo], msg.as_string())

        # 4. Actualizar estado e historial
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