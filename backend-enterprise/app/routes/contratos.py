from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from fastapi.responses import FileResponse
import os 
from app.database import get_db
from app.models.contratos import Contrato, HistorialContrato

router = APIRouter(prefix="/contratos", tags=["Contratos"])

@router.get("/lead/{lead_id}")
def obtener_contrato_por_lead(lead_id: int, db: Session = Depends(get_db)):
    contrato = db.query(Contrato).filter_by(lead_id=lead_id).first()
    historial = db.query(HistorialContrato).filter_by(lead_id=lead_id).all()

    if not contrato:
        return {"contrato": None, "historial": []}

    return {
        "contrato": {
            "id": contrato.id,
            "servicios": contrato.servicios,
            "duracion": contrato.duracion,
            "politicas": contrato.politicas,
            "estado": contrato.estado,
            "archivo_pdf": contrato.archivo_pdf,
            "fecha_creacion": contrato.fecha_creacion,
            "fecha_envio": contrato.fecha_envio,
            "fecha_firma": contrato.fecha_firma,
        },
        "historial": [
            {"fecha": h.fecha, "accion": h.accion}
            for h in historial
        ]
    }


@router.post("/subir/{cliente_id}")
def subir_contrato(cliente_id: int, archivo: UploadFile = File(...), db: Session = Depends(get_db)):
    ruta = f"contratos/{cliente_id}.pdf"

    with open(ruta, "wb") as f:
        f.write(archivo.file.read())

    contrato = db.query(Contrato).filter_by(cliente_id=cliente_id).first()

    if not contrato:
        contrato = Contrato(cliente_id=cliente_id, archivo=ruta)
        db.add(contrato)
    else:
        contrato.archivo_pdf = ruta

    db.commit()

    db.add(HistorialContrato(cliente_id=cliente_id, accion="Contrato subido"))
    db.commit()

    return {"status": "ok"}


@router.post("/enviado/{cliente_id}")
def marcar_enviado(cliente_id: int, db: Session = Depends(get_db)):
    contrato = db.query(Contrato).filter_by(cliente_id=cliente_id).first()
    contrato.estado = "enviado"
    contrato.fecha_envio = datetime.utcnow()
    db.commit()

    db.add(HistorialContrato(cliente_id=cliente_id, accion="Contrato enviado"))
    db.commit()

    return {"status": "ok"}


@router.post("/firmado/{cliente_id}")
def marcar_firmado(cliente_id: int, db: Session = Depends(get_db)):
    contrato = db.query(Contrato).filter_by(cliente_id=cliente_id).first()
    contrato.estado = "firmado"
    contrato.fecha_firma = datetime.utcnow()
    db.commit()

    db.add(HistorialContrato(cliente_id=cliente_id, accion="Contrato firmado"))
    db.commit()

    return {"status": "ok"}

@router.get("/descargar/{lead_id}")
def descargar_contrato(lead_id: int, db: Session = Depends(get_db)):
    contrato = db.query(Contrato).filter_by(lead_id=lead_id).first()

    if not contrato or not contrato.archivo_pdf:
        raise HTTPException(status_code=404, detail="PDF no encontrado")

    ruta_absoluta = os.path.abspath(contrato.archivo_pdf)

    if not os.path.exists(ruta_absoluta):
        raise HTTPException(status_code=404, detail="El archivo PDF no existe en el servidor")

    return FileResponse(
        ruta_absoluta,
        media_type="application/pdf",
        filename=f"contrato_{contrato.id}.pdf"
    )

    
@router.get("/cliente/{cliente_id}")
def obtener_contrato_por_cliente(cliente_id: int, db: Session = Depends(get_db)):
    contrato = db.query(Contrato).filter_by(cliente_id=cliente_id).first()
    historial = db.query(HistorialContrato).filter_by(cliente_id=cliente_id).all()

    if not contrato:
        return {"contrato": None, "historial": []}

    return {
        "contrato": {
            "id": contrato.id,
            "servicios": contrato.servicios,
            "duracion": contrato.duracion,
            "politicas": contrato.politicas,
            "estado": contrato.estado,
            "archivo_pdf": contrato.archivo_pdf,
            "fecha_creacion": contrato.fecha_creacion,
            "fecha_envio": contrato.fecha_envio,
            "fecha_firma": contrato.fecha_firma,
        },
        "historial": [
            {"fecha": h.fecha, "accion": h.accion}
            for h in historial
        ]
    }
