from sqlalchemy.orm import Session
from app.models.alarma import Alarma
from app.schemas.alarma import AlarmaCreate

def crear_alarma(db: Session, data: dict):
    alarma = Alarma(**data)
    db.add(alarma)
    db.commit()
    db.refresh(alarma)
    return alarma

def listar_alarmas(db: Session):
    return db.query(Alarma).all()

def obtener_alarma(db: Session, alarma_id: int):
    return db.query(Alarma).filter(Alarma.id == alarma_id).first()

def actualizar_estado_alarma(db: Session, alarma_id: int, nuevo_estado: str):
    alarma = obtener_alarma(db, alarma_id)
    if alarma:
        alarma.estado = nuevo_estado
        db.commit()
        db.refresh(alarma)
    return alarma

def eliminar_alarma(db: Session, alarma_id: int):
    alarma = obtener_alarma(db, alarma_id)
    if alarma:
        db.delete(alarma)
        db.commit()
    return alarma
