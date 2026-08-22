from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from datetime import datetime
from fastapi.responses import FileResponse

from app.database import get_db
from app.models.contratos import Contrato, HistorialContrato

router = APIRouter(prefix="/contratos", tags=["Contratos"])

@router.get("/{cliente_id}")
def obtener_contrato(cliente_id: int, db: Session = Depends(get_db)):
    contrato = db.query(Contrato).filter_by(cliente_id=cliente_id).first()
    historial = db.query(HistorialContrato).filter_by(cliente_id=cliente_id).all()

    return {
        "contrato": contrato,
        "historial": historial
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
        contrato.archivo = ruta

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


@router.get("/descargar/{cliente_id}")
def descargar_contrato(cliente_id: int):
    ruta = f"contratos/{cliente_id}.pdf"
    return FileResponse(ruta, media_type="application/pdf")
