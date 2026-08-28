from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from fpdf import FPDF

from app.database import get_db
from app.models.lead import Lead
from app.models.cliente import Cliente
from app.models.servicio import Servicio
from app.models.contratos import Contrato, HistorialContrato
from app.schemas.contrato import ContratoCreate

router = APIRouter(prefix="/contratos-generar", tags=["Generar Contratos"])

# ============================
# Cargar políticas default
# ============================
with open("app/politicas_default.txt", "r", encoding="utf-8") as f:
    POLITICAS_DEFAULT = f.read()


# ============================
# Generar PDF
# ============================
def generar_pdf_contrato(lead, contrato):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    pdf.cell(200, 10, txt="CONTRATO DE SERVICIO", ln=True)

    pdf.ln(10)
    pdf.cell(200, 10, txt=f"Empresa: {lead.empresa}", ln=True)
    pdf.cell(200, 10, txt=f"Contacto: {lead.contacto}", ln=True)
    pdf.cell(200, 10, txt=f"Correo: {lead.correo}", ln=True)
    pdf.cell(200, 10, txt=f"Teléfono: {lead.telefono}", ln=True)

    pdf.ln(10)
    pdf.multi_cell(0, 10, txt=f"Servicios contratados:\n{', '.join(contrato.servicios)}")

    pdf.ln(10)
    pdf.multi_cell(0, 10, txt=f"Duración: {contrato.duracion}")

    pdf.ln(10)
    pdf.multi_cell(0, 10, txt=f"Políticas:\n{contrato.politicas}")

    ruta = f"contratos_generados/contrato_{contrato.id}.pdf"
    pdf.output(ruta)

    return ruta


# ============================
# Generar contrato
# ============================
@router.post("/generar/{lead_id}")
def generar_contrato(lead_id: int, data: ContratoCreate, db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()

    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")

    servicios_db = db.query(Servicio).filter(Servicio.id.in_(data.servicios)).all()
    servicios_nombres = [s.nombre for s in servicios_db]

    if not servicios_nombres:
        raise HTTPException(status_code=400, detail="Servicios no válidos")

    politicas_finales = data.politicas or POLITICAS_DEFAULT

    contrato = Contrato(
        lead_id=lead_id,
        cliente_id=None,
        servicios=servicios_nombres,
        duracion=data.duracion,
        politicas=politicas_finales,
        estado="generado",
        fecha_creacion=datetime.utcnow()
    )

    db.add(contrato)
    db.commit()
    db.refresh(contrato)

    # Generar PDF
    ruta_pdf = generar_pdf_contrato(lead, contrato)
    contrato.archivo_pdf = ruta_pdf
    db.commit()
    
    return {"status": "ok", "contrato_id": contrato.id}

    # Crear historial (con contrato_id obligatorio)
    historial = HistorialContrato(
        contrato_id=contrato.id,
        lead_id=lead_id,
        accion="Contrato generado",
        fecha=datetime.utcnow()
    )
    db.add(historial)
    db.commit()

    return {"status": "ok", "contrato_id": contrato.id}


# ============================
# Enviar contrato por correo
# ============================
from fastapi_mail import FastMail, MessageSchema

@router.post("/enviar/{lead_id}")
async def enviar_contrato_route(lead_id: int, db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    contrato = db.query(Contrato).filter(Contrato.lead_id == lead_id).first()

    if not contrato or not contrato.archivo_pdf:
        raise HTTPException(status_code=400, detail="No hay contrato generado")

    message = MessageSchema(
        subject="Contrato generado",
        recipients=[lead.correo],
        body="Adjuntamos su contrato.",
        attachments=[contrato.archivo_pdf]
    )

    fm = FastMail()
    await fm.send_message(message)

    historial = HistorialContrato(
        contrato_id=contrato.id,
        lead_id=lead_id,
        accion="Contrato enviado",
        fecha=datetime.utcnow()
    )
    db.add(historial)
    db.commit()

    return {"status": "enviado"}