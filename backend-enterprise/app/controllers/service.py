from sqlalchemy.orm import Session
from app.models.service import Service

def crear_servicio(db: Session, data: dict):
    servicio = Service(**data)
    db.add(servicio)
    db.commit()
    db.refresh(servicio)
    return servicio

def listar_servicios(db: Session):
    return db.query(Service).all()

def obtener_servicio(db: Session, servicio_id: int):
    return db.query(Service).filter(Service.id == servicio_id).first()

def eliminar_servicio(db: Session, servicio_id: int):
    servicio = obtener_servicio(db, servicio_id)
    if servicio:
        db.delete(servicio)
        db.commit()
    return servicio
