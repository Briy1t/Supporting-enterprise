from sqlalchemy.orm import Session
from app.models.servicio import Servicio
from app.models.usuario import User

from fastapi import HTTPException

def crear_servicio(db: Session, data: dict):
    cliente = db.query(User).filter(User.id == data["cliente_id"]).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    servicio = Servicio(**data)
    db.add(servicio)
    db.commit()
    db.refresh(servicio)
    return servicio

def listar_servicios(db: Session):
    return db.query(Servicio).all()

def obtener_servicio(db: Session, servicio_id: int):
    return db.query(Servicio).filter(Servicio.id == servicio_id).first()

def eliminar_servicio(db: Session, servicio_id: int):
    servicio = obtener_servicio(db, servicio_id)
    if not servicio:
        return None
    db.delete(servicio)
    db.commit()
    return servicio
