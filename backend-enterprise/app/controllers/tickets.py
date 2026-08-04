from sqlalchemy.orm import Session
from app.models.ticket import Ticket

def crear_ticket(db: Session, data: dict):
    ticket = Ticket(**data)
    db.add(ticket)
    db.commit()
    db.refresh(ticket)
    return ticket

def listar_tickets(db: Session):
    return db.query(Ticket).all()

def obtener_ticket(db: Session, ticket_id: int):
    return db.query(Ticket).filter(Ticket.id == ticket_id).first()

def actualizar_estado_ticket(db: Session, ticket_id: int, nuevo_estado: str):
    ticket = obtener_ticket(db, ticket_id)
    if ticket:
        ticket.estado = nuevo_estado
        db.commit()
        db.refresh(ticket)
    return ticket

def eliminar_ticket(db: Session, ticket_id: int):
    ticket = obtener_ticket(db, ticket_id)
    if ticket:
        db.delete(ticket)
        db.commit()
    return ticket
