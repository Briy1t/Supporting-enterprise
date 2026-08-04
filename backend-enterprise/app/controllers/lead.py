from sqlalchemy.orm import Session
from app.models.lead import Lead

def crear_lead(db: Session, data: dict):
    lead = Lead(**data)
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead

def listar_leads(db: Session):
    return db.query(Lead).all()

def obtener_lead(db: Session, lead_id: int):
    return db.query(Lead).filter(Lead.id == lead_id).first()

def actualizar_estado_lead(db: Session, lead_id: int, nuevo_estado: str):
    lead = obtener_lead(db, lead_id)
    if lead:
        lead.estado = nuevo_estado
        db.commit()
        db.refresh(lead)
    return lead
