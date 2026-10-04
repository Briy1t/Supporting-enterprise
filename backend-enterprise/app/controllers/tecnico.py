from sqlalchemy.orm import Session
from app.models.tecnico import Tecnico

def crear_tecnico(db: Session, data: dict):
    tecnico = Tecnico(**data)
    db.add(tecnico)
    db.commit()
    db.refresh(tecnico)
    return tecnico

def listar_tecnicos(db: Session):
    return db.query(Tecnico).all()

def obtener_tecnico(db: Session, tecnico_id: int):
    return db.query(Tecnico).filter(Tecnico.id == tecnico_id).first()

def actualizar_disponibilidad(db: Session, tecnico_id: int, disponibilidad: str):
    tecnico = obtener_tecnico(db, tecnico_id)
    if tecnico:
        tecnico.disponibilidad = disponibilidad
        db.commit()
        db.refresh(tecnico)
    return tecnico

def eliminar_tecnico(db: Session, tecnico_id: int):
    tecnico = obtener_tecnico(db, tecnico_id)
    if tecnico:
        db.delete(tecnico)
        db.commit()
    return tecnico
